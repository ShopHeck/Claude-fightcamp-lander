const DISCIPLINES = [
  "Boxing",
  "MMA",
  "Muay Thai",
  "Kickboxing",
  "BJJ",
  "Wrestling",
  "Karate",
  "Taekwondo",
];

export function Disciplines() {
  // duplicated for seamless marquee loop
  const row = [...DISCIPLINES, ...DISCIPLINES];
  return (
    <section className="relative overflow-hidden border-y border-line-subtle bg-bg-elevated/40 py-10">
      <div className="container-page mb-6">
        <p className="text-eyebrow text-center text-ink-muted">
          Built for every combat sport
        </p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-base to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {row.map((d, i) => (
            <div
              key={`${d}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-bg-card px-5 py-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              <span className="text-sm font-semibold tracking-wide text-white">
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
