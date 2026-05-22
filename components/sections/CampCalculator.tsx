"use client";
import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, Loader2, Check, Calendar, Scale, Zap } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";
import { buildCamp, type CampPlan, type Discipline } from "@/lib/campMath";

const DISCIPLINES: { key: Discipline; label: string }[] = [
  { key: "boxing", label: "Boxing" },
  { key: "mma", label: "MMA" },
  { key: "muay_thai", label: "Muay Thai" },
  { key: "kickboxing", label: "Kickboxing" },
  { key: "bjj", label: "BJJ" },
  { key: "wrestling", label: "Wrestling" },
];

const WEIGHT_CLASSES = [
  "Flyweight",
  "Bantamweight",
  "Featherweight",
  "Lightweight",
  "Welterweight",
  "Middleweight",
  "Light Heavy",
  "Heavyweight",
  "Open",
];

const PACE_COPY: Record<CampPlan["cutPace"], { label: string; tone: string }> = {
  safe: { label: "Sustainable", tone: "text-accent-green" },
  aggressive: { label: "Aggressive", tone: "text-accent-yellow" },
  extreme: { label: "Risky", tone: "text-accent-red" },
  build: { label: "Build", tone: "text-accent-blue" },
};

type Step = "form" | "preview" | "submitting" | "done";

