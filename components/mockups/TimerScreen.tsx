import { Play, RotateCcw, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { FlameLogo } from "../ui/FlameLogo";

const DISCIPLINES = ["Boxing", "MMA", "Muay Thai", "HIIT", "Custom"];

export function TimerScreen() {
  return (
    <div className="flex h-full flex-col gap-3 text-white">
      {/* header */}
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange">
          <FlameLogo className="h-4 w-4 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[12px] font-bold">Round Timer</div>
          <div className="text-[9px] text-ink-muted">Training Intervals</div>
        </div>
      </div>

      {/* discipline pills */}
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
        {DISCIPLINES.map((d, i) => (
          <span
            key={d}
            className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold ${
              i === 0
                ? "bg-brand-orange text-black"
                : "border border-line-strong bg-bg-card text-white/80"
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      {/* ready */}
      <div className="flex items-center justify-center gap-2">
        <span className="rounded-full bg-bg-card px-2 py-[2px] text-[9px] font-semibold text-white/80">
          Ready
        </span>
        <span className="text-[10px] text-ink-muted">Round 1 of 12</span>
      </div>

      {/* big circle */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[3px] border-white/10">
          <div className="absolute inset-2 rounded-full border border-white/5" />
          <div className="text-display text-[44px] tracking-tight">3:00</div>
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-bg-card text-white/80">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-black shadow-glow">
          <Play className="h-6 w-6 fill-current" />
        </button>
        <button className="flex items-center gap-1 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-2.5 py-1.5 text-[10px] font-bold text-brand-orange">
          <Lock className="h-3 w-3" /> PRO
        </button>
      </div>

      {/* settings */}
      <div className="space-y-1.5">
        <div className="text-[8px] font-bold tracking-widest text-ink-muted">
          TIMER SETTINGS
        </div>
        <Row label="Rounds" value="12" />
        <Row label="Work Time" sub="3:00 per round" value="3:00" orange />
      </div>
    </div>
  );
}

function Row({
  label,
  sub,
  value,
  orange,
}: {
  label: string;
  sub?: string;
  value: string;
  orange?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line-subtle bg-bg-card px-3 py-2">
      <div className="leading-tight">
        <div className="text-[11px] font-semibold">{label}</div>
        {sub ? <div className="text-[8px] text-ink-muted">{sub}</div> : null}
      </div>
      <div className="flex items-center gap-1.5">
        <ChevronDown className="h-3 w-3 text-ink-muted" />
        <span
          className={`text-[12px] font-bold ${orange ? "text-brand-orange" : "text-white"}`}
        >
          {value}
        </span>
        <ChevronUp className="h-3 w-3 text-ink-muted" />
      </div>
    </div>
  );
}
