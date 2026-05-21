"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line-subtle bg-bg-base/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="flex items-center gap-2 ring-focus"
          aria-label="Fight Camp — back to top"
          onClick={() => setOpen(false)}
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
        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-orangeSoft ring-focus"
          >
            Join waitlist
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-bg-card text-white md:hidden ring-focus"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden border-t border-line-subtle transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-white hover:bg-bg-elevated ring-focus"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-orange px-4 py-3 text-sm font-semibold text-black"
            onClick={() => setOpen(false)}
          >
            Join the waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
