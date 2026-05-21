import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";

const STATS = [
  { value: 12, suffix: "+", label: "Combat disciplines" },
  { value: 1.2, suffix: "M", decimals: 1, label: "Rounds timed" },
  { value: 850, suffix: "+", label: "Workouts & drills" },
  { value: 4.9, decimals: 1, label: "Early-access rating" },
];

export function Stats() {
  return (
    <section className="relative border-y border-line-subtle bg-bg-elevated/40">
      <div className="container-page py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-0">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div
                className={`flex flex-col items-center text-center sm:items-start sm:text-left sm:px-6 ${
                  i > 0 ? "sm:border-l sm:border-line-subtle" : ""
                }`}
              >
                <div className="text-display text-4xl tracking-tight text-white sm:text-5xl">
                  <CountUp
                    to={s.value}
                    suffix={s.suffix ?? ""}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="mt-2 text-sm text-ink-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
