import type { ReactNode } from "react";

export function WatchFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-[180px] ${className}`}>
      {/* band top */}
      <div className="mx-auto h-8 w-24 rounded-t-2xl bg-gradient-to-b from-neutral-900 to-neutral-800" aria-hidden="true" />
      {/* body */}
      <div className="relative rounded-[40px] bg-neutral-950 p-2 shadow-phone ring-1 ring-white/10">
        <div className="absolute -right-1 top-10 h-10 w-1.5 rounded-r-md bg-neutral-700" aria-hidden="true" />
        <div className="absolute -right-1 top-24 h-6 w-1.5 rounded-r-md bg-neutral-800" aria-hidden="true" />
        <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[32px] bg-black">
          {children}
        </div>
      </div>
      {/* band bottom */}
      <div className="mx-auto h-8 w-24 rounded-b-2xl bg-gradient-to-t from-neutral-900 to-neutral-800" aria-hidden="true" />
    </div>
  );
}
