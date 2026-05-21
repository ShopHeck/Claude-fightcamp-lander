import { CalendarPlus, Flame, Trophy } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";

const STEPS = [
  {
    n: "01",
    Icon: CalendarPlus,
    title: "Set your fight date",
    desc: "Tell us your weigh-in, weight class, and rounds. We build your camp calendar in seconds — base, build, peak, taper.",
  },
  {
    n: "02",
    Icon: Flame,
    title: "Train every day",
    desc: "Time your rounds, log your sessions, hit your macros. Every screen knows where you are in camp.",
  },
  {
    n: "03",
    Icon: Trophy,
    title: "Arrive fight-ready",
    desc: "Hit weigh-in on the number. Step in fresh, focused, and dialed. Your camp data sets the next one up to be sharper.",
  },
];

export function HowItWorks() {
  return (
    <SectionShell labelledBy="how-h">
      <Reveal>
        <p className="text-eyebrow text-brand-orange">How it works</p>
        <h2 id="how-h" className="text-display text-h2 mt-3 max-w-2xl">
          Six weeks out to <span className="text-brand-orange">fight night.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-ink-muted">
          One app to run your entire camp — from the moment you sign the
          bout agreement to the moment you step on the scale.
        </p>
      </Reveal>
      <div className="relative mt-14 grid gap-6 md:grid-cols-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent md:block"
        />
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="relative rounded-2xl border border-line-subtle bg-bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/40 bg-bg-card text-sm font-bold text-brand-orange">
                  {s.n}
                </span>
                <s.Icon className="h-6 w-6 text-ink-muted" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
