import { Dumbbell, Utensils, Sparkles, Library } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { PhoneFrame } from "../ui/PhoneFrame";
import { WorkoutScreen } from "../mockups/WorkoutScreen";
import { MealScreen } from "../mockups/MealScreen";
import { Reveal } from "../ui/Reveal";

const BULLETS = [
  { Icon: Library, title: "Drills, strength & conditioning", desc: "Hundreds of fight-sport-specific exercises with sets, reps, and rest." },
  { Icon: Utensils, title: "Macro-based meal plans", desc: "Cut, maintain, and build plans tuned to combat-sport demands." },
  { Icon: Sparkles, title: "AI macro generator", desc: "Punch in your weight, weigh-in date, and phase — get a plan in seconds." },
  { Icon: Dumbbell, title: "Built for fight prep", desc: "Skill, sparring, and conditioning days flow into your camp calendar." },
];

export function FeatureLibraries() {
  return (
    <SectionShell id="nutrition" labelledBy="lib-h" glow>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-eyebrow text-brand-orange">Workouts &amp; nutrition</p>
          <h2 id="lib-h" className="text-display text-h2 mt-3">
            Train smarter, <span className="text-brand-orange">fuel better.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-muted">
            A complete library of fight-sport workouts paired with macro plans
            so you can train hard and recover harder.
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
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[480px] w-[480px] translate-y-8 rounded-full bg-radial-orange blur-2xl"
            />
            <div className="relative flex justify-center gap-2 sm:gap-4">
              <div className="-translate-y-6 sm:-translate-y-10">
                <PhoneFrame activeTab="log">
                  <WorkoutScreen />
                </PhoneFrame>
              </div>
              <div className="translate-y-6 sm:translate-y-10">
                <PhoneFrame activeTab="home">
                  <MealScreen />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
