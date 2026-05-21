import { Target, Zap, Shield, Trophy } from "lucide-react";
import { SectionShell } from "../ui/SectionShell";
import { Reveal } from "../ui/Reveal";

const PILLARS = [
  {
    Icon: Target,
    title: "Peak at the right time",
    desc: "Periodize every block so your sharpness lands on fight night, not Tuesday.",
  },
  {
    Icon: Zap,
    title: "Train with purpose",
    desc: "Every round, set, and meal is mapped to the phase you're in.",
  },
  {
    Icon: Shield,
    title: "Prepare confidently",
    desc: "Weight, weigh-in, game plan — nothing slips through the cracks.",
  },
  {
    Icon: Trophy,
    title: "Perform fearlessly",
    desc: "Step in knowing your body, your plan, and your number.",
  },
];

export function Pillars() {
  return (
    <section className="relative border-y border-line-subtle bg-bg-elevated/40 py-16">
      <div className="container-page">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-line-subtle bg-bg-card p-5 transition hover:border-brand-orange/40 hover:bg-bg-card/80">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-orange/30 bg-brand-orange/10 text-brand-orange">
                  <p.Icon className="h-5 w-5" />
                </div>
                <div className="text-eyebrow text-white">{p.title}</div>
                <p className="mt-2 text-sm text-ink-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
