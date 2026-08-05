"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WovenCanvas } from "@/components/ui/woven-canvas";
import { useBooking } from "@/components/booking/booking-provider";

const HEADLINES = [
  ["Scale", "Faster."],
  ["One partner.", "Every channel."],
  ["Scale", "Smarter."],
  ["Built on", "AI."],
  ["Scale", "12x."],
  ["Founder-led.", "Enterprise trust."],
  ["Businesses ready", "to scale."],
  ["Scale with", "AI."],
] as const;

const GLOBAL_CITIES = [
  "London",
  "New York",
  "Dubai",
  "San Francisco",
  "Riyadh",
] as const;

/** Accent cycle — ice / cloud / lavender / violet only (reference system) */
const ACCENT_PALETTE = [
  {
    line1: "#F4F7FC",
    line2: "#6EB8E8",
    glow: "0 0 28px rgba(110,184,232,0.4), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#B8A4FF",
    glow: "0 0 28px rgba(184,164,255,0.45), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#7C5CFF",
    glow: "0 0 28px rgba(124,92,255,0.45), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#5B8DEF",
    glow: "0 0 28px rgba(91,141,239,0.42), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#A8C5F0",
    glow: "0 0 28px rgba(168,197,240,0.4), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#D4C8FF",
    glow: "0 0 28px rgba(212,200,255,0.42), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#6EB8E8",
    glow: "0 0 28px rgba(110,184,232,0.4), 0 2px 16px rgba(2,4,10,0.75)",
  },
  {
    line1: "#F4F7FC",
    line2: "#B8A4FF",
    glow: "0 0 28px rgba(184,164,255,0.45), 0 2px 16px rgba(2,4,10,0.75)",
  },
] as const;

const HOLD_MS = 4200;
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

function RotatingHeadline({ ready, active }: { ready: boolean; active: boolean }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setVisible(true);
    if (!active) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HEADLINES.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [ready, active]);

  const lines = HEADLINES[index];
  const palette = ACCENT_PALETTE[index % ACCENT_PALETTE.length];

  return (
    <h1
      className="relative min-h-[2.2em] w-full text-left text-[2.65rem] leading-[1.06] tracking-[-0.025em] sm:text-5xl md:min-h-[2.3em] md:text-6xl lg:text-[4.25rem] xl:text-7xl"
      style={{
        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
      }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={index}
            className="block text-left"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: easeEditorial }}
          >
            {lines.map((line, lineIndex) => (
              <motion.span
                key={`${index}-${lineIndex}`}
                className="block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: lineIndex * 0.08,
                  duration: 0.5,
                  ease: easeEditorial,
                }}
                style={{
                  color: lineIndex === 1 ? palette.line2 : palette.line1,
                  textShadow:
                    lineIndex === 1
                      ? palette.glow
                      : "0 2px 18px rgba(0,0,0,0.85), 0 0 1px rgba(0,0,0,0.9)",
                }}
              >
                {line}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
}

function SweepButton({
  children,
  variant = "primary",
  className = "",
  source,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  source: string;
}) {
  const isPrimary = variant === "primary";
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => openBooking(source)}
      className={`group relative overflow-hidden rounded-full px-7 py-3 font-semibold text-[#F4F7FC] transition-[border-color,box-shadow,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 ${
        isPrimary ? "s12-btn-primary" : "s12-btn-ghost"
      } ${className}`}
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(2,4,10,0.8)]">
        {children}
      </span>
    </button>
  );
}

export const WovenLightHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: false });
  const [headlineReady, setHeadlineReady] = useState(false);

  useEffect(() => {
    const readyTimer = window.setTimeout(() => setHeadlineReady(true), 200);
    return () => window.clearTimeout(readyTimer);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-start justify-start overflow-hidden bg-transparent"
    >
      {/* Hero-only WebGL */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <WovenCanvas />
      </div>

      {/* Normal dark stage + readability veil only (no colored bg orbs) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="absolute inset-y-0 left-0 w-[min(100%,740px)] bg-[radial-gradient(92%_72%_at_4%_40%,rgba(3,2,8,0.94)_0%,rgba(3,2,8,0.65)_40%,transparent_74%)] md:w-[50%] lg:w-[46%]" />
      </div>

      <div className="relative z-10 flex w-full justify-start pl-5 pr-5 pt-[18vh] sm:pl-7 md:pl-10 md:pt-[20vh] lg:pl-14 xl:pl-16">
        <motion.div
          className="w-full max-w-[320px] text-left sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px]"
          initial={{ opacity: 0, x: -36, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: easeEditorial }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: easeEditorial }}
            className="mb-2.5 text-left text-[12px] font-medium uppercase tracking-[0.32em] text-[#B8A4FF] md:mb-3 md:text-[13px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            AI-Native Growth Studio
          </motion.p>

          <RotatingHeadline ready={headlineReady} active={inView} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: easeEditorial }}
            className="mt-4 max-w-[28rem] text-left text-[14px] leading-relaxed tracking-[0.01em] text-[#9AA8C0] md:mt-5 md:text-[15px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            One partner. Every channel. Built for businesses ready to scale —
            with enterprise trust and founder-led execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: easeEditorial }}
            className="relative z-20 mt-6 flex w-full max-w-[calc(100vw-2.5rem)] flex-col items-stretch gap-3 sm:mt-7 sm:w-max sm:flex-row sm:flex-nowrap sm:items-center sm:justify-start sm:gap-4 md:gap-5"
          >
            <SweepButton
              variant="primary"
              source="home-hero-start-scaling"
              className="w-full whitespace-nowrap sm:w-auto sm:shrink-0"
            >
              Start Scaling
            </SweepButton>
            <SweepButton
              variant="ghost"
              source="home-hero-book-strategy"
              className="w-full whitespace-nowrap sm:w-auto sm:shrink-0"
            >
              Book Your Growth Strategy
            </SweepButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.75, ease: easeEditorial }}
            className="mt-8 md:mt-9"
            aria-label="Global presence"
          >
            <div className="mb-3 flex items-center gap-3">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6B7890]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Operating Across
              </p>
              <span
                aria-hidden
                className="h-px w-8 bg-gradient-to-r from-[#A8C5F0]/25 to-transparent"
              />
              <p
                className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#4A5568]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Estd. 2026
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-x-0 gap-y-2">
              {GLOBAL_CITIES.map((city, i) => (
                <li
                  key={city}
                  className="flex items-center"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="mx-2.5 h-3 w-px bg-[#A8C5F0]/15 sm:mx-3.5"
                    />
                  )}
                  <span className="text-[11px] font-medium tracking-[0.14em] text-[#9AA8C0] uppercase sm:text-[12px] sm:tracking-[0.16em]">
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[10vh] bg-gradient-to-b from-transparent via-[#050814]/35 to-[#050814]"
      />
    </div>
  );
};
