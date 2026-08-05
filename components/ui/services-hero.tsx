"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SYSTEM_LAYERS = [
  { label: "Demand", status: "Live" },
  { label: "Intelligence", status: "Live" },
  { label: "Infrastructure", status: "Live" },
] as const;

function AmbientField({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -right-[12%] top-[8%] h-[70vmin] w-[70vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.16) 0%, rgba(91,141,239,0.06) 42%, transparent 70%)",
        }}
        animate={
          active
            ? { opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }
            : { opacity: 0.4, scale: 1 }
        }
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -left-[8%] bottom-[5%] h-[48vmin] w-[48vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(110,184,232,0.1) 0%, transparent 68%)",
        }}
        animate={
          active
            ? { opacity: [0.35, 0.65, 0.35], x: [0, 18, 0] }
            : { opacity: 0.3 }
        }
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <svg
        className="absolute right-[4%] top-[16%] hidden h-[440px] w-[440px] opacity-[0.2] lg:block xl:right-[8%]"
        viewBox="0 0 420 420"
        fill="none"
      >
        <motion.circle
          cx="210"
          cy="210"
          r="168"
          stroke="rgba(168,197,240,0.35)"
          strokeWidth="0.75"
          strokeDasharray="3 10"
          animate={active ? { rotate: 360 } : undefined}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "210px 210px" }}
        />
        <motion.circle
          cx="210"
          cy="210"
          r="118"
          stroke="rgba(184,164,255,0.28)"
          strokeWidth="0.75"
          animate={active ? { rotate: -360 } : undefined}
          transition={{ duration: 110, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "210px 210px" }}
        />
        <circle cx="210" cy="42" r="2.5" fill="#B8A4FF" opacity="0.7" />
        <circle cx="328" cy="210" r="2" fill="#6EB8E8" opacity="0.55" />
      </svg>
    </div>
  );
}

export function ServicesHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
      aria-labelledby="services-hero-heading"
    >
      <AmbientField active={inView && !reduced} />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeEditorial }}
              className="mb-5 flex items-center gap-3"
            >
              <span
                className="relative flex h-2 w-2"
                aria-hidden
              >
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C5CFF] opacity-40" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B8A4FF]" />
              </span>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#B8A4FF]/85 md:text-[12px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Growth Operating System
              </p>
            </motion.div>

            <motion.h1
              id="services-hero-heading"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: easeEditorial }}
              className="max-w-[15ch] text-[2.75rem] leading-[1.02] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Stop juggling
              <span className="mt-1 block text-[#B8A4FF]">
                five agencies.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: easeEditorial }}
              className="mt-6 max-w-[32rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:mt-7 md:text-[16px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Scale 12x replaces fragmented vendors with one AI-native Growth
              Operating System — led by AI Solutions & Automation, so demand,
              intelligence, and infrastructure compound instead of collide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.36, ease: easeEditorial }}
              className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
            >
              <BookCTA
                source="services-hero"
                className="s12-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] transition-[filter,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Start Scaling
              </BookCTA>
              <a
                href="#gateways"
                className="s12-btn-ghost inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] transition-[border-color,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Explore flagship services
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: easeOutExpo }}
            className="relative"
            aria-label="Operating system status"
          >
            <div className="s12-surface relative overflow-hidden rounded-[28px] p-6 md:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_70%)]"
              />

              <div className="flex items-center justify-between gap-4">
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6B7890]"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  System status
                </p>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(124,92,255,0.28)] bg-[rgba(124,92,255,0.1)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#B8A4FF]"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFF]" aria-hidden />
                  Online
                </span>
              </div>

              <p
                className="mt-5 text-[1.35rem] leading-snug tracking-[-0.025em] text-[#F4F7FC] md:text-[1.5rem]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                One partner.
                <br />
                <span className="text-[#B8A4FF]">Every channel compounding.</span>
              </p>

              <ul className="mt-7 space-y-3 border-t border-[rgba(168,196,240,0.12)] pt-5">
                {SYSTEM_LAYERS.map((layer, i) => (
                  <motion.li
                    key={layer.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.55 + i * 0.1,
                      duration: 0.5,
                      ease: easeEditorial,
                    }}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="h-px w-4 bg-[#7C5CFF]/55"
                      />
                      <span
                        className="text-[13px] tracking-[0.02em] text-[#9AA8C0]"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {layer.label}
                      </span>
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-[0.18em] text-[#6B7890]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {layer.status}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <p
                className="mt-6 text-[12px] leading-relaxed text-[#6B7890]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Built for US B2B operators ready to scale — founder-led,
                enterprise trust, AI-native execution.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050814]/80"
      />
    </section>
  );
}
