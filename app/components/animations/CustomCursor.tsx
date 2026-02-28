"use client";

/**
 * AnimatedCursor — Production-hardened custom cursor
 *
 * Features:
 *   • Dotted ring with velocity-based stretch
 *   • Morph to button bounding-rect outline
 *   • Ring scales up on input/textarea hover — no beam
 *   • Per-element accent colour via data-cursor-color attribute
 *   • All colour channels spring-interpolated for smooth transitions
 *   • Ripple burst on click
 *   • Ambient glow pulse
 */

import { useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_RING_RADIUS = 18;
const MAX_RIPPLES      = 6;
const RIPPLE_LIFE      = 0.6;
const RIPPLE_MAX_R     = 50;
const MAX_DT           = 0.05;
const MAX_VELOCITY     = 3000;
const SNAP_THRESHOLD   = 0.08;
const GLOW_SPEED       = 3;

// Default accent: deep red
const DEFAULT_R = 139, DEFAULT_G = 30, DEFAULT_B = 30;

const BUTTON_SELECTOR =
  "a[href], button, [role='button'], [role='link'], .cursor-pointer, [data-cursor='button']";

const INPUT_SELECTOR =
  "input, textarea, select, [contenteditable]";

const TEXT_INPUT_TYPES = new Set([
  "text", "email", "password", "search", "url", "tel", "number", "",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

type CursorMode = "default" | "hover" | "button";

interface Ripple { x: number; y: number; age: number; }

interface MorphRect {
  cx: number; cy: number;
  w: number;  h: number;
  r: number;
}

interface CursorState {
  mouseX: number; mouseY: number;

  ringX: number; ringY: number;
  ringVX: number; ringVY: number;
  ringScale: number; ringScaleV: number;
  targetScale: number;

  speed: number;
  angle: number;
  glowPhase: number;

  mode: CursorMode;
  hoveredEl: HTMLElement | null;
  morphRect: MorphRect | null;

  mCX: number; mCY: number; mVCX: number; mVCY: number;
  mW:  number; mH:  number; mVW:  number; mVH:  number;
  mR:  number; mVR: number;

  blend: number; blendV: number;

  // Accent colour springs — interpolate R,G,B independently
  r: number; g: number; b: number;
  rV: number; gV: number; bV: number;
  tR: number; tG: number; tB: number; // targets

  ripples: Ripple[];
  lastTime: number;
}

// ─── Spring ───────────────────────────────────────────────────────────────────

function stepSpring(
  value: number, target: number, velocity: number,
  stiffness: number, damping: number, dt: number,
): [number, number] {
  const delta = target - value;
  if (Math.abs(delta) < SNAP_THRESHOLD && Math.abs(velocity) < SNAP_THRESHOLD) {
    return [target, 0];
  }
  const force = delta * stiffness - velocity * damping;
  const v = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity + force * dt));
  return [value + v * dt, v];
}

// ─── Colour Helpers ───────────────────────────────────────────────────────────

/** Parse any CSS colour string into [r, g, b] 0-255. Falls back to default red. */
function parseColor(raw: string | null): [number, number, number] {
  if (!raw) return [DEFAULT_R, DEFAULT_G, DEFAULT_B];

  // hex #rrggbb or #rgb
  const hex6 = raw.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (hex6) return [parseInt(hex6[1], 16), parseInt(hex6[2], 16), parseInt(hex6[3], 16)];

  const hex3 = raw.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (hex3) return [
    parseInt(hex3[1] + hex3[1], 16),
    parseInt(hex3[2] + hex3[2], 16),
    parseInt(hex3[3] + hex3[3], 16),
  ];

  // rgb(...) / rgba(...)
  const rgb = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgb) return [+rgb[1], +rgb[2], +rgb[3]];

  return [DEFAULT_R, DEFAULT_G, DEFAULT_B];
}

/** Walk up from el and find the nearest data-cursor-color value */
function getAccentColor(el: HTMLElement | null): [number, number, number] {
  let node: HTMLElement | null = el;
  while (node) {
    const val = node.dataset.cursorColor ?? node.getAttribute("data-cursor-color");
    if (val) return parseColor(val.trim());
    node = node.parentElement;
  }
  return [DEFAULT_R, DEFAULT_G, DEFAULT_B];
}

// ─── DOM Helpers ─────────────────────────────────────────────────────────────

