import type { ReactNode } from "react";

export function SectionShell({
  id,
  children,
  glow = false,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  glow?: boolean;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-20 py-20 sm:py-24 ${className}`}
    >
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-orange opacity-50"
        />
      ) : null}
      <div className="container-page relative">{children}</div>
    </section>
  );
}
