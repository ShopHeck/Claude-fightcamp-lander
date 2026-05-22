"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ReadinessRing({
  size = 220,
  to = 87,
  strokeWidth = 14,
}: {
  size?: number;
  to?: number;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const duration = 1800;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(to * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(to);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, reduce]);

  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className="block h-auto w-full max-w-[300px]"
      role="img"
      aria-label={`Fight readiness score ${Math.round(value)} of 100`}
    >
      <defs>
        <linearGradient id="readiness-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#FF6A1A" />
        </linearGradient>
        <radialGradient id="readiness-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6A1A" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#FF6A1A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="url(#readiness-glow)" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1F1F23"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#readiness-grad)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="46%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white"
        fontSize={size * 0.28}
        fontFamily="var(--font-display)"
        fontWeight={900}
      >
        {Math.round(value)}
      </text>
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-ink-muted"
        fontSize={size * 0.06}
        letterSpacing="0.2em"
        fontWeight={700}
      >
        FIGHT READY
      </text>
    </svg>
  );
}
