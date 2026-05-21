import type { ReactNode } from "react";
import {
  LayoutGrid,
  Calendar,
  Dumbbell,
  Timer,
  Scale,
  Settings,
} from "lucide-react";

type Tab = "home" | "plan" | "log" | "timer" | "weight" | "settings";

const TABS: { key: Tab; label: string; Icon: typeof LayoutGrid }[] = [
  { key: "home", label: "Home", Icon: LayoutGrid },
  { key: "plan", label: "Plan", Icon: Calendar },
  { key: "log", label: "Log", Icon: Dumbbell },
  { key: "timer", label: "Timer", Icon: Timer },
  { key: "weight", label: "Weight", Icon: Scale },
  { key: "settings", label: "Settings", Icon: Settings },
];

export function PhoneFrame({
  children,
  activeTab = "home",
  time = "9:06",
  className = "",
}: {
  children: ReactNode;
  activeTab?: Tab;
  time?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[300px] sm:w-[340px] aspect-[9/19.5] rounded-[44px] bg-[#0d0d10] p-[10px] shadow-phone ring-1 ring-white/10 ${className}`}
    >
      {/* outer bezel highlight */}
      <div className="absolute inset-0 rounded-[44px] ring-1 ring-inset ring-white/5" aria-hidden="true" />
      {/* screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-bg-base">
        {/* status bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white">
          <span>{time}</span>
          <div className="absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
          <div className="flex items-center gap-1.5 text-white/90">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>
        {/* content */}
        <div className="relative z-10 h-[calc(100%-46px)] overflow-hidden px-4 pt-3 pb-2">
          {children}
        </div>
        {/* tab bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-bg-base/95 px-2 pb-3 pt-2 backdrop-blur">
          <div className="flex items-end justify-between">
            {TABS.map(({ key, label, Icon }) => {
              const active = key === activeTab;
              return (
                <div
                  key={key}
                  className={`flex flex-1 flex-col items-center gap-0.5 ${
                    active ? "text-brand-orange" : "text-ink-dim"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 1.8} />
                  <span className="text-[9px] font-medium">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-2 h-[3px] w-28 rounded-full bg-white/40" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" className="h-2.5 w-3.5 fill-current" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="0.5" />
      <rect x="5" y="5" width="3" height="7" rx="0.5" />
      <rect x="10" y="2" width="3" height="10" rx="0.5" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-current" aria-hidden="true">
      <path d="M8 11.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
      <path d="M3.8 7.4a6 6 0 0 1 8.4 0l-1.2 1.2a4.3 4.3 0 0 0-6 0L3.8 7.4Z" />
      <path d="M.8 4.4a10 10 0 0 1 14.4 0L14 5.6a8.3 8.3 0 0 0-12 0L.8 4.4Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 26 12" className="h-3 w-6" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <rect x="24" y="3.5" width="2" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}
