import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { FROM_EMAIL, getResend, welcomeEmailHtml } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISCIPLINES = new Set([
  "boxing",
  "mma",
  "muay_thai",
  "kickboxing",
  "bjj",
  "wrestling",
  "karate",
  "taekwondo",
  "other",
]);

const SOURCES = new Set([
  "hero",
  "cta_footer",
  "camp_calculator",
  "timer_widget",
  "other",
]);

// Tiny in-memory rate limit (per Vercel instance). Good enough for launch;
// swap for Upstash if we see real abuse.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = HITS.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    HITS.set(ip, recent);
    return true;
  }
  recent.push(now);
  HITS.set(ip, recent);
  return false;
}

function pickString(v: unknown, max = 64): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function pickNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const email = pickString(body.email, 254)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const discipline = pickString(body.discipline, 32)?.toLowerCase() ?? null;
  const validDiscipline =
    discipline && DISCIPLINES.has(discipline) ? discipline : null;

  const source = pickString(body.source, 32)?.toLowerCase() ?? "hero";
  const validSource = SOURCES.has(source) ? source : "other";

  const payload = {
    email,
    discipline: validDiscipline,
    weight_class: pickString(body.weight_class, 32),
    current_weight: pickNumber(body.current_weight),
    target_weight: pickNumber(body.target_weight),
    fight_date: pickString(body.fight_date, 10), // YYYY-MM-DD
    fighter_level: pickString(body.fighter_level, 32),
    signup_source: validSource,
    referrer: pickString(req.headers.get("referer"), 512),
    utm_source: pickString(body.utm_source, 64),
    utm_medium: pickString(body.utm_medium, 64),
    utm_campaign: pickString(body.utm_campaign, 64),
    ip_country: pickString(req.headers.get("x-vercel-ip-country"), 4),
    ip_city: pickString(req.headers.get("x-vercel-ip-city"), 64),
    user_agent: pickString(req.headers.get("user-agent"), 256),
  };

  let position: number | undefined;

  const sb = supabaseAdmin();
  if (sb) {
    // Upsert by lowercase email — if they signed up twice, keep latest metadata.
    const { error } = await sb
      .from("waitlist")
      .upsert(payload, { onConflict: "email" });
    if (error) {
      console.error("[waitlist] supabase insert failed:", error);
      // Don't leak the underlying error to the client; the form should still succeed UX-wise.
    } else {
      const { count } = await sb
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      position = count ?? undefined;
    }
  } else {
    console.log("[waitlist] signup (no DB configured):", payload);
  }

  // Fire-and-forget welcome email if Resend is configured.
  const resend = getResend();
  if (resend) {
    resend.emails
      .send({
        from: FROM_EMAIL,
        to: email,
        subject: "You're in — Fight Camp early access",
        html: welcomeEmailHtml({
          position,
          discipline: payload.discipline,
          weightClass: payload.weight_class,
        }),
      })
      .catch((e) => console.error("[waitlist] resend send failed:", e));
  }

  return NextResponse.json({ ok: true, position });
}
