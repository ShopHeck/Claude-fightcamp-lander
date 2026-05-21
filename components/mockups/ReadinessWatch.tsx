import { FlameLogo } from "../ui/FlameLogo";

export function ReadinessWatch() {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const score = 67;
  const dash = (score / 100) * circ;
  return (
    <div className="flex h-full flex-col justify-between px-2 py-1.5 text-white">
      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-orange">
          <FlameLogo className="h-3 w-3 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[8px] font-bold">Fight Readiness</div>
          <div className="text-[6.5px] text-ink-muted">Camp Analysis</div>
        </div>
        <span className="ml-auto text-[7px] font-semibold text-white">9:06</span>
      </div>

      <div className="relative mx-auto my-1 h-[88px] w-[88px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} stroke="#1F1F23" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#g)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${circ}`}
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#FF6A1A" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[20px] font-black leading-none">{score}</div>
          <div className="text-[6px] text-ink-muted">out of 100</div>
          <div className="mt-0.5 rounded-full bg-accent-yellow/15 px-1.5 py-[1px] text-[6px] font-bold text-accent-yellow">
            On Track
          </div>
        </div>
      </div>

      <div>
        <div className="text-[6.5px] font-bold tracking-widest text-ink-muted">
          FOCUS AREAS
        </div>
        <div className="mt-0.5 rounded-md bg-bg-card px-1.5 py-1">
          <div className="text-[8px] font-bold">Weight Cut</div>
          <div className="text-[6.5px] text-ink-muted">10.0 lbs to go</div>
        </div>
      </div>
    </div>
  );
}
