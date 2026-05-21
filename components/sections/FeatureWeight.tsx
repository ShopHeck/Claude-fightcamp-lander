import { ClipboardList, TrendingDown, Crosshair, AlarmClock } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { PhoneFrame } from "../ui/PhoneFrame";
import { WeightScreen } from "../mockups/WeightScreen";
import { Reveal } from "../ui/Reveal";

const BULLETS = [
  { Icon: ClipboardList, title: "Daily logs in seconds", desc: "Tap once. We chart the trend so the scale doesn't run your day." },
  { Icon: TrendingDown, title: "Camp-long trends", desc: "See the whole arc — base, build, peak — not just yesterday's swing." },
  { Icon: Crosshair, title: "Hit your target", desc: "Visual pacing toward weigh-in so you cut on schedule, not the night before." },
  { Icon: AlarmClock, title: "Weigh-in countdown", desc: "Always-visible days-out reminder built into every screen." },
];

export function FeatureWeight() {
  return (
    <SectionShell id="weight" labelledBy="weight-h">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
              03
            </span>
            <p className="text-eyebrow text-brand-orange">Weight cut</p>
          </div>
          <h2 id="weight-h" className="text-display text-h2 mt-4">
            Cut with <span className="text-brand-orange">confidence.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-muted">
            Track every pound from camp base to fight night. No more
            last-minute saunas, dehydration spirals, or weigh-in surprises.
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
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[420px] w-[420px] translate-y-12 rounded-full bg-radial-orange blur-2xl"
            />
            <PhoneFrame activeTab="weight">
              <WeightScreen />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
