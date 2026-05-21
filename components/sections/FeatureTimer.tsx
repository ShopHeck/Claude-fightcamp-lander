import { Timer, Sliders, Monitor, Volume2 } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { PhoneFrame } from "../ui/PhoneFrame";
import { TimerScreen } from "../mockups/TimerScreen";
import { Reveal } from "../ui/Reveal";

const BULLETS = [
  { Icon: Timer, title: "Discipline presets", desc: "Boxing 3×3, MMA 5×5, Muay Thai 5×3, HIIT — one tap to load." },
  { Icon: Sliders, title: "Fully custom intervals", desc: "Rounds, work, rest, prep, warning — set it once, save it forever." },
  { Icon: Monitor, title: "Gym display mode", desc: "Cast a giant timer to your TV or tablet so everyone can train." },
  { Icon: Volume2, title: "Audible round cues", desc: "Bells, beeps, and 10-second warnings so you can keep your eyes up." },
];

export function FeatureTimer() {
  return (
    <SectionShell id="timer" labelledBy="timer-h" glow>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[420px] w-[420px] translate-y-12 rounded-full bg-radial-orange blur-2xl"
            />
            <PhoneFrame activeTab="timer">
              <TimerScreen />
            </PhoneFrame>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="order-1 lg:order-2">
            <p className="text-eyebrow text-brand-orange">Round timer</p>
            <h2 id="timer-h" className="text-display text-h2 mt-3">
              Train every <span className="text-brand-orange">round.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-ink-muted">
              The interval timer built by fighters for fighters. Customizable
              for any discipline, sharp enough for the corner, loud enough for
              the gym.
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
