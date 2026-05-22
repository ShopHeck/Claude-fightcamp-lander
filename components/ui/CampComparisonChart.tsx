"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Two curves over 12 weeks. "Without" is jittery + late cut.
// "With" is a smooth, paced cut.
const WITHOUT = [185, 184.5, 184.6, 184.2, 184, 183.5, 184, 183.5, 182, 178, 173, 168, 165];
const WITH = [185, 183.5, 182, 180.5, 179, 177.5, 176, 174.5, 173, 171.5, 169, 167, 165];

export function CampComparisonChart() {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 1 : 0);
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
            const duration = 2200;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              setProgress(t);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  const w = 560;
  const h = 240;
  const pad = 28;
  const allWeights = [...WITHOUT, ...WITH];
  const min = Math.min(...allWeights) - 2;
  const max = Math.max(...allWeights) + 2;

  const pathFor = (vals: number[]) =>
    vals
      .map((v, i) => {
        const x = pad + ((w - 2 * pad) * i) / (vals.length - 1);
        const y = pad + ((h - 2 * pad) * (max - v)) / (max - min);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const withoutPath = pathFor(WITHOUT);
  const withPath = pathFor(WITH);
  // Approximate path length used to drive the stroke draw
  const len = 900;

  return (
    <div className="rounded-3xl border border-line-subtle bg-bg-card/70 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="text-eyebrow text-ink-muted">12-week cut · same fighter</div>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-full bg-accent-red" />
            <span className="text-ink-muted">Without app</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-full bg-brand-orange" />
            <span className="text-white">With Fight Camp</span>
          </div>
        </div>
      </div>
      <svg ref={ref} viewBox={`0 0 ${w} ${h + 26}`} className="mt-3 h-auto w-full">
        {/* gridlines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = pad + ((h - 2 * pad) * i) / 4;
          const v = max - ((max - min) * i) / 4;
          return (
            <g key={i}>
              <line x1={pad} x2={w - pad} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={2} y={y + 3} fill="#6B6B73" fontSize="9">
                {Math.round(v)}
              </text>
            </g>
          );
        })}
        {/* target line */}
        <line
          x1={pad}
          x2={w - pad}
          y1={pad + ((h - 2 * pad) * (max - 165)) / (max - min)}
          y2={pad + ((h - 2 * pad) * (max - 165)) / (max - min)}
          stroke="#FF6A1A"
          strokeDasharray="4 4"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x={w - pad}
          y={pad + ((h - 2 * pad) * (max - 165)) / (max - min) - 4}
          fill="#FF6A1A"
          fontSize="9"
          fontWeight={700}
          textAnchor="end"
        >
          165 lb target
        </text>
        {/* without curve */}
        <path
          d={withoutPath}
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - progress)}
          opacity="0.85"
        />
        {/* with curve */}
        <path
          d={withPath}
          fill="none"
          stroke="#FF6A1A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - progress)}
        />
        {/* x axis labels */}
        <text x={pad} y={h + 18} fill="#6B6B73" fontSize="9">
          Week 0
        </text>
        <text x={w - pad} y={h + 18} fill="#6B6B73" fontSize="9" textAnchor="end">
          Weigh-in
        </text>
      </svg>
      <p className="mt-4 text-sm text-ink-muted">
        Same fighter, same target. Without a plan, the cut lands late and the
        last 10 lbs come off in panic. With Fight Camp it's metered, paced,
        and on schedule.
      </p>
    </div>
  );
}
