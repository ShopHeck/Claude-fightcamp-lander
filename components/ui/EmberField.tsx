"use client";
import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
};

export function EmberField({
  count = 40,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): Ember {
      const maxLife = 240 + Math.random() * 240;
      return {
        x: Math.random() * w,
        y: h + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(0.25 + Math.random() * 0.55),
        r: 0.8 + Math.random() * 1.6,
        life: 0,
        maxLife,
      };
    }

    let embers: Ember[] = [];

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      // top-up to count
      while (embers.length < count) embers.push(spawn());

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vx += (Math.random() - 0.5) * 0.02;
        e.life += 1;
        const t = e.life / e.maxLife;
        const alpha = Math.max(0, 0.85 * (1 - t));
        const r = e.r * (1 - t * 0.4);
        if (r > 0.05) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, ${130 + Math.floor(80 * (1 - t))}, ${60 + Math.floor(40 * (1 - t))}, ${alpha})`;
          ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (e.life >= e.maxLife || e.y < -10) embers.splice(i, 1);
      }
      raf.current = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
