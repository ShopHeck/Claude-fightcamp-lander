import { Search, ChevronDown } from "lucide-react";
import { FlameLogo } from "../ui/FlameLogo";

const FILTERS = ["All", "Conditioning", "Strength", "Skill", "Sparring"];

const EXERCISES = [
  { tag: "Conditioning", level: "Beginner", levelColor: "text-accent-green border-accent-green/40", title: "Jump Rope Intervals", sub: "10 × 3 min on / 30 s off" },
  { tag: "Conditioning", level: "Intermediate", levelColor: "text-accent-yellow border-accent-yellow/40", title: "Burpee Ladder", sub: "1–2–3–4–5–4–3–2–1 reps\n(rest 30 s between rungs)" },
  { tag: "Conditioning", level: "Intermediate", levelColor: "text-accent-yellow border-accent-yellow/40", title: "400 m Repeats", sub: "6–10 × 400 m, rest 90 s" },
  { tag: "Conditioning", level: "Intermediate", levelColor: "text-accent-yellow border-accent-yellow/40", title: "Battle Ropes Tabata", sub: "8 × (20 s on / 10 s off)" },
  { tag: "Conditioning", level: "Advanced", levelColor: "text-accent-red border-accent-red/40", title: "Hill Sprint Repeats", sub: "8–12 × 20–40 m hill,\nwalk back recovery" },
];

export function WorkoutScreen() {
  return (
    <div className="flex h-full flex-col gap-2 text-white">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange">
          <FlameLogo className="h-4 w-4 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[12px] font-bold">Workout Library</div>
          <div className="text-[9px] text-ink-muted">Exercises &amp; Drills</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-xl border border-line-subtle bg-bg-card px-2.5 py-1.5">
        <Search className="h-3 w-3 text-ink-muted" />
        <span className="text-[10px] text-ink-dim">Search exercises, muscles, sport…</span>
      </div>
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
              i === 0
                ? "bg-brand-orange text-black"
                : "border border-line-strong bg-bg-card text-white/80"
            }`}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="text-[8px] text-ink-muted">33 exercises</div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {EXERCISES.map((e) => (
          <div
            key={e.title}
            className="rounded-xl border border-line-subtle bg-bg-card px-2.5 py-2"
          >
            <div className="mb-1 flex items-center gap-1">
              <span className="rounded-md border border-brand-orange/40 px-1.5 py-[1px] text-[7.5px] font-bold text-brand-orange">
                {e.tag}
              </span>
              <span className={`rounded-md border px-1.5 py-[1px] text-[7.5px] font-bold ${e.levelColor}`}>
                {e.level}
              </span>
              <ChevronDown className="ml-auto h-3 w-3 text-ink-muted" />
            </div>
            <div className="text-[11px] font-bold leading-tight">{e.title}</div>
            <div className="whitespace-pre-line text-[8.5px] leading-tight text-ink-muted">
              {e.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
