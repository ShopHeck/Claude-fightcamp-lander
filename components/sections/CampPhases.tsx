"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

type Phase = {
  key: string;
  name: string;
  label: string;
  desc: string;
  intensity: number;
  load: string;
  calories: string;
  weight: string;
  tint: string;
  accent: string;
};

const PHASES: Phase[] = [
  {
    key: "base",
    name: "01 · BASE",
    label: "Build the engine",
    desc: "Long, low-intensity conditioning. Skill work in volume. The aerobic floor everything sits on.",
    intensity: 0.3,
    load: "Moderate",
    calories: "+200",
    weight: "178 lbs",
    tint: "#0E1922",
    accent: "#3B82F6",
  },
  {
    key: "build",
    name: "02 · BUILD",
    label: "Add the edge",
    desc: "Sparring intensifies. Strength shifts to power. Macros tighten. The work gets harder for a reason.",
    intensity: 0.6,
    load: "High",
    calories: "+0",
    weight: "172 lbs",
    tint: "#1A1410",
    accent: "#FACC15",
  },
  {
    key: "peak",
    name: "03 · PEAK",
    label: "Sharpen the weapon",
    desc: "Fight-pace sparring. Top-end speed. Every session is a rehearsal. Recovery is non-negotiable.",
    intensity: 0.95,
    load: "Very High",
    calories: "–400",
    weight: "168 lbs",
    tint: "#1F0F08",
    accent: "#FF6A1A",
  },
  {
    key: "taper",
    name: "04 · TAPER",
    label: "Land fresh",
    desc: "Volume drops, intensity stays sharp. Hit the scale, top off, get loose, get in.",
    intensity: 0.4,
    load: "Light",
    calories: "Cycle",
    weight: "165 lbs",
    tint: "#0F1822",
    accent: "#A855F7",
  },
];

