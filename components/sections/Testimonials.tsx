import { Quote } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";

// TODO: swap placeholder quotes with real fighter testimonials before launch.
const QUOTES = [
  {
    quote:
      "First camp I haven't gambled on my cut. The chart kept me honest from week one.",
    name: "Andre M.",
    role: "Welterweight · 7–1",
  },
  {
    quote:
      "I used to scribble round timers and meal macros in three different apps. Now it's one screen, one plan.",
    name: "Lina K.",
    role: "Muay Thai · Featherweight",
  },
  {
    quote:
      "Coach loves it. He can see my whole camp the night before sparring and adjust on the fly.",
    name: "Marcus R.",
    role: "MMA · Middleweight",
  },
];

export function Testimonials() {
  return (
    <SectionShell labelledBy="testi-h">
      <Reveal>
        <p className="text-eyebrow text-center text-brand-orange">From the corner</p>
        <h2
          id="testi-h"
          className="text-display text-h2 mt-3 text-center"
        >
          Fighters in the <span className="text-brand-orange">trenches.</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-line-subtle bg-bg-card p-6">
              <Quote className="h-6 w-6 text-brand-orange" />
              <blockquote className="mt-4 flex-1 text-base text-white">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line-subtle pt-4">
                <div className="font-semibold text-white">{q.name}</div>
                <div className="text-sm text-ink-muted">{q.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
