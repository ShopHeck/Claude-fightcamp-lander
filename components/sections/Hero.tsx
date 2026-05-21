"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { PhoneFrame } from "../ui/PhoneFrame";
import { HomeScreen } from "../mockups/HomeScreen";
import { WaitlistForm } from "../ui/WaitlistForm";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-6, -10]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-orange opacity-70"
      />
      {/* diag lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 diag-lines opacity-30"
      />
      {/* vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0a0b_85%)]"
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div id="waitlist">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-3 py-1 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-brand-orange">
                EARLY ACCESS · WAITLIST OPEN
              </span>
            </div>
            <h1 className="text-display text-hero mt-5">
              Train.
              <br />
              Track.
              <br />
              <span className="text-brand-orange">Win.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-ink-muted sm:text-lg">
              Everything you need to prepare, perform, and peak when it
              matters. Plan your camp, time your rounds, hit your cut, and
              arrive fight-ready.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <WaitlistForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted"
          >
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-brand-orange text-brand-orange"
                />
              ))}
              <span className="ml-1 text-white">4.9</span>
              <span>· early access reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-brand-orange" />
              Built for boxing, MMA, Muay Thai, kickboxing &amp; BJJ
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: phoneY, rotate: phoneRotate }}
          className="relative flex justify-center lg:justify-end"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 mx-auto h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-radial-orange blur-2xl"
          />
          <PhoneFrame activeTab="home" className="relative">
            <HomeScreen />
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