export function CampPhases() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const idx = useTransform(scrollYProgress, [0, 1], [0, PHASES.length - 1]);

  return (
    <section
      id="phases"
      aria-labelledby="phases-h"
      className="relative bg-bg-base"
    >
      {/* Static fallback for small screens + reduced-motion */}
      <div className="container-page py-20 lg:hidden">
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
            ARC
          </span>
          <p className="text-eyebrow text-brand-orange">Camp phases</p>
        </div>
        <h2 id="phases-h" className="text-display text-h2 mt-4">
          Four phases. <span className="text-brand-orange">One&nbsp;arc.</span>
        </h2>
        <p className="mt-5 max-w-lg text-lg text-ink-muted">
          Every session, meal, and gram of water is mapped to where you are in
          camp.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PHASES.map((p) => (
            <div
              key={p.key}
              className="rounded-2xl border border-line-subtle p-5"
              style={{ background: `linear-gradient(140deg, ${p.tint} 0%, #0a0a0b 80%)` }}
            >
              <div className="text-xs font-bold tracking-widest" style={{ color: p.accent }}>
                {p.name}
              </div>
              <div className="mt-1 text-lg font-bold text-white">{p.label}</div>
              <p className="mt-1 text-sm text-ink-muted">{p.desc}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat label="Load" value={p.load} />
                <Stat label="Cals" value={p.calories} />
                <Stat label="Weight" value={p.weight} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned cinematic version */}
      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `${PHASES.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {PHASES.map((p, i) => (
            <PhaseTint key={p.key} phase={p} index={i} idx={idx} />
          ))}
          <div className="container-page relative grid w-full grid-cols-[1.1fr_1fr] items-center gap-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
                  ARC
                </span>
                <p className="text-eyebrow text-brand-orange">Camp phases</p>
              </div>
              <h2 className="text-display text-h2 mt-4">
                Four phases. <span className="text-brand-orange">One&nbsp;arc.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg text-ink-muted">
                Scroll through your camp. Watch the load build, the cut land,
                and the taper sharpen you up. Every screen in Fight Camp
                shifts with the phase you're in.
              </p>
              <div className="mt-8 flex gap-2">
                {PHASES.map((p, i) => (
                  <PhaseDot key={p.key} index={i} idx={idx} accent={p.accent} />
                ))}
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3">
                <DynStat label="Load" idx={idx} values={PHASES.map((p) => p.load)} />
                <DynStat label="Cals / day" idx={idx} values={PHASES.map((p) => p.calories)} />
                <DynStat label="Weight" idx={idx} values={PHASES.map((p) => p.weight)} />
              </div>
            </div>
            <div className="relative">
              <div className="mb-3 flex justify-end">
                <PhaseLabel idx={idx} />
              </div>
              <div className="rounded-3xl border border-line-subtle bg-bg-card/70 p-6 backdrop-blur">
                <div className="text-eyebrow mb-4 text-ink-muted">
                  Training load by phase
                </div>
                <div className="flex h-48 items-end gap-4">
                  {PHASES.map((p, i) => (
                    <PhaseBar key={p.key} phase={p} index={i} idx={idx} />
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-4 gap-4 text-center">
                  {PHASES.map((p) => (
                    <div
                      key={p.key}
                      className="text-[10px] font-bold uppercase tracking-wider text-ink-muted"
                    >
                      {p.key}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseTint({
  phase,
  index,
  idx,
}: {
  phase: Phase;
  index: number;
  idx: MotionValue<number>;
}) {
  const opacity = useTransform(idx, [index - 0.6, index, index + 0.6], [0, 1, 0]);
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        background: `radial-gradient(ellipse at 70% 50%, ${phase.tint} 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, ${phase.accent}22 0%, transparent 45%)`,
      }}
    />
  );
}

function PhaseDot({
  index,
  idx,
  accent,
}: {
  index: number;
  idx: MotionValue<number>;
  accent: string;
}) {
  const scale = useTransform(idx, [index - 0.5, index, index + 0.5], [1, 1.6, 1]);
  const opacity = useTransform(idx, [index - 0.5, index, index + 0.5], [0.35, 1, 0.35]);
  return (
    <motion.span
      style={{ scale, opacity, background: accent, boxShadow: `0 0 16px ${accent}` }}
      className="block h-2.5 w-2.5 rounded-full"
    />
  );
}

function DynStat({
  label,
  idx,
  values,
}: {
  label: string;
  idx: MotionValue<number>;
  values: string[];
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-card/70 p-3 backdrop-blur">
      <div className="text-[10px] font-bold tracking-widest text-ink-muted">
        {label}
      </div>
      <div className="relative mt-1 h-6">
        {values.map((v, i) => (
          <DynStatRow key={i} index={i} value={v} idx={idx} />
        ))}
      </div>
    </div>
  );
}

function DynStatRow({
  index,
  value,
  idx,
}: {
  index: number;
  value: string;
  idx: MotionValue<number>;
}) {
  const opacity = useTransform(idx, [index - 0.5, index, index + 0.5], [0, 1, 0]);
  const y = useTransform(idx, [index - 0.5, index, index + 0.5], [12, 0, -12]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 text-xl font-black text-white"
    >
      {value}
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white/5 px-2 py-1.5 text-center">
      <div className="text-[9px] font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </div>
      <div className="text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function PhaseBar({
  phase,
  index,
  idx,
}: {
  phase: Phase;
  index: number;
  idx: MotionValue<number>;
}) {
  const opacity = useTransform(idx, [index - 0.6, index, index + 0.6], [0.3, 1, 0.3]);
  const height = useTransform(idx, (v) => {
    const reached = Math.min(1, Math.max(0, v + 0.4 - index));
    return `${20 + reached * phase.intensity * 80}%`;
  });
  return (
    <motion.div
      style={{
        height,
        opacity,
        background: phase.accent,
        boxShadow: `0 0 20px ${phase.accent}55`,
      }}
      className="w-12 rounded-t-md"
    />
  );
}

function PhaseLabel({ idx }: { idx: MotionValue<number> }) {
  return (
    <div className="relative h-7 w-full">
      {PHASES.map((p, i) => (
        <PhaseLabelItem key={p.key} phase={p} index={i} idx={idx} />
      ))}
    </div>
  );
}

function PhaseLabelItem({
  phase,
  index,
  idx,
}: {
  phase: Phase;
  index: number;
  idx: MotionValue<number>;
}) {
  const opacity = useTransform(idx, [index - 0.5, index, index + 0.5], [0, 1, 0]);
  const y = useTransform(idx, [index - 0.5, index, index + 0.5], [10, 0, -10]);
  return (
    <motion.div
      style={{ opacity, y, borderColor: `${phase.accent}66` }}
      className="absolute right-0 top-0 inline-flex items-center gap-2 whitespace-nowrap rounded-full border bg-bg-base px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
    >
      <span style={{ background: phase.accent }} className="h-1.5 w-1.5 rounded-full" />
      <span style={{ color: phase.accent }}>{phase.name}</span>
      <span className="font-semibold tracking-normal normal-case text-white/70">
        — {phase.label}
      </span>
    </motion.div>
  );
}
