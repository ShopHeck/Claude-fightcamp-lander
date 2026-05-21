import { BookOpen, Sparkles, ChevronDown } from "lucide-react";
import { FlameLogo } from "../ui/FlameLogo";

const PHASES = ["All Plans", "Cut", "Maintain", "Build"];

const PLANS = [
  {
    tag: "Cut",
    sub: "Fight Week",
    title: "Fight Week Cut",
    desc: "Aggressive cut for the final 7 days before weigh-in. Low carb, high protein, water management.",
    macros: ["Cal 1600", "P 190g", "C 80g", "F 50g"],
  },
  {
    tag: "Cut",
    sub: "Camp Base",
    title: "Slow Cut — Camp Base",
    desc: "Moderate deficit for steady weight loss without compromising training quality.",
    macros: ["Cal 2100", "P 200g", "C 180g", "F 60g"],
  },
  {
    tag: "Cut",
    sub: "Peak",
    title: "Peak Phase Cut",
    desc: "Carb cycling during peak week — high carbs on sparring days, lower on rest days.",
    macros: ["Cal 1950", "P 190g", "C 170g", "F 55g"],
  },
];

const MACRO_COLORS: Record<string, string> = {
  Cal: "bg-accent-red/15 text-accent-red border-accent-red/30",
  P: "bg-accent-green/15 text-accent-green border-accent-green/30",
  C: "bg-accent-blue/15 text-accent-blue border-accent-blue/30",
  F: "bg-accent-purple/15 text-accent-purple border-accent-purple/30",
};

export function MealScreen() {
  return (
    <div className="flex h-full flex-col gap-2 text-white">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange">
          <FlameLogo className="h-4 w-4 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[12px] font-bold">Meal Library</div>
          <div className="text-[9px] text-ink-muted">Plans &amp; Generator</div>
        </div>
      </div>

      <div className="flex gap-1.5 rounded-xl border border-line-subtle bg-bg-card p-1">
        <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-bg-elevated py-1.5 text-[9px] font-semibold">
          <BookOpen className="h-3 w-3" /> Meal Plans
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-[9px] font-semibold text-ink-muted">
          <Sparkles className="h-3 w-3" /> Macro Generator
        </button>
      </div>

      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
        {PHASES.map((p, i) => (
          <span
            key={p}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
              i === 0
                ? "bg-brand-orange text-black"
                : "border border-line-strong bg-bg-card text-white/80"
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="text-[8px] text-ink-muted">12 plans</div>

      <div className="flex-1 space-y-1.5 overflow-hidden">
        {PLANS.map((p) => (
          <div
            key={p.title}
            className="rounded-xl border border-line-subtle bg-bg-card px-2.5 py-2"
          >
            <div className="mb-1 flex items-center gap-1">
              <span className="rounded-md border border-accent-red/40 bg-accent-red/10 px-1.5 py-[1px] text-[7.5px] font-bold text-accent-red">
                {p.tag}
              </span>
              <span className="text-[8px] text-ink-muted">{p.sub}</span>
              <ChevronDown className="ml-auto h-3 w-3 text-ink-muted" />
            </div>
            <div className="text-[11px] font-bold leading-tight">{p.title}</div>
            <div className="mt-0.5 text-[8.5px] leading-tight text-ink-muted">
              {p.desc}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {p.macros.map((m) => {
                const key = m.split(" ")[0] as keyof typeof MACRO_COLORS;
                return (
                  <span
                    key={m}
                    className={`rounded-full border px-1.5 py-[1px] text-[7.5px] font-bold ${MACRO_COLORS[key]}`}
                  >
                    {m}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