function getMode(target: HTMLElement | null): CursorMode {
  if (!target) return "default";
  if (target.closest(BUTTON_SELECTOR)) return "button";
  const inputEl = target.closest(INPUT_SELECTOR) as HTMLElement | null;
  if (inputEl) {
    const tag = inputEl.tagName.toLowerCase();
    if (tag === "input") {
      const t = ((inputEl as HTMLInputElement).type ?? "").toLowerCase();
      return TEXT_INPUT_TYPES.has(t) ? "hover" : "button";
    }
    return "hover";
  }
  return "default";
}

function getBorderRadius(el: HTMLElement): number {
  const r = parseFloat(window.getComputedStyle(el).borderTopLeftRadius) || 0;
  return Math.min(r, 9999);
}

function buildMorphRect(el: HTMLElement): MorphRect {
  const rect = el.getBoundingClientRect();
  const isLarge = rect.width > 200 || rect.height > 200;
  const pad = isLarge ? 0 : 6;
  const br  = getBorderRadius(el);
  return {
    cx: rect.left + rect.width  / 2,
    cy: rect.top  + rect.height / 2,
    w:  rect.width  + pad * 2,
    h:  rect.height + pad * 2,
    r:  Math.min(br + pad, (rect.height + pad * 2) / 2),
  };
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, w: number, h: number, r: number,
): void {
  const hx = w / 2, hy = h / 2;
  const cr = Math.min(Math.abs(r), hx, hy);
  const x = cx - hx, y = cy - hy;
  ctx.beginPath();
  ctx.moveTo(x + cr, y);
  ctx.lineTo(x + w - cr, y);
  ctx.arcTo(x + w, y,     x + w, y + cr,     cr);
  ctx.lineTo(x + w, y + h - cr);
  ctx.arcTo(x + w, y + h, x + w - cr, y + h, cr);
  ctx.lineTo(x + cr, y + h);
  ctx.arcTo(x, y + h, x, y + h - cr,         cr);
  ctx.lineTo(x, y + cr);
  ctx.arcTo(x, y,     x + cr, y,              cr);
  ctx.closePath();
}

// ─── Environment Guards ───────────────────────────────────────────────────────

