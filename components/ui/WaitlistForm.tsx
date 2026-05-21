"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  variant = "hero",
  placeholder = "you@example.com",
}: {
  variant?: "hero" | "footer";
  placeholder?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: { ok: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're in. We'll email when early access opens.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const inputBase =
    "flex-1 min-w-0 bg-transparent text-white placeholder:text-ink-dim outline-none";
  const wrapBase =
    "flex items-center gap-2 rounded-full border border-line-strong bg-bg-elevated/80 backdrop-blur px-2 py-2";
  const buttonBase =
    "inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-orangeSoft active:translate-y-px ring-focus";

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full ${variant === "hero" ? "max-w-md" : "max-w-lg"}`}
      aria-label="Join the Fight Camp early access waitlist"
    >
      <div className={`${wrapBase} pl-5`}>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className={inputBase}
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          className={buttonBase}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : status === "success" ? (
            <>
              <Check className="h-4 w-4" /> Joined
            </>
          ) : (
            <>
              Get early access <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "success" ? "text-accent-green" : "text-accent-red"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-xs text-ink-dim">
          Free to start. No spam — early-access updates only.
        </p>
      )}
    </form>
  );
}
