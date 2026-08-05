"use client";

import React, { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PURPLE = "#7C5CFF";

const TRUST = [
  { label: "Focus", value: "Category leadership" },
  { label: "Method", value: "Engineered" },
  { label: "Horizon", value: "Long-term equity" },
] as const;

const EVOLUTION = [
  { label: "Generic", weight: 0.15 },
  { label: "Clear", weight: 0.35 },
  { label: "Positioned", weight: 0.55 },
  { label: "Recognized", weight: 0.75 },
  { label: "Iconic", weight: 1 },
] as const;

function HeroViz({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
        <defs>
          <filter id={`bsh-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`bshCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.55" />
            <stop offset="40%" stopColor={PURPLE} stopOpacity="0.3" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`bshArc-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(106,120,144,0.35)" />
            <stop offset="50%" stopColor="rgba(184,164,255,0.7)" />
            <stop offset="100%" stopColor="rgba(110,184,232,0.85)" />
          </linearGradient>
        </defs>

        {/* Outer orbital rings — brand gravity */}
        {[150, 108, 68].map((r, i) => (
          <motion.circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={
              i === 0
                ? "rgba(110,184,232,0.22)"
                : i === 1
                  ? "rgba(184,164,255,0.28)"
                  : "rgba(124,92,255,0.35)"
            }
            strokeWidth={i === 2 ? 1.1 : 0.8}
            strokeDasharray={i === 0 ? "2 7" : i === 1 ? "4 6" : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 0.8, scale: 1 } : { opacity: 0.2 }}
            transition={{ duration: 1, delay: i * 0.08, ease: easeEditorial }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}

        {/* Evolution arc — generic → iconic */}
        <motion.path
          d="M 72 268 C 110 200, 160 140, 200 120 C 240 100, 290 120, 328 168"
          fill="none"
          stroke={`url(#bshArc-${uid})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          filter={`url(#bsh-${uid})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: 0.2, opacity: 0.2 }
          }
          transition={{ duration: 1.4, delay: 0.3, ease: easeOutExpo }}
        />

        {EVOLUTION.map((stage, i) => {
          const t = i / (EVOLUTION.length - 1);
          const x = 72 + t * 256;
          const y = 268 - Math.sin(t * Math.PI * 0.72) * 148 - t * 20;
          const r = 4 + stage.weight * 6;
          return (
            <g key={stage.label}>
              <motion.circle
                cx={Math.round(x * 10) / 10}
                cy={Math.round(y * 10) / 10}
                r={r}
                fill="rgba(12,21,43,0.95)"
                stroke={
                  i === EVOLUTION.length - 1
                    ? "#6EB8E8"
                    : i === 0
                      ? "#6B7890"
                      : "#B8A4FF"
                }
                strokeWidth="1.2"
                filter={`url(#bsh-${uid})`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.2 }}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
              />
              <circle
                cx={Math.round(x * 10) / 10}
                cy={Math.round(y * 10) / 10}
                r="1.8"
                fill={i === EVOLUTION.length - 1 ? "#F5E9FF" : "#B8A4FF"}
              />
              <text
                x={Math.round(x * 10) / 10}
                y={Math.round(y * 10) / 10 + (i % 2 === 0 ? 22 : -16)}
                textAnchor="middle"
                fill={i === EVOLUTION.length - 1 ? "#F4F7FC" : "#9AA8C0"}
                fontSize="8.5"
                fontFamily="var(--font-space-grotesk), sans-serif"
                letterSpacing="0.06em"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        <motion.circle
          cx="200"
          cy="200"
          r="36"
          fill={`url(#bshCore-${uid})`}
          animate={
            active && !reduced
              ? { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }
              : { opacity: active ? 0.85 : 0.3 }
          }
          transition={
            active && !reduced
              ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6 }
          }
          style={{ transformOrigin: "200px 200px" }}
        />
        <circle cx="200" cy="200" r="3.5" fill="#D4C8FF" />
        <text
          x="200"
          y="226"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="9"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.16em"
        >
          BRAND OS
        </text>
      </svg>
    </div>
  );
}

export function BrandStrategyHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
      aria-labelledby="brand-hero-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[8%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2),transparent_68%)]" />
        <div className="absolute -left-[6%] bottom-[10%] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,rgba(110,184,232,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeEditorial }}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <a
                href="/services"
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6B7890] transition-colors hover:text-[#B8A4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Services
              </a>
              <span className="text-[#4A5568]" aria-hidden>
                /
              </span>
              <p
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.34em] text-[#B8A4FF]/90 md:text-[12px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C5CFF] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B8A4FF]" />
                </span>
                Brand Intelligence System
              </p>
            </motion.div>

            <motion.h1
              id="brand-hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06, ease: easeEditorial }}
              className="max-w-[16ch] text-[2.75rem] leading-[1.02] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl lg:text-[4.35rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Great brands are engineered,
              <span className="mt-1 block text-[#B8A4FF]">
                not decorated.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeEditorial }}
              className="mt-6 max-w-[30rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Positioning, perception, and market authority — built as a system
              so your business becomes the category standard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: easeEditorial }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <BookCTA
                source="brand-hero"
                className="s12-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Engineer Your Brand
              </BookCTA>
              <a
                href="#architecture"
                className="s12-btn-ghost inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Watch a brand become iconic
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: easeOutExpo }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[rgba(168,196,240,0.12)] pt-6"
            >
              {TRUST.map((t) => (
                <li key={t.label}>
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] text-[#6B7890]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {t.label}
                  </p>
                  <p
                    className="mt-1 text-[14px] tracking-[0.02em] text-[#F4F7FC]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {t.value}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOutExpo }}
          >
            <HeroViz active={inView} />
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050814]/85"
      />
    </section>
  );
}
