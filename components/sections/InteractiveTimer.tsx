"use client";
import { Play, Pause, RotateCcw, Timer, Sliders, Monitor, Volume2, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";
import { PRESETS, formatTime, useTimer } from "@/lib/useTimer";

const BULLETS = [
  { Icon: Timer, title: "Discipline presets", desc: "Boxing 12×3, MMA 5×5, Muay Thai 5×3, HIIT 8×30s — one tap." },
  { Icon: Sliders, title: "Custom intervals", desc: "Rounds, work, rest, prep, warning — save unlimited custom timers." },
  { Icon: Monitor, title: "Gym display mode", desc: "Cast a giant timer to your TV or tablet for the whole gym." },
  { Icon: Volume2, title: "Audible round cues", desc: "Synthesized bell, 10-second warning, rest tone — eyes stay up." },
];

export function InteractiveTimer() {
  const reduce = useReducedMotion();
  const t = useTimer();
  const total = t.phase === "rest" ? t.preset.rest : t.preset.work;
  const fraction = total > 0 ? t.remaining / total : 0;
  const dash = 2 * Math.PI * 72;
  const offset = dash * (1 - fraction);

  return (
    <SectionShell id="timer" labelledBy="timer-h" glow>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[420px] w-[420px] translate-y-12 rounded-full bg-radial-orange blur-2xl"
            />
            <div className="relative mx-auto w-full max-w-[440px] rounded-3xl border border-line-strong bg-bg-card/80 p-6 backdrop-blur shadow-phone">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-white">
                    <Timer className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-bold">Round Timer</div>
                    <div className="text-[10px] text-ink-muted">Try it — bell rings on round end</div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                    t.phase === "work"
                      ? "bg-brand-orange/15 text-brand-orange"
                      : t.phase === "rest"
                        ? "bg-accent-blue/15 text-accent-blue"
                        : t.phase === "done"
                          ? "bg-accent-green/15 text-accent-green"
                          : "bg-white/10 text-ink-muted"
                  }`}
                >
                  {t.phase === "idle" ? "Ready" : t.phase}
                </span>
              </div>

              {/* preset pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => t.setPreset(p)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ring-focus ${
                      t.preset.key === p.key
                        ? "bg-brand-orange text-black"
                        : "border border-line-strong bg-bg-elevated text-white/80 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* big circular display */}
              <div className="relative my-6 flex aspect-square w-full items-center justify-center">
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="100" cy="100" r="72" fill="none" stroke="#1F1F23" strokeWidth="6" />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="72"
                    fill="none"
                    stroke={t.phase === "rest" ? "#3B82F6" : "#FF6A1A"}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    initial={false}
                    animate={{ strokeDashoffset: offset }}
                    style={{ strokeDashoffset: offset }}
                    transition={{ duration: reduce ? 0 : 0.4, ease: "linear" }}
                  />
                </svg>
                <div className="text-center">
                  <div className="text-[10px] font-bold tracking-widest text-ink-muted">
                    Round {t.round} of {t.preset.rounds}
                  </div>
                  <div className="text-display text-6xl tabular-nums">
                    {formatTime(t.remaining)}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    {t.phase === "rest"
                      ? "Rest"
                      : t.phase === "done"
                        ? "Workout complete"
                        : `${t.preset.label} · ${formatTime(t.preset.work)} work / ${formatTime(t.preset.rest)} rest`}
                  </div>
                </div>
              </div>

              {/* controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={t.reset}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg-elevated text-white/80 ring-focus hover:text-white"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={t.running ? t.pause : t.play}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-black shadow-glow ring-focus transition active:translate-y-px"
                  aria-label={t.running ? "Pause timer" : "Start timer"}
                >
                  {t.running ? (
                    <Pause className="h-7 w-7 fill-current" />
                  ) : (
                    <Play className="h-7 w-7 fill-current" />
                  )}
                </button>
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-2 text-xs font-bold text-brand-orange ring-focus hover:bg-brand-orange/15"
                >
                  Save in app <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-4 text-center text-[11px] text-ink-dim">
                Tip: turn your volume up — the round bell is real.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
                02
              </span>
              <p className="text-eyebrow text-brand-orange">Round timer · live</p>
            </div>
            <h2 id="timer-h" className="text-display text-h2 mt-4">
              Train every <span className="text-brand-orange">round.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              That's a real timer running on the page. Pick your discipline,
              hit play, and the bell rings — same as in the app. Save your
              custom timers when you get early access.
            </p>
            <ul className="mt-8 space-y-5">
              {BULLETS.map((b) => (
                <li key={b.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-bg-card text-brand-orange">
                    <b.Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-white">{b.title}</div>
                    <p className="text-sm text-ink-muted">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
