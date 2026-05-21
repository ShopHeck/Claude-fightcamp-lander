import { Scale, TrendingDown, Plus, Trash2 } from "lucide-react";
import { FlameLogo } from "../ui/FlameLogo";

export function WeightScreen() {
  return (
    <div className="flex h-full flex-col gap-3 text-white">
      {/* header */}
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange">
          <FlameLogo className="h-4 w-4 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[12px] font-bold">Weight Tracker</div>
          <div className="text-[9px] text-ink-muted">Cut Monitoring</div>
        </div>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-3 gap-1.5">
        <StatCard color="text-accent-blue" Icon={Scale} value="175" label="current (lbs)" />
        <StatCard color="text-brand-orange" Icon={TrendingDown} value="10.0" label="lbs to cut" />
        <StatCard color="text-accent-yellow" symbol="●" value="23%" label="cut done" />
      </div>

      {/* progress */}
      <div className="rounded-2xl border border-line-subtle bg-bg-card p-2.5">
        <div className="flex items-start justify-between">
          <div className="leading-tight">
            <div className="text-[9px] text-ink-muted">Weight Cut Progress</div>
            <div className="text-[11px] font-bold">178 → 165 lbs</div>
          </div>
          <div className="text-right leading-tight">
            <span className="rounded-full bg-accent-green/15 px-2 py-[2px] text-[9px] font-bold text-accent-green">
              ↓ 3.0 lbs
            </span>
            <div className="mt-0.5 text-[8px] text-ink-muted">11 days out</div>
          </div>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
          <div className="h-full w-1/4 rounded-full bg-accent-blue" />
        </div>
        <div className="mt-1 flex justify-between text-[8px] text-ink-muted">
          <span>Start: 178 lbs</span>
          <span>Target: 165 lbs</span>
        </div>
      </div>

      {/* chart */}
      <div className="rounded-2xl border border-line-subtle bg-bg-card p-2.5">
        <div className="mb-1.5 text-[8px] font-bold tracking-widest text-ink-muted">
          WEIGHT OVER CAMP
        </div>
        <WeightChart />
      </div>

      {/* log button */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-2.5 text-[11px] font-bold text-black">
        <Plus className="h-3.5 w-3.5" /> Log Weight
      </button>

      {/* weight log */}
      <div>
        <div className="mb-1.5 text-[8px] font-bold tracking-widest text-ink-muted">
          WEIGHT LOG
        </div>
        <div className="flex items-center justify-between rounded-xl border border-line-subtle bg-bg-card px-3 py-2">
          <div className="leading-tight">
            <div className="text-[12px] font-bold">175 lbs</div>
            <div className="text-[8px] text-ink-muted">Saturday, Apr 11</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent-green/15 px-2 py-[2px] text-[9px] font-bold text-accent-green">
              -3.0 lbs
            </span>
            <Trash2 className="h-3 w-3 text-ink-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  Icon,
  symbol,
  value,
  label,
  color,
}: {
  Icon?: typeof Scale;
  symbol?: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-card px-2 py-2 text-center">
      <div className={`mb-0.5 flex items-center justify-center ${color}`}>
        {Icon ? (
          <Icon className="h-3 w-3" />
        ) : (
          <span className="text-[10px]">{symbol}</span>
        )}
      </div>
      <div className={`text-[14px] font-black leading-none ${color}`}>{value}</div>
      <div className="mt-0.5 text-[7.5px] text-ink-muted">{label}</div>
    </div>
  );
}

function WeightChart() {
  // simple SVG line chart matching the reference
  const w = 260;
  const h = 80;
  const pts = [
    [10, 50],
    [70, 18],
    [140, 38],
    [200, 56],
    [250, 60],
  ];
  const path = pts
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} className="h-20 w-full">
      {/* gridlines */}
      {[18, 38, 56, 75].map((y, i) => (
        <line
          key={i}
          x1="20"
          x2={w - 4}
          y1={y}
          y2={y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {/* y labels */}
      {["188", "184", "177", "170", "163"].map((l, i) => (
        <text
          key={l}
          x="2"
          y={18 + i * 14}
          fill="#6B6B73"
          fontSize="6"
          fontFamily="Inter, system-ui"
        >
          {l}
        </text>
      ))}
      {/* target dashed */}
      <line
        x1="20"
        x2={w - 4}
        y1="74"
        y2="74"
        stroke="#FF6A1A"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text x={w / 2 - 12} y="84" fill="#FF6A1A" fontSize="6" fontWeight="700">
        Target
      </text>
      {/* line */}
      <path d={path} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === 3 ? 4 : 2.5} fill={i === 3 ? "#fff" : "#3B82F6"} stroke="#3B82F6" strokeWidth={i === 3 ? 2 : 0} />
      ))}
      {/* tooltip */}
      <g transform="translate(186,30)">
        <rect width="36" height="18" rx="3" fill="#0a0a0b" stroke="#2A2A30" />
        <text x="4" y="7" fill="#A1A1AA" fontSize="5.5">Apr 6</text>
        <text x="4" y="14" fill="#fff" fontSize="6.5" fontWeight="700">178 lbs</text>
      </g>
      {/* x labels */}
      {["Mar 12", "Mar 16", "Apr 6", "Apr 11"].map((d, i) => (
        <text
          key={d}
          x={10 + i * 70}
          y={h + 8}
          fill="#6B6B73"
          fontSize="6"
        >
          {d}
        </text>
      ))}
    </svg>
  );
}