export function CampCalculator() {
  const [discipline, setDiscipline] = useState<Discipline>("mma");
  const [weightClass, setWeightClass] = useState<string>("Welterweight");
  const [current, setCurrent] = useState<string>("178");
  const [target, setTarget] = useState<string>("165");
  const [fightDate, setFightDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 56);
    return d.toISOString().slice(0, 10);
  });
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);

  const plan = useMemo<CampPlan | null>(() => {
    const cw = Number(current);
    const tw = Number(target);
    const fd = new Date(fightDate + "T12:00:00");
    if (!Number.isFinite(cw) || !Number.isFinite(tw) || isNaN(fd.getTime())) return null;
    return buildCamp({
      discipline,
      currentWeight: cw,
      targetWeight: tw,
      fightDate: fd,
    });
  }, [discipline, current, target, fightDate]);

  function showPreview(e: FormEvent) {
    e.preventDefault();
    setStep("preview");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setStep("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          discipline,
          weight_class: weightClass,
          current_weight: Number(current),
          target_weight: Number(target),
          fight_date: fightDate,
          source: "camp_calculator",
        }),
      });
      const data: { ok: boolean; error?: string; position?: number } = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong.");
        setStep("preview");
        return;
      }
      setPosition(data.position);
      setStep("done");
    } catch {
      setError("Network error. Try again.");
      setStep("preview");
    }
  }

  return (
    <SectionShell labelledBy="calc-h" glow>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
            BETA
          </span>
          <p className="text-eyebrow text-brand-orange">Camp planner</p>
        </div>
        <h2 id="calc-h" className="text-display text-h2 mt-4 max-w-3xl">
          Build your camp <span className="text-brand-orange">in 30&nbsp;seconds.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-ink-muted">
          Tell us your fight, your weight, and the date. We'll map your phases,
          your sessions, and your cut. Save it to your account when the app
          opens.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* INPUTS */}
        <Reveal>
          <form
            onSubmit={showPreview}
            className="rounded-3xl border border-line-subtle bg-bg-card/70 p-6 backdrop-blur"
            aria-label="Build your camp inputs"
          >
            <Field label="Discipline">
              <div className="flex flex-wrap gap-1.5">
                {DISCIPLINES.map((d) => (
                  <button
                    type="button"
                    key={d.key}
                    onClick={() => setDiscipline(d.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ring-focus ${
                      d.key === discipline
                        ? "bg-brand-orange text-black"
                        : "border border-line-strong bg-bg-elevated text-white/80 hover:text-white"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Weight class">
              <select
                value={weightClass}
                onChange={(e) => setWeightClass(e.target.value)}
                className="w-full appearance-none rounded-xl border border-line-strong bg-bg-elevated px-3 py-2.5 text-sm text-white ring-focus"
              >
                {WEIGHT_CLASSES.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Current weight (lbs)">
                <input
                  type="number"
                  inputMode="decimal"
                  min={70}
                  max={400}
                  step={0.1}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full rounded-xl border border-line-strong bg-bg-elevated px-3 py-2.5 text-sm text-white ring-focus tabular-nums"
                />
              </Field>
              <Field label="Target weight (lbs)">
                <input
                  type="number"
                  inputMode="decimal"
                  min={70}
                  max={400}
                  step={0.1}
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-xl border border-line-strong bg-bg-elevated px-3 py-2.5 text-sm text-white ring-focus tabular-nums"
                />
              </Field>
            </div>

            <Field label="Fight date">
              <div className="relative">
                <input
                  type="date"
                  value={fightDate}
                  onChange={(e) => setFightDate(e.target.value)}
                  className="w-full rounded-xl border border-line-strong bg-bg-elevated px-3 py-2.5 text-sm text-white ring-focus"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              </div>
            </Field>

            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-bold text-black transition hover:bg-brand-orangeSoft active:translate-y-px ring-focus"
            >
              Build my camp <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>

        {/* PREVIEW */}
        <Reveal delay={0.1}>
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong bg-bg-card/40 p-10 text-center"
                >
                  <Zap className="h-8 w-8 text-brand-orange" />
                  <div className="mt-4 text-lg font-bold text-white">
                    Your camp plan will land here
                  </div>
                  <p className="mt-2 max-w-xs text-sm text-ink-muted">
                    Phases, sessions, sparring blocks, and a week-by-week cut
                    curve.
                  </p>
                </motion.div>
              )}
              {step !== "form" && plan && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-brand-orange/30 bg-bg-card/70 p-6 backdrop-blur shadow-glow"
                >
                  {/* top stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <StatTile big={`${plan.weeks}`} label="weeks of camp" />
                    <StatTile big={`${plan.sessions}`} label="total sessions" />
                    <StatTile
                      big={`${plan.cutLbs}`}
                      sub="lbs"
                      label={PACE_COPY[plan.cutPace].label}
                      tone={PACE_COPY[plan.cutPace].tone}
                    />
                  </div>

                  {/* phase strip */}
                  <div className="mt-5">
                    <div className="text-[10px] font-bold tracking-widest text-ink-muted">
                      PHASE BREAKDOWN
                    </div>
                    <div className="mt-2 flex overflow-hidden rounded-full">
                      {plan.phases.map((p, i) => {
                        const w = (p.weeks / plan.weeks) * 100;
                        const colors = ["#3B82F6", "#FACC15", "#FF6A1A", "#A855F7"];
                        return (
                          <div
                            key={p.name}
                            style={{ width: `${w}%`, background: colors[i] }}
                            className="flex h-7 items-center justify-center text-[10px] font-bold uppercase tracking-widest text-black"
                          >
                            {p.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* mini chart */}
                  <div className="mt-5 rounded-xl border border-line-subtle bg-bg-base/60 p-4">
                    <div className="text-[10px] font-bold tracking-widest text-ink-muted">
                      PROJECTED WEIGHT CUT
                    </div>
                    <MiniWeightChart plan={plan} />
                  </div>

                  {/* gated reveal */}
                  <div className="mt-6">
                    {step !== "done" ? (
                      <form onSubmit={submit} className="relative">
                        <div className="flex items-center gap-2 rounded-full border border-line-strong bg-bg-elevated/80 px-2 py-2 pl-5 backdrop-blur">
                          <Lock className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={step === "submitting"}
                            aria-label="Email to save your camp plan"
                            className="min-w-0 flex-1 bg-transparent text-white placeholder:text-ink-dim outline-none"
                          />
                          <button
                            type="submit"
                            disabled={step === "submitting"}
                            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-black transition hover:bg-brand-orangeSoft active:translate-y-px ring-focus"
                          >
                            {step === "submitting" ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving
                              </>
                            ) : (
                              <>
                                Save my camp <ArrowRight className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                        {error ? (
                          <p className="mt-2 text-xs text-accent-red" role="status">
                            {error}
                          </p>
                        ) : (
                          <p className="mt-2 text-xs text-ink-muted">
                            Email saves your plan and gets you first access.
                          </p>
                        )}
                      </form>
                    ) : (
                      <div className="flex items-start gap-3 rounded-2xl border border-accent-green/40 bg-accent-green/10 p-4">
                        <Check className="h-5 w-5 shrink-0 text-accent-green" />
                        <div>
                          <div className="font-bold text-white">
                            Saved. {position ? `You're #${position.toLocaleString()} in line.` : "You're on the list."}
                          </div>
                          <p className="mt-1 text-sm text-ink-muted">
                            We'll email your full plan and your early-access
                            invite the moment the app opens.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function StatTile({
  big,
  sub,
  label,
  tone,
}: {
  big: string;
  sub?: string;
  label: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-base/50 px-3 py-3 text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-display text-3xl tabular-nums ${tone ?? "text-white"}`}>
          {big}
        </span>
        {sub ? (
          <span className="text-xs font-semibold text-ink-muted">{sub}</span>
        ) : null}
      </div>
      <div className={`mt-0.5 text-[10px] font-bold uppercase tracking-widest ${tone ?? "text-ink-muted"}`}>
        {label}
      </div>
    </div>
  );
}

function MiniWeightChart({ plan }: { plan: CampPlan }) {
  const w = 280;
  const h = 80;
  const pad = 8;
  const pts = plan.weeklyWeights;
  const minW = Math.min(...pts.map((p) => p.weight));
  const maxW = Math.max(...pts.map((p) => p.weight));
  const range = Math.max(0.1, maxW - minW);
  const path = pts
    .map((p, i) => {
      const x = pad + ((w - 2 * pad) * i) / Math.max(1, pts.length - 1);
      const y = pad + ((h - 2 * pad) * (maxW - p.weight)) / range;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h + 16}`} className="mt-2 h-20 w-full">
      <line x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} stroke="rgba(255,255,255,0.08)" />
      <path d={path} fill="none" stroke="#FF6A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => {
        const x = pad + ((w - 2 * pad) * i) / Math.max(1, pts.length - 1);
        const y = pad + ((h - 2 * pad) * (maxW - p.weight)) / range;
        return <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 3.5 : 1.6} fill={i === pts.length - 1 ? "#fff" : "#FF6A1A"} />;
      })}
      <text x={pad} y={h + 12} fill="#6B6B73" fontSize="9">
        Week 0 · {pts[0].weight.toFixed(1)} lbs
      </text>
      <text x={w - pad} y={h + 12} fill="#FF6A1A" fontSize="9" textAnchor="end">
        Week {pts.length - 1} · {pts[pts.length - 1].weight.toFixed(1)} lbs
      </text>
    </svg>
  );
}
