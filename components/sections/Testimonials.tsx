"use client";
import { Quote, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";
import { ReadinessRing } from "../ui/ReadinessRing";
import { CampComparisonChart } from "../ui/CampComparisonChart";
import { CountUp } from "../ui/CountUp";

// TODO: swap placeholder testimonials with real fighter clips before public launch.
const TESTIMONIALS = [
  {
    name: "Andre M.",
    role: "Welterweight · 7-1",
    quote: "First camp I haven't gambled on my cut. The chart kept me honest from week one.",
    tint: "#0E1922",
  },
  {
    name: "Lina K.",
    role: "Muay Thai · Featherweight",
    quote: "I used to scribble round timers and meal macros in three different apps. Now it's one screen.",
    tint: "#1F0F08",
  },
  {
    name: "Marcus R.",
    role: "MMA · Middleweight",
    quote: "Coach loves it. He sees my whole camp the night before sparring and adjusts on the fly.",
    tint: "#1A1410",
  },
];

const SUB_METRICS = [
  { label: "Training load", value: 92, suffix: "%" },
  { label: "Recovery", value: 81, suffix: "%" },
  { label: "Sleep", value: 88, suffix: "%" },
  { label: "Weight target", value: 95, suffix: "%" },
];

export function Testimonials() {
  return (
    <SectionShell labelledBy="proof-h" glow>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
            06
          </span>
          <p className="text-eyebrow text-brand-orange">From the corner</p>
        </div>
        <h2 id="proof-h" className="text-display text-h2 mt-4 max-w-3xl">
          Fighters in the <span className="text-brand-orange">trenches.</span>
        </h2>
      </Reveal>

      {/* Readiness + sub-metrics */}
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-radial-orange blur-2xl"
            />
            <ReadinessRing to={87} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-lg text-lg text-ink-muted">
            One number tells the truth about your camp. The Fight Readiness
            score blends every signal — sessions, recovery, sleep, weight —
            into a single check: are you on track or not?
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {SUB_METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-line-subtle bg-bg-card/70 p-4 backdrop-blur"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">
                  {m.label}
                </div>
                <div className="mt-1 text-display text-3xl text-white">
                  <CountUp to={m.value} suffix={m.suffix} duration={1.4} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Before / after chart */}
      <div className="mt-16">
        <Reveal>
          <CampComparisonChart />
        </Reveal>
      </div>

      {/* Video testimonial cards */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <VideoTestimonialCard {...t} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function VideoTestimonialCard({
  name,
  role,
  quote,
  tint,
}: {
  name: string;
  role: string;
  quote: string;
  tint: string;
}) {
  const reduce = useReducedMotion();
  return (
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line-subtle bg-bg-card">
      {/* "video" placeholder — animated gradient until we drop real footage */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${tint}, #0a0a0b 70%), radial-gradient(circle at 70% 60%, #FF6A1A22, transparent 50%)`,
          }}
          animate={reduce ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* abstract silhouette suggestion */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen"
        >
          <defs>
            <linearGradient id={`g-${name}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6A1A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF6A1A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="130" rx="40" ry="44" fill={`url(#g-${name})`} />
          <path
            d="M120 280 C150 220, 250 220, 280 280 L280 320 L120 320 Z"
            fill={`url(#g-${name})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-end p-4">
          <button
            type="button"
            className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-black shadow-glow transition group-hover:scale-105 ring-focus"
            aria-label={`Play ${name}'s testimonial (placeholder)`}
          >
            <Play className="h-5 w-5 fill-current" />
          </button>
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
          0:42
        </div>
      </div>
      <figcaption className="flex flex-1 flex-col gap-4 p-5">
        <Quote className="h-5 w-5 text-brand-orange" />
        <blockquote className="flex-1 text-sm text-white">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="border-t border-line-subtle pt-3">
          <div className="font-semibold text-white">{name}</div>
          <div className="text-xs text-ink-muted">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
