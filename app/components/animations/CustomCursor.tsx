"use client";

/**
 * AnimatedCursor — Production-hardened custom cursor
 *
 * Design intent preserved:
 *   • Ring with velocity-based stretch
 *   • Morph to button bounding-rect outline
 *   • Morph to text-beam on input/textarea/contenteditable
 *   • Ripple burst on click
 *   • Ambient glow pulse
 *
 * Architecture:
 *   • Single stable ref for ALL mutable state — no stale closures
 *   • RAF loop lives entirely inside one useEffect, cancelled cleanly
 *   • Strict Mode safe: cancel-before-start pattern prevents double loops
 *   • No React state mutations inside RAF — zero re-renders during animation
 */

import { useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_RING_RADIUS = 18;
const MAX_RIPPLES      = 6;
const RIPPLE_LIFE      = 0.6;    // seconds
const RIPPLE_MAX_R     = 50;     // px
const MAX_DT           = 0.05;   // seconds — caps dt on tab-switch / sleep
const MAX_VELOCITY     = 3000;   // px/s — spring explosion guard
const SNAP_THRESHOLD   = 0.08;   // px — snap-to-rest threshold
const GLOW_SPEED       = 3;      // rad/s
const BLINK_SPEED      = 2.5;    // rad/s

// Colours — string constants, never recreated
const COL_DOT          = "rgba(139,30,30,1)";
const COL_RING_DEFAULT = "rgba(162,75,75,0.6)";
const COL_MORPH_STROKE = "rgba(139,30,30,0.85)";
const COL_BEAM_FILL    = "rgba(139,30,30,0.95)";

const INTERACTIVE_SELECTOR =
  "a[href], button, input, textarea, select, [role='button'], [role='link'], .cursor-pointer, [contenteditable]";

const TEXT_INPUT_TYPES = new Set([
  "text", "email", "password", "search", "url", "tel", "number", "",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

type CursorMode = "default" | "button" | "input";

interface Ripple {
  x: number;
  y: number;
  age: number;
}

interface MorphRect {
  cx: number;
  cy: number;
  w: number;
  h: number;
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

  // Animated morph rect springs
  mCX: number; mCY: number; mVCX: number; mVCY: number;
  mW:  number; mH:  number; mVW:  number; mVH:  number;
  mR:  number; mVR: number;

  // Blend: 0 = ring, 1 = morphed
  blend: number; blendV: number;

  ripples: Ripple[];
  lastTime: number;
}

// ─── Spring ───────────────────────────────────────────────────────────────────

function stepSpring(
  value: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  dt: number,
): [number, number] {
  const delta = target - value;
  if (Math.abs(delta) < SNAP_THRESHOLD && Math.abs(velocity) < SNAP_THRESHOLD) {
    return [target, 0];
  }
  const force = delta * stiffness - velocity * damping;
  const v = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity + force * dt));
  return [value + v * dt, v];
}

// ─── DOM Helpers ─────────────────────────────────────────────────────────────

function getMode(el: HTMLElement | null): CursorMode {
  if (!el) return "default";
  const tag  = el.tagName.toLowerCase();
  const role = el.getAttribute("role");

  if (tag === "input") {
    const t = ((el as HTMLInputElement).type ?? "").toLowerCase();
    return TEXT_INPUT_TYPES.has(t) ? "input" : "button";
  }
  if (tag === "textarea" || el.isContentEditable)                     return "input";
  if (tag === "button" || tag === "a")                                 return "button";
  if (role === "button" || role === "link")                            return "button";
  if (el.classList.contains("cursor-pointer"))                         return "button";
  return "default";
}

function getBorderRadius(el: HTMLElement): number {
  // Read only top-left to avoid forced reflow of all 4 corners
  const r = parseFloat(window.getComputedStyle(el).borderTopLeftRadius) || 0;
  return Math.min(r, 9999);
}

function buildMorphRect(el: HTMLElement, mode: CursorMode, mouseX: number): MorphRect {
  const rect = el.getBoundingClientRect(); // viewport coords — matches clientX/Y

  if (mode === "input") {
    return {
      cx: mouseX,
      cy: rect.top + rect.height / 2,
      w: 2,
      h: rect.height * 0.65,
      r: 1,
    };
  }

  const pad = 6;
  const br  = getBorderRadius(el);
  return {
    cx: rect.left + rect.width  / 2,
    cy: rect.top  + rect.height / 2,
    w:  rect.width  + pad * 2,
    h:  rect.height + pad * 2,
    r:  Math.min(br + pad, (rect.height + pad * 2) / 2),
  };
}

// ─── Canvas Helpers ───────────────────────────────────────────────────────────

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  w: number,  h: number,
  r: number,
): void {
  const hx = w / 2;
  const hy = h / 2;
  const cr = Math.min(Math.abs(r), hx, hy);
  const x  = cx - hx;
  const y  = cy - hy;
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

  // ALL mutable animation state in one stable ref — zero stale-closure risk
  const S = useRef<CursorState>({
    mouseX: -200, mouseY: -200,
    ringX: -200,  ringY: -200, ringVX: 0, ringVY: 0,
    ringScale: 1, ringScaleV: 0, targetScale: 1,
    speed: 0, angle: 0, glowPhase: 0,
    mode: "default", hoveredEl: null, morphRect: null,
    mCX: -200, mCY: -200, mVCX: 0, mVCY: 0,
    mW: 36, mH: 36, mVW: 0, mVH: 0,
    mR: 18, mVR: 0,
    blend: 0, blendV: 0,
    ripples: [],
    lastTime: 0,
  });

  // RAF id — stable ref, never triggers re-render
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (shouldDisable()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Strict Mode / double-invoke safety: cancel any previous loop
    cancelAnimationFrame(rafRef.current);

    // ── DPR-aware sizing — transform reset prevents compounding on resize ──
    let dpr = 1;
    const applySize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      // Reset to identity THEN apply scale — never compound
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();
    window.addEventListener("resize", applySize, { passive: true });

    // Auto-destroy when pointer becomes coarse (e.g. tablet mode)
    const pointerMQ = window.matchMedia("(pointer: fine)");
    const onPointerChange = () => { if (!pointerMQ.matches) teardown(); }; // eslint-disable-line @typescript-eslint/no-use-before-define
    pointerMQ.addEventListener("change", onPointerChange);

    // ── Event handlers — all use clientX/Y (scroll-independent) ──

    const onMouseMove = (e: MouseEvent) => {
      const s = S.current;
      const dx = e.clientX - s.mouseX;
      const dy = e.clientY - s.mouseY;
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;

      const dist = Math.sqrt(dx * dx + dy * dy);
      s.speed += (dist - s.speed) * 0.25; // EMA
      if (dx !== 0 || dy !== 0) s.angle = Math.atan2(dy, dx);

      // Keep beam X locked to physical cursor while inside input
      if (s.mode === "input" && s.morphRect) {
        s.morphRect.cx = e.clientX;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const s    = S.current;
      const raw  = e.target as HTMLElement | null;
      if (!raw) return;

      // Walk up to nearest interactive ancestor (handles child-element events)
      const el   = raw.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      const mode = getMode(el);

      s.mode      = mode;
      s.hoveredEl = el;
      s.morphRect = (mode !== "default" && el)
        ? buildMorphRect(el, mode, s.mouseX)
        : null;

      s.targetScale = 1; // scale only drives ring; morph uses blend
    };

    const onMouseDown = () => {
      const s = S.current;
      if (s.mode === "default") s.targetScale = 0.75;
      if (s.ripples.length < MAX_RIPPLES) {
        s.ripples.push({ x: s.mouseX, y: s.mouseY, age: 0 });
      }
    };

    const onMouseUp = () => {
      if (S.current.mode === "default") S.current.targetScale = 1;
    };

    // Refresh button rect on scroll so morph follows the element
    const onScroll = () => {
      const s = S.current;
      if (s.mode !== "button" || !s.hoveredEl || !s.morphRect) return;
      if (!document.contains(s.hoveredEl)) {
        // Element removed from DOM — graceful fallback
        s.mode = "default"; s.hoveredEl = null; s.morphRect = null;
      } else {
        s.morphRect = buildMorphRect(s.hoveredEl, "button", s.mouseX);
      }
    };

    window.addEventListener("mousemove",  onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);
    window.addEventListener("scroll",     onScroll,    { passive: true, capture: true });

    // ── RAF draw loop — zero external dependencies, no stale closures ──
    const draw = (timestamp: number) => {
      const s  = S.current;
      const dt = s.lastTime === 0
        ? 0.016
        : Math.min((timestamp - s.lastTime) / 1000, MAX_DT);
      s.lastTime = timestamp;

      // Clear logical-pixel size (ctx already has dpr transform)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // ── Physics ──
      [s.ringX,     s.ringVX]     = stepSpring(s.ringX,     s.mouseX,       s.ringVX,     90, 24, dt);
      [s.ringY,     s.ringVY]     = stepSpring(s.ringY,     s.mouseY,       s.ringVY,     90, 24, dt);
      [s.ringScale, s.ringScaleV] = stepSpring(s.ringScale, s.targetScale,  s.ringScaleV, 25, 14, dt);

      s.glowPhase += GLOW_SPEED * dt;

      const targetBlend = s.mode !== "default" ? 1 : 0;
      [s.blend, s.blendV] = stepSpring(s.blend, targetBlend, s.blendV, 30, 14, dt);
      s.blend = Math.max(0, Math.min(1, s.blend));

      // Morph rect springs — fall back to cursor pos when no rect
      const mr = s.morphRect;
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

      // ── Derived ──
      const radius     = BASE_RING_RADIUS * Math.max(0.1, s.ringScale);
      const stretch    = Math.min(s.speed / 700, 0.35);
      const ringAlpha  = 1 - s.blend;
      const glowA      = (0.15 + Math.sin(s.glowPhase) * 0.05).toFixed(3);

      // ─────────────────────────────────────────
      // DRAW: Ring
      // ─────────────────────────────────────────
      if (ringAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = ringAlpha;
        ctx.translate(s.ringX, s.ringY);
        ctx.rotate(s.angle);
        ctx.scale(1 + stretch, 1 - stretch * 0.5);

        const glowR = radius * 2.5;
        const glow  = ctx.createRadialGradient(0, 0, radius * 0.6, 0, 0, glowR);
        glow.addColorStop(0, `rgba(139,30,30,${glowA})`);
        glow.addColorStop(1, "rgba(139,30,30,0)");
        ctx.beginPath();
        ctx.arc(0, 0, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = COL_RING_DEFAULT;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      // ─────────────────────────────────────────
      // DRAW: Button morph
      // ─────────────────────────────────────────
      if (s.blend > 0.01 && (s.mode === "button" || (s.mode === "default" && s.blend > 0.01))) {
        ctx.save();
        ctx.globalAlpha = s.blend;

        const maxDim  = Math.max(s.mW, s.mH);
        const morphGA = (0.12 + Math.sin(s.glowPhase) * 0.04).toFixed(3);
        const bg      = ctx.createRadialGradient(s.mCX, s.mCY, 0, s.mCX, s.mCY, maxDim);
        bg.addColorStop(0, `rgba(139,30,30,${morphGA})`);
        bg.addColorStop(1, "rgba(139,30,30,0)");

        drawRoundedRect(ctx, s.mCX, s.mCY, s.mW + 30, s.mH + 30, s.mR + 15);
        ctx.fillStyle = bg;
        ctx.fill();

        drawRoundedRect(ctx, s.mCX, s.mCY, s.mW, s.mH, s.mR);
        ctx.strokeStyle = COL_MORPH_STROKE;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      // ─────────────────────────────────────────
      // DRAW: Input beam
      // ─────────────────────────────────────────
      if (s.blend > 0.01 && s.mode === "input") {
        // Smooth blink: 0..1, long on-phase, quick off-phase
        const blink = (Math.sin(s.glowPhase * BLINK_SPEED) + 1) / 2;
        const beamA = blink > 0.2 ? 1 : blink / 0.2;

        if (beamA > 0.01) {
          ctx.save();
          ctx.globalAlpha = s.blend * beamA;

          const bx = s.mouseX;   // X follows cursor precisely — no spring lag
          const by = s.mCY;      // Y springs to input centre
          const bh = Math.max(2, s.mH);
          const bw = Math.max(1.5, s.mW);

          // Glow halo
          const beamGlow = ctx.createLinearGradient(bx, by - bh / 2, bx, by + bh / 2);
          beamGlow.addColorStop(0,   "rgba(139,30,30,0)");
          beamGlow.addColorStop(0.5, "rgba(139,30,30,0.18)");
          beamGlow.addColorStop(1,   "rgba(139,30,30,0)");
          drawRoundedRect(ctx, bx, by, bw + 10, bh, (bw + 10) / 2);
          ctx.fillStyle = beamGlow;
          ctx.fill();

          // Beam bar
          drawRoundedRect(ctx, bx, by, bw, bh, bw / 2);
          ctx.fillStyle = COL_BEAM_FILL;
          ctx.fill();

          ctx.restore();
        }
      }

      // ─────────────────────────────────────────
      // DRAW: Centre dot
      // ─────────────────────────────────────────
      const dotFade =
        s.mode === "input"  ? 1 - s.blend :
        s.mode === "button" ? 1 - s.blend * 0.6 : 1;

      if (dotFade > 0.01) {
        const pulse = 1 + Math.sin(s.glowPhase * 1.8) * 0.08;
        ctx.beginPath();
        ctx.arc(s.mouseX, s.mouseY, Math.max(0, 4 * pulse * dotFade), 0, Math.PI * 2);
        ctx.fillStyle = COL_DOT;
        ctx.fill();
      }

      // ─────────────────────────────────────────
      // DRAW: Ripples
      // ─────────────────────────────────────────
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const rp = s.ripples[i];
        rp.age += dt;
        if (rp.age >= RIPPLE_LIFE) { s.ripples.splice(i, 1); continue; }
        const t     = rp.age / RIPPLE_LIFE;
        const alpha = (1 - t) * (1 - t); // quadratic fade
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, t * RIPPLE_MAX_R, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,30,30,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5 * (1 - t);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // ── Teardown — called on unmount OR pointer-coarse change ──
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
  }, []); // empty — effect is fully self-contained

  // Server-side or touch: render nothing
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
        style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
        aria-hidden="true"
        role="presentation"
      />
    </>
  );
}