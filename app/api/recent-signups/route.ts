import { NextResponse } from "next/server";
import { supabaseAnon } from "@/lib/supabaseServer";

// Demo fallback used when Supabase isn't configured (local dev, preview deploys).
const DEMO = [
  { city: "São Paulo", discipline: "mma", minutesAgo: 2 },
  { city: "London", discipline: "boxing", minutesAgo: 5 },
  { city: "Bangkok", discipline: "muay_thai", minutesAgo: 7 },
  { city: "Las Vegas", discipline: "mma", minutesAgo: 11 },
  { city: "Dublin", discipline: "boxing", minutesAgo: 14 },
  { city: "Rio de Janeiro", discipline: "bjj", minutesAgo: 18 },
  { city: "Tokyo", discipline: "kickboxing", minutesAgo: 23 },
  { city: "Lagos", discipline: "boxing", minutesAgo: 28 },
  { city: "Manchester", discipline: "mma", minutesAgo: 34 },
  { city: "Sydney", discipline: "muay_thai", minutesAgo: 41 },
];

export const revalidate = 30;

export async function GET() {
  const sb = supabaseAnon();
  if (sb) {
    const { data, error } = await sb
      .from("recent_signups")
      .select("city, discipline, created_at")
      .limit(10);
    if (!error && data && data.length > 0) {
      return NextResponse.json({ items: data });
    }
  }
  // Demo data — anonymized, no real users referenced.
  const now = Date.now();
  return NextResponse.json({
    items: DEMO.map((d) => ({
      city: d.city,
      discipline: d.discipline,
      created_at: new Date(now - d.minutesAgo * 60_000).toISOString(),
    })),
    demo: true,
  });
}
