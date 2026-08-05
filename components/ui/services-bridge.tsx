"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

/**
 * Narrative bridge — quiet connective tissue between chapters.
 * Teaches continuity of the Growth OS without competing with section headlines.
 */
export function ServicesBridge({
  chapter,
  from,
  to,
  line,
}: {
  chapter: string;
  from: string;
  to: string;
  line: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14"
      aria-hidden={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: easeEditorial }}
        className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#7C5CFF]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {chapter}
          </span>
          <span
            aria-hidden
            className="hidden h-px w-8 bg-gradient-to-r from-[#7C5CFF]/50 to-transparent sm:block"
          />
        </div>

        <p
          className="max-w-[42rem] text-[13px] leading-relaxed text-[#6B7890] md:text-[14px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <span className="text-[#9AA8C0]">{from}</span>
          <span className="mx-2 text-[#4A5568]" aria-hidden>
            →
          </span>
          <span className="text-[#B8A4FF]/90">{to}</span>
          <span className="mt-1.5 block text-[#6B7890] md:mt-0 md:inline md:before:mx-2 md:before:content-['·']">
            {line}
          </span>
        </p>
      </motion.div>

      {/* Soft signal fade into next chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(168,196,240,0.12)] to-transparent md:inset-x-8"
      />
    </div>
  );
}

/** Vertical signal vein — soft visual continuity between atmospheres */
export function ServicesSignalVein() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-[1] mx-auto h-16 w-px overflow-hidden md:h-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/35 to-transparent" />
      <div className="s12-signal-pulse absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#B8A4FF]/80 shadow-[0_0_12px_rgba(124,92,255,0.55)]" />
    </div>
  );
}
