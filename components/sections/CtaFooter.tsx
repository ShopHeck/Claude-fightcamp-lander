import { Reveal } from "../ui/Reveal";
import { WaitlistForm } from "../ui/WaitlistForm";

export function CtaFooter() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-orange opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 diag-lines opacity-20"
      />
      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-brand-orange">Early access</p>
            <h2 className="text-display text-h2 mt-4">
              Your next fight <br className="hidden sm:inline" />
              <span className="text-brand-orange">starts here.</span>
            </h2>
            <p className="mt-5 text-lg text-ink-muted">
              Join the waitlist. We're inviting fighters in waves. Free to
              start — no card required.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm variant="footer" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
