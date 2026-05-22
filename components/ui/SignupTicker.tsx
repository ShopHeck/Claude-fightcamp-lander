"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Item = { city: string; discipline: string; created_at: string };

const DISCIPLINE_LABEL: Record<string, string> = {
  boxing: "boxing",
  mma: "MMA",
  muay_thai: "Muay Thai",
  kickboxing: "kickboxing",
  bjj: "BJJ",
  wrestling: "wrestling",
  karate: "karate",
  taekwondo: "taekwondo",
};

function timeAgo(iso: string) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m === 1) return "1 min ago";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  return h === 1 ? "1 hr ago" : `${h} hr ago`;
}

export function SignupTicker() {
  const [items, setItems] = useState<Item[]>([]);
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/recent-signups")
      .then((r) => r.json())
      .then((d: { items?: Item[] }) => {
        if (!cancelled && Array.isArray(d.items)) setItems(d.items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;
  const cur = items[idx];
  const disc = DISCIPLINE_LABEL[cur.discipline] ?? cur.discipline;

  return (
    <div className="flex items-center gap-2 text-xs text-ink-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
      </span>
      <span className="font-medium text-ink-muted">Live ·</span>
      <div className="relative h-4 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${cur.city}-${cur.created_at}`}
            initial={reduce ? false : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block whitespace-nowrap"
          >
            <span className="text-white">
              A {disc} fighter in {cur.city}
            </span>{" "}
            just joined · {timeAgo(cur.created_at)}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
