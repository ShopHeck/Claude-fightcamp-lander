import { CalendarClock, Layers, Activity, Gauge } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { PhoneFrame } from "../ui/PhoneFrame";
import { HomeScreen } from "../mockups/HomeScreen";
import { Reveal } from "../ui/Reveal";

const BULLETS = [
  { Icon: CalendarClock, title: "Fight night countdown", desc: "Days, weeks, and phase progress on the home screen." },
  { Icon: Layers, title: "Periodized phases", desc: "Base, build, peak, taper — preset or fully custom." },
  { Icon: Activity, title: "Recent activity feed", desc: "Every session logged with duration and RPE." },
  { Icon: Gauge, title: "Readiness at a glance", desc: "Pulled in from your training, weight, and wearables." },
];

export function FeatureCamp() {
  return (
    <SectionShell id="camp" labelledBy="camp-h">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-brand-orange/40 px-2 py-0.5 text-xs font-bold text-brand-orange">
              01
            </span>
            <p className="text-eyebrow text-brand-orange !text-brand-orange">Camp dashboard</p>
          </div>
          <h2 id="camp-h" className="text-display text-h2 mt-4">
            Peak at the{" "}
            <span className="text-brand-orange">right&nbsp;time.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-muted">
            One screen tells you exactly where you are in camp, what's next,
            and how close you are to fight-ready. No more guessing if you're
            on track.
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
            <PhoneFrame activeTab="home">
              <HomeScreen />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
