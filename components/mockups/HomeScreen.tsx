"use client";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Activity,
  Brain,
  Shield,
  Bluetooth,
  Droplets,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FlameLogo } from "../ui/FlameLogo";

// 12 days, 4 hours, 37 min, 12s from "now" — keeps the countdown realistic across visits.
function useFightCountdown() {
  const target = useMemo(() => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + 12 * 86400 + 4 * 3600 + 37 * 60 + 12);
    return d.getTime();
  }, []);
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return { days, hours, mins, secs };
}

const ACTIVITY_FEED = [
  { name: "Long Conditioning", date: "Today", min: 60, rpe: 8 },
  { name: "Hard Sparring", date: "Yesterday", min: 90, rpe: 10 },
  { name: "Heavy Bag", date: "Apr 10", min: 45, rpe: 7 },
  { name: "Strength — Lower", date: "Apr 9", min: 50, rpe: 7 },
  { name: "Pad Work", date: "Apr 8", min: 40, rpe: 8 },
  { name: "Recovery Run", date: "Apr 7", min: 30, rpe: 4 },
];

export function HomeScreen() {
  const { days, hours, mins, secs } = useFightCountdown();
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setOffset((o) => (o + 1) % ACTIVITY_FEED.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);
  const recent = [
    ACTIVITY_FEED[offset % ACTIVITY_FEED.length],
    ACTIVITY_FEED[(offset + 1) % ACTIVITY_FEED.length],
  ];

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden text-white">
      {/* header */}
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange">
          <FlameLogo className="h-4 w-4 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[12px] font-bold">Fight Camp</div>
          <div className="text-[9px] text-ink-muted">Michael · Welterweight</div>
        </div>
      </div>

      {/* countdown card */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-orange/40 bg-gradient-to-br from-brand-orange/30 via-brand-orange/10 to-transparent p-3">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-orange/30 blur-xl" />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[8px] font-bold tracking-widest text-brand-orange">
              FIGHT NIGHT
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[28px] font-black leading-none tabular-nums">
                {String(days).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-ink-muted">days</span>
              <span className="ml-1.5 text-[14px] font-bold leading-none tabular-nums text-white">
                {String(hours).padStart(2, "0")}h
              </span>
              <span className="text-[14px] font-bold leading-none tabular-nums text-white">
                {String(mins).padStart(2, "0")}m
              </span>
              <span className="text-[14px] font-bold leading-none tabular-nums text-brand-orange">
                {String(secs).padStart(2, "0")}s
              </span>
            </div>
            <div className="mt-0.5 text-[9px] text-ink-muted">April 24, 2026</div>
          </div>
          <div className="text-right">
            <div className="text-[18px] font-black leading-none">5R</div>
            <div className="text-[9px] text-ink-muted">2min rounds</div>
            <div className="text-[9px] font-semibold text-brand-orange">Welterweight</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[9px] text-ink-muted">
            <span>Week 5 of 6</span>
            <span>74% complete</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
            <div className="h-full rounded-full bg-brand-orange" style={{ width: "74%" }} />
          </div>
        </div>
      </div>

      {/* current phase */}
      <div className="rounded-2xl border border-line-subtle bg-bg-card p-3">
        <div className="flex items-center justify-between">
          <div className="text-[8px] font-bold tracking-widest text-ink-muted">CURRENT PHASE</div>
          <motion.span
            initial={false}
            animate={reduce ? {} : { opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full border border-accent-red/40 px-2 py-[2px] text-[8px] font-bold text-accent-red"
          >
            Peak
          </motion.span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="text-[11px] font-semibold leading-tight">
            Fight-pace sparring,
            <br />
            final sharpening
          </div>
          <ChevronRight className="h-4 w-4 text-ink-muted" />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            ))}
          </div>
          <span className="text-[9px] text-ink-muted">Very High</span>
        </div>
      </div>

      {/* cycling recent activity */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[8px] font-bold tracking-widest text-ink-muted">RECENT ACTIVITY</span>
          <span className="text-[9px] font-semibold text-brand-orange">See all</span>
        </div>
        <div className="relative h-[68px] overflow-hidden">
          <AnimatePresence initial={false}>
            {recent.map((r, i) => (
              <motion.div
                key={`${r.name}-${offset}-${i}`}
                initial={reduce ? false : { y: 32, opacity: 0 }}
                animate={{ y: i === 0 ? 0 : 34, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { y: -32, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 flex items-center gap-2 rounded-xl border border-line-subtle bg-bg-card px-2.5 py-1.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange/15">
                  <Activity className="h-3.5 w-3.5 text-brand-orange" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold">{r.name}</div>
                  <div className="text-[8px] text-ink-muted">
                    {r.date} · {r.min}min · RPE {r.rpe}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* weight status */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[8px] font-bold tracking-widest text-ink-muted">WEIGHT STATUS</span>
          <span className="text-[9px] font-semibold text-brand-orange">Track</span>
        </div>
        <div className="rounded-xl border border-line-subtle bg-bg-card px-2.5 py-2">
          <div className="flex items-center justify-between text-[9px]">
            <div>
              <div className="text-[14px] font-black leading-none">175</div>
              <div className="text-[8px] text-ink-muted">current</div>
            </div>
            <div className="flex-1 px-2">
              <div className="h-1 w-full rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-accent-blue" />
              </div>
              <div className="mt-0.5 flex justify-between text-[8px] text-ink-muted">
                <span>178 lbs</span>
                <span>165 lbs</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[14px] font-black leading-none text-brand-orange">165</div>
              <div className="text-[8px] text-ink-muted">target</div>
            </div>
          </div>
        </div>
      </div>

      {/* tools grid */}
      <div>
        <div className="mb-1.5 text-[8px] font-bold tracking-widest text-ink-muted">TOOLS</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { Icon: Brain, label: "AI Insights", sub: "Coach analysis", bg: "bg-accent-purple/15", fg: "text-accent-purple" },
            { Icon: Shield, label: "Game Plan", sub: "Fight strategy", bg: "bg-accent-red/15", fg: "text-accent-red" },
            { Icon: Droplets, label: "Nutrition", sub: "Water & meals", bg: "bg-accent-blue/15", fg: "text-accent-blue" },
            { Icon: Bluetooth, label: "Trackers", sub: "HR · HRV", bg: "bg-accent-green/15", fg: "text-accent-green" },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-1.5 rounded-xl border border-line-subtle bg-bg-card px-2 py-1.5"
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-md ${t.bg}`}>
                <t.Icon className={`h-3 w-3 ${t.fg}`} />
              </span>
              <div className="leading-tight">
                <div className="text-[9px] font-semibold">{t.label}</div>
                <div className="text-[7.5px] text-ink-muted">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
