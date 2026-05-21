import { FlameLogo } from "./ui/FlameLogo";
import { Twitter, Instagram, Youtube } from "lucide-react";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Camp dashboard", href: "#camp" },
      { label: "Round timer", href: "#timer" },
      { label: "Weight cut", href: "#weight" },
      { label: "Workouts & meals", href: "#nutrition" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "mailto:hello@fightcamp.app" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-subtle bg-bg-base">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,_1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-white">
                <FlameLogo className="h-5 w-5" />
              </span>
              <span className="text-display text-lg">FIGHT CAMP</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              Train. Track. Win. The all-in-one fight camp app for combat
              athletes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Coming soon to the App Store"
                className="rounded-lg border border-line-strong bg-bg-card px-4 py-2 text-xs text-ink-muted transition hover:border-brand-orange/40 hover:text-white"
              >
                Coming soon · App Store
              </a>
              <a
                href="#"
                aria-label="Coming soon to Google Play"
                className="rounded-lg border border-line-strong bg-bg-card px-4 py-2 text-xs text-ink-muted transition hover:border-brand-orange/40 hover:text-white"
              >
                Coming soon · Google Play
              </a>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-eyebrow text-white">{c.title}</div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-muted transition hover:text-white ring-focus"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line-subtle pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-dim">
            © {new Date().getFullYear()} Fight Camp. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-ink-muted">
            <a href="#" aria-label="Twitter / X" className="ring-focus hover:text-white">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="ring-focus hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="ring-focus hover:text-white">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
