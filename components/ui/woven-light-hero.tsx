"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WovenCanvas } from "@/components/ui/woven-canvas";

const HEADLINES = [
  ["Growth,", "Amplified."],
  ["One partner.", "Every channel."],
  ["Your marketing,", "ten times faster."],
  ["Built on", "AI."],
  ["We're", "AI-native."],
  ["Founder-led.", "Premium."],
  ["One partner.", "Every channel."],
  ["Growth,", "Amplified."],
] as const;

/** High-contrast accent cycle — vivid, never washed-out white */
const ACCENT_PALETTE = [
  {
    line1: "#F0FDFF",
    line2: "#22D3EE",
    glow: "0 0 28px rgba(34,211,238,0.45), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#FDF4FF",
    line2: "#E879F9",
    glow: "0 0 28px rgba(232,121,249,0.5), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#F5F3FF",
    line2: "#A78BFA",
    glow: "0 0 28px rgba(167,139,250,0.5), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#FFF7ED",
    line2: "#FB923C",
    glow: "0 0 28px rgba(251,146,60,0.45), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#ECFDF5",
    line2: "#34D399",
    glow: "0 0 28px rgba(52,211,153,0.45), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#FFF1F2",
    line2: "#FB7185",
    glow: "0 0 28px rgba(251,113,133,0.45), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#EEF2FF",
    line2: "#818CF8",
    glow: "0 0 28px rgba(129,140,248,0.5), 0 2px 16px rgba(0,0,0,0.75)",
  },
  {
    line1: "#FAF5FF",
    line2: "#C084FC",
    glow: "0 0 28px rgba(192,132,252,0.5), 0 2px 16px rgba(0,0,0,0.75)",
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
  fillClassName,
  className = "",
}: {
  children: React.ReactNode;
  fillClassName: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`group relative overflow-hidden rounded-full border-2 border-cyan-300/35 bg-[#0B0F1A]/85 px-7 py-3 font-semibold text-[#F0FDFF] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 ${className}`}
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 ${fillClassName}`}
      />
      <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{children}</span>
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
      className="relative flex min-h-screen w-full items-start justify-start overflow-hidden bg-[#030208]"
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

      <div className="relative z-10 flex w-full justify-start pl-5 pr-5 pt-[26vh] sm:pl-7 md:pl-10 md:pt-[28vh] lg:pl-14 xl:pl-16">
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
            className="mb-3 text-left text-[12px] font-medium uppercase tracking-[0.32em] text-[#C4B5FD] md:mb-4 md:text-[13px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            AI-Native Growth Studio
          </motion.p>

          <RotatingHeadline ready={headlineReady} active={inView} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: easeEditorial }}
            className="relative z-20 mt-7 flex w-full max-w-[calc(100vw-2.5rem)] flex-col items-stretch gap-3 sm:mt-8 sm:w-max sm:flex-row sm:flex-nowrap sm:items-center sm:justify-start sm:gap-4 md:gap-5"
          >
            <SweepButton
              fillClassName="bg-[#A855F7]"
              className="w-full whitespace-nowrap border-white/25 sm:w-auto sm:shrink-0 hover:border-[#C084FC] hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]"
            >
              Let&apos;s grow.
            </SweepButton>
            <SweepButton
              fillClassName="bg-[#7C3AED]"
              className="w-full whitespace-nowrap border-white/25 sm:w-auto sm:shrink-0 hover:border-[#C4B5FD] hover:shadow-[0_0_28px_rgba(124,58,237,0.35)]"
            >
              Ready when you are.
            </SweepButton>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[28vh] bg-gradient-to-b from-transparent via-[#030208]/35 to-[#030208]"
      />
    </div>
  );
};
