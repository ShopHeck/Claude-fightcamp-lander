import { Plus } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";

const FAQS = [
  {
    q: "When does the app launch?",
    a: "We're rolling out invites in waves throughout 2026. Join the waitlist and we'll email you the moment your spot opens.",
  },
  {
    q: "What platforms do you support?",
    a: "iOS first, with Android shortly after. Apple Watch and Android Wear companion apps are in active development.",
  },
  {
    q: "How much does it cost?",
    a: "Free to start. A Pro tier with advanced AI insights, gym display mode, and unlimited custom plans is in the works — early-access members get extended trials.",
  },
  {
    q: "Which combat sports are supported?",
    a: "Boxing, MMA, Muay Thai, kickboxing, BJJ, wrestling, karate, and taekwondo. Custom presets work for any round-based discipline.",
  },
  {
    q: "Will my data sync from my smartwatch?",
    a: "Yes — Apple Health, Garmin, and Whoop integrations import heart rate, HRV, sleep, and workouts automatically.",
  },
  {
    q: "Can I export my camp history?",
    a: "Always. Every log, weight entry, and session is exportable to CSV. Your data is yours.",
  },
];

export function Faq() {
  return (
    <SectionShell id="faq" labelledBy="faq-h">
      <Reveal>
        <p className="text-eyebrow text-brand-orange">FAQ</p>
        <h2 id="faq-h" className="text-display text-h2 mt-3">
          Questions, <span className="text-brand-orange">answered.</span>
        </h2>
      </Reveal>
      <div className="mt-12 mx-auto max-w-3xl divide-y divide-line-subtle border-y border-line-subtle">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left ring-focus">
                <span className="text-base font-semibold text-white sm:text-lg">
                  {f.q}
                </span>
                <Plus className="h-5 w-5 shrink-0 text-brand-orange transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-ink-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
