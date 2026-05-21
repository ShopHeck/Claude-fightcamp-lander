import { Brain, HeartPulse, Bot, Bluetooth } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { WatchFrame } from "../ui/WatchFrame";
import { ReadinessWatch } from "../mockups/ReadinessWatch";
import { Reveal } from "../ui/Reveal";

const BULLETS = [
  { Icon: Brain, title: "Fight readiness score", desc: "One number that blends training load, weight, sleep, and recovery." },
  { Icon: HeartPulse, title: "HR, HRV & recovery", desc: "Stream from Apple Watch, Garmin, or Whoop — no extra tap needed." },
  { Icon: Bot, title: "AI coach analysis", desc: "Weekly summaries flag overreach, undertraining, and missed sessions." },
  { Icon: Bluetooth, title: "Wearable integrations", desc: "All your devices, one dashboard. Data stays on your phone." },
];

export function FeatureIntelligence() {
  return (
    <SectionShell labelledBy="ai-h">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[360px] w-[360px] rounded-full bg-radial-orange blur-2xl"
            />
            <WatchFrame>
              <ReadinessWatch />
            </WatchFrame>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
              05
            </span>
            <p className="text-eyebrow text-brand-orange">Insights &amp; wearables</p>
          </div>
          <h2 id="ai-h" className="text-display text-h2 mt-4">
            Your camp, <span className="text-brand-orange">quantified.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-muted">
            We pull in your watch data, your workouts, and your weight, then
            tell you the one thing that matters: are you on track?
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
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
        </Reveal>
      </div>
    </SectionShell>
  );
}