function shouldDisable(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (!window.matchMedia("(pointer: fine)").matches)                  return true;
  if (window.innerWidth < 1024)                                       return true;
  try { if (window.self !== window.top) return true; } catch { return true; }
  return false;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AnimatedCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const S = useRef<CursorState>({
    mouseX: -200, mouseY: -200,
    ringX: -200, ringY: -200, ringVX: 0, ringVY: 0,
    ringScale: 1, ringScaleV: 0, targetScale: 1,
    speed: 0, angle: 0, glowPhase: 0,
    mode: "default", hoveredEl: null, morphRect: null,
    mCX: -200, mCY: -200, mVCX: 0, mVCY: 0,
    mW: 36, mH: 36, mVW: 0, mVH: 0,
    mR: 18, mVR: 0,
    blend: 0, blendV: 0,
    r: DEFAULT_R, g: DEFAULT_G, b: DEFAULT_B,
    rV: 0, gV: 0, bV: 0,
    tR: DEFAULT_R, tG: DEFAULT_G, tB: DEFAULT_B,
    ripples: [],
    lastTime: 0,
  });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (shouldDisable()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    cancelAnimationFrame(rafRef.current);

    let dpr = 1;
    const applySize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();
    window.addEventListener("resize", applySize, { passive: true });

    const pointerMQ = window.matchMedia("(pointer: fine)");
    const onPointerChange = () => { if (!pointerMQ.matches) teardown(); }; // eslint-disable-line
    pointerMQ.addEventListener("change", onPointerChange);

    // ── Events ──

    const onMouseMove = (e: MouseEvent) => {
      const s = S.current;
      const dx = e.clientX - s.mouseX;
      const dy = e.clientY - s.mouseY;
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      s.speed += (dist - s.speed) * 0.25;
      if (dx !== 0 || dy !== 0) s.angle = Math.atan2(dy, dx);
    };

    const onMouseOver = (e: MouseEvent) => {
      const s   = S.current;
      const raw = e.target as HTMLElement | null;
      if (!raw) return;

      const mode = getMode(raw);
      s.mode = mode;

      if (mode === "button") {
        const dataCursorEl = raw.closest("[data-cursor='button']") as HTMLElement | null;
        const linkEl       = raw.closest(BUTTON_SELECTOR) as HTMLElement | null;
        const el           = dataCursorEl ?? linkEl;
        if (!el) return;
        s.hoveredEl   = el;
        s.morphRect   = buildMorphRect(el);
        s.targetScale = 1;

        // Pick up accent colour from element or its ancestors
        const [tr, tg, tb] = getAccentColor(el);
        s.tR = tr; s.tG = tg; s.tB = tb;
      } else if (mode === "hover") {
        s.hoveredEl   = null;
        s.morphRect   = null;
        s.targetScale = 1.6;
        // Check if an input ancestor has a colour hint, else default
        const [tr, tg, tb] = getAccentColor(raw);
        s.tR = tr; s.tG = tg; s.tB = tb;
      } else {
        s.hoveredEl   = null;
        s.morphRect   = null;
        s.targetScale = 1;
        // Spring back to default red
        s.tR = DEFAULT_R; s.tG = DEFAULT_G; s.tB = DEFAULT_B;
      }
    };

    const onMouseDown = () => {
      const s = S.current;
      if (s.mode !== "button") s.targetScale = Math.max(0.75, s.targetScale * 0.75);
      if (s.ripples.length < MAX_RIPPLES) {
        s.ripples.push({ x: s.mouseX, y: s.mouseY, age: 0 });
      }
    };

    const onMouseUp = () => {
      const s = S.current;
      if      (s.mode === "hover")   s.targetScale = 1.6;
      else if (s.mode === "default") s.targetScale = 1;
    };

    const onScroll = () => {
      const s = S.current;
      if (s.mode !== "button" || !s.hoveredEl) return;
      if (!document.contains(s.hoveredEl)) {
        s.mode = "default"; s.hoveredEl = null; s.morphRect = null;
        s.targetScale = 1;
        s.tR = DEFAULT_R; s.tG = DEFAULT_G; s.tB = DEFAULT_B;
      } else {
        s.morphRect = buildMorphRect(s.hoveredEl);
      }
    };

    window.addEventListener("mousemove",   onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown",   onMouseDown);
    window.addEventListener("mouseup",     onMouseUp);
    window.addEventListener("scroll",      onScroll, { passive: true, capture: true });

    // ── Draw loop ──

    const draw = (timestamp: number) => {
      const s  = S.current;
      const dt = s.lastTime === 0
        ? 0.016
        : Math.min((timestamp - s.lastTime) / 1000, MAX_DT);
      s.lastTime = timestamp;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Physics — position, scale, blend
      [s.ringX,     s.ringVX]     = stepSpring(s.ringX,     s.mouseX,      s.ringVX,     90, 24, dt);
      [s.ringY,     s.ringVY]     = stepSpring(s.ringY,     s.mouseY,      s.ringVY,     90, 24, dt);
      [s.ringScale, s.ringScaleV] = stepSpring(s.ringScale, s.targetScale, s.ringScaleV, 25, 14, dt);

      s.glowPhase += GLOW_SPEED * dt;

      const targetBlend = s.mode === "button" ? 1 : 0;
      [s.blend, s.blendV] = stepSpring(s.blend, targetBlend, s.blendV, 30, 14, dt);
      s.blend = Math.max(0, Math.min(1, s.blend));

      // Morph rect springs
      const mr  = s.morphRect;
      const tCX = mr ? mr.cx : s.mouseX;
      const tCY = mr ? mr.cy : s.mouseY;
      const tW  = mr ? mr.w  : 36;
      const tH  = mr ? mr.h  : 36;
      const tR  = mr ? mr.r  : 18;

      [s.mCX, s.mVCX] = stepSpring(s.mCX, tCX, s.mVCX, 60, 18, dt);
      [s.mCY, s.mVCY] = stepSpring(s.mCY, tCY, s.mVCY, 60, 18, dt);
      [s.mW,  s.mVW]  = stepSpring(s.mW,  tW,  s.mVW,  60, 18, dt);
      [s.mH,  s.mVH]  = stepSpring(s.mH,  tH,  s.mVH,  60, 18, dt);
      [s.mR,  s.mVR]  = stepSpring(s.mR,  tR,  s.mVR,  60, 18, dt);

      // Colour springs — smooth transition between accent colours
      [s.r, s.rV] = stepSpring(s.r, s.tR, s.rV, 20, 10, dt);
      [s.g, s.gV] = stepSpring(s.g, s.tG, s.gV, 20, 10, dt);
      [s.b, s.bV] = stepSpring(s.b, s.tB, s.bV, 20, 10, dt);

      const R = Math.round(s.r), G = Math.round(s.g), B = Math.round(s.b);

      // Derived
      const radius    = BASE_RING_RADIUS * Math.max(0.1, s.ringScale);
      const stretch   = Math.min(s.speed / 700, 0.35);
      const ringAlpha = 1 - s.blend;
      const glowA     = (0.15 + Math.sin(s.glowPhase) * 0.05).toFixed(3);
      const isHover   = s.mode === "hover" || s.mode === "button";

      // ── Ring ──
      if (ringAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = ringAlpha;
        ctx.translate(s.ringX, s.ringY);
        ctx.rotate(s.angle);
        ctx.scale(1 + stretch, 1 - stretch * 0.5);

        const glowR = radius * 2.5;
        const glow  = ctx.createRadialGradient(0, 0, radius * 0.6, 0, 0, glowR);
        glow.addColorStop(0, `rgba(${R},${G},${B},${glowA})`);
        glow.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.beginPath();
        ctx.arc(0, 0, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = isHover
          ? `rgba(${R},${G},${B},0.85)`
          : `rgba(${R},${G},${B},0.6)`;
        ctx.lineWidth = isHover ? 2 : 1.5;
        ctx.setLineDash([3, 5]);
        ctx.lineDashOffset = -s.glowPhase * 6;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      }

      // ── Button morph ──
      if (s.blend > 0.01) {
        const headerEl     = document.querySelector("[data-header]") as HTMLElement | null;
        const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 0;
        // Only clip when the hovered element is OUTSIDE the header.
        // If the user is hovering a nav link, hoveredEl is inside the header → no clip.
        const hoveredInHeader = s.hoveredEl
          ? s.hoveredEl.closest("[data-header]") !== null
          : false;

        ctx.save();
        ctx.globalAlpha = s.blend;

        if (!hoveredInHeader && headerBottom > 0) {
          // Clip morph to below the header so card glow never bleeds over it
          ctx.beginPath();
          ctx.rect(0, headerBottom, window.innerWidth, window.innerHeight - headerBottom);
          ctx.clip();
        }

        const maxDim  = Math.max(s.mW, s.mH);
        const morphGA = (0.12 + Math.sin(s.glowPhase) * 0.04).toFixed(3);
        const bg      = ctx.createRadialGradient(s.mCX, s.mCY, 0, s.mCX, s.mCY, maxDim);
        bg.addColorStop(0, `rgba(${R},${G},${B},${morphGA})`);
        bg.addColorStop(1, `rgba(${R},${G},${B},0)`);

        drawRoundedRect(ctx, s.mCX, s.mCY, s.mW + 30, s.mH + 30, s.mR + 15);
        ctx.fillStyle = bg;
        ctx.fill();

        drawRoundedRect(ctx, s.mCX, s.mCY, s.mW, s.mH, s.mR);
        ctx.strokeStyle = `rgba(${R},${G},${B},0.85)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      // ── Centre dot ──
      const dotFade = s.mode === "button" ? 1 - s.blend * 0.6 : 1;
      if (dotFade > 0.01) {
        const pulse = 1 + Math.sin(s.glowPhase * 1.8) * 0.08;
        ctx.beginPath();
        ctx.arc(s.mouseX, s.mouseY, Math.max(0, 4 * pulse * dotFade), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},1)`;
        ctx.fill();
      }

      // ── Ripples ──
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const rp = s.ripples[i];
        rp.age += dt;
        if (rp.age >= RIPPLE_LIFE) { s.ripples.splice(i, 1); continue; }
        const t     = rp.age / RIPPLE_LIFE;
        const alpha = (1 - t) * (1 - t);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, t * RIPPLE_MAX_R, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5 * (1 - t);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    function teardown() {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     applySize);
      window.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
      window.removeEventListener("scroll",     onScroll, true);
      pointerMQ.removeEventListener("change",  onPointerChange);
    }

    return teardown;
  }, []);

  if (typeof window !== "undefined" && shouldDisable()) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) and (min-width: 1024px) {
          *:not(iframe) { cursor: none !important; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 2147483647, pointerEvents: "none" }}
        aria-hidden="true"
        role="presentation"
      />
    </>
  );
}