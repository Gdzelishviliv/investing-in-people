"use client";

import { useEffect, useRef, useState } from "react";

/* ================================
   Spring Physics
================================ */

function spring(
  current: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  dt: number
) {
  const force = (target - current) * stiffness;
  const accel = force - velocity * damping;
  velocity += accel * dt;
  current += velocity * dt;
  return { value: current, velocity };
}

/* ================================
   Desktop Detection Hook
================================ */

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      setIsDesktop(finePointer && window.innerWidth >= breakpoint);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isDesktop;
}

/* ================================
   Component
================================ */

export function AnimatedCursor() {
  const isDesktop = useIsDesktop(1024);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(0);

  const state = useRef({
    mouseX: -100,
    mouseY: -100,

    ringX: -100,
    ringY: -100,
    ringVX: 0,
    ringVY: 0,

    ringScale: 1,
    ringScaleV: 0,
    targetScale: 1,

    speed: 0,
    angle: 0,
    glowPhase: 0,

    isHover: false,

    ripples: [] as { x: number; y: number; age: number; life: number }[],
  });

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ================= Resize ================= */

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    /* ================= Interaction ================= */

    const isInteractive = (el: HTMLElement | null) =>
      !!el?.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );

    const onMove = (e: MouseEvent) => {
      const s = state.current;

      const dx = e.clientX - s.mouseX;
      const dy = e.clientY - s.mouseY;

      s.mouseX = e.clientX;
      s.mouseY = e.clientY;

      const velocity = Math.sqrt(dx * dx + dy * dy);
      s.speed += (velocity - s.speed) * 0.25;

      if (dx || dy) s.angle = Math.atan2(dy, dx);
    };

    const onOver = (e: MouseEvent) => {
      const s = state.current;
      s.isHover = isInteractive(e.target as HTMLElement);
      s.targetScale = s.isHover ? 2.2 : 1;
    };

    const onDown = () => {
      const s = state.current;
      s.targetScale = 0.75;

      if (s.ripples.length < 5) {
        s.ripples.push({
          x: s.mouseX,
          y: s.mouseY,
          age: 0,
          life: 0.6,
        });
      }
    };

    const onUp = () => {
      const s = state.current;
      s.targetScale = s.isHover ? 2.2 : 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    /* ================= Animation ================= */

    const animate = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const s = state.current;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      /* --- Fast Responsive Ring --- */
      const rx = spring(s.ringX, s.mouseX, s.ringVX, 90, 24, dt);
      const ry = spring(s.ringY, s.mouseY, s.ringVY, 90, 24, dt);

      s.ringX = rx.value;
      s.ringVX = rx.velocity;
      s.ringY = ry.value;
      s.ringVY = ry.velocity;

      const scaleSpring = spring(
        s.ringScale,
        s.targetScale,
        s.ringScaleV,
        25,
        14,
        dt
      );

      s.ringScale = scaleSpring.value;
      s.ringScaleV = scaleSpring.velocity;

      s.glowPhase += dt * 3;

      /* --- Draw Ring --- */

      const baseRadius = 18;
      const radius = baseRadius * s.ringScale;

      const stretch = Math.min(s.speed / 700, 0.35);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.5;

      ctx.save();
      ctx.translate(s.ringX, s.ringY);
      ctx.rotate(s.angle);
      ctx.scale(scaleX, scaleY);

      const glow = ctx.createRadialGradient(
        0,
        0,
        radius * 0.6,
        0,
        0,
        radius * 2.5
      );

      glow.addColorStop(
        0,
        `rgba(139,30,30,${0.15 + Math.sin(s.glowPhase) * 0.05})`
      );
      glow.addColorStop(1, "rgba(139,30,30,0)");

      ctx.beginPath();
      ctx.arc(0, 0, radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = s.isHover
        ? "rgba(139,30,30,0.85)"
        : "rgba(162,75,75,0.6)";
      ctx.lineWidth = s.isHover ? 2 : 1.5;
      ctx.stroke();

      ctx.restore();

      /* --- Center Dot (Instant) --- */

      const dotPulse = 1 + Math.sin(s.glowPhase * 1.8) * 0.08;
      const dotRadius = 4 * dotPulse;

      ctx.beginPath();
      ctx.arc(s.mouseX, s.mouseY, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139,30,30,1)";
      ctx.fill();

      /* --- Ripples --- */

      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const r = s.ripples[i];
        r.age += dt;

        if (r.age >= r.life) {
          s.ripples.splice(i, 1);
          continue;
        }

        const progress = r.age / r.life;
        const rippleRadius = progress * 50;
        const alpha = 1 - progress;

        ctx.beginPath();
        ctx.arc(r.x, r.y, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,30,30,${alpha})`;
        ctx.lineWidth = 2 * alpha;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) and (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        aria-hidden="true"
      />
    </>
  );
}
