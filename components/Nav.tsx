"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FlameLogo } from "./ui/FlameLogo";

const LINKS = [
  { href: "#camp", label: "Camp" },
  { href: "#timer", label: "Timer" },
  { href: "#weight", label: "Weight" },
  { href: "#nutrition", label: "Nutrition" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line-subtle bg-bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="flex items-center gap-2 ring-focus"
          aria-label="Fight Camp — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-white shadow-glow">
            <FlameLogo className="h-5 w-5" />
          </span>
          <span className="text-display text-lg tracking-tight">FIGHT CAMP</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-muted transition hover:text-white ring-focus"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-orangeSoft ring-focus"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
