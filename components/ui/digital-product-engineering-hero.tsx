"use client";

import React, { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PURPLE = "#7C5CFF";

const TRUST = [
  { label: "Focus", value: "Digital products" },
  { label: "Method", value: "Engineered" },
  { label: "Horizon", value: "Built to scale" },
] as const;

const LAYERS = [
  { label: "Strategy", y: 88 },
  { label: "Design", y: 128 },
  { label: "Frontend", y: 168 },
  { label: "API", y: 208 },
  { label: "Cloud", y: 248 },
] as const;

function HeroViz({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
        <defs>
          <filter id={`dpeh-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`dpehCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.5" />
            <stop offset="40%" stopColor={PURPLE} stopOpacity="0.28" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`dpehGrid-${uid}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(168,197,240,0.12)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Blueprint grid */}
        <motion.rect
          x="60"
          y="60"
          width="280"
          height="280"
          fill={`url(#dpehGrid-${uid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.9 : 0.15 }}
          transition={{ duration: 0.8 }}
        />

        {[150, 108, 68].map((r, i) => (
          <motion.circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={
              i === 0
                ? "rgba(168,197,240,0.2)"
                : i === 1
                  ? "rgba(184,164,255,0.25)"
                  : "rgba(124,92,255,0.35)"
            }
            strokeWidth={i === 2 ? 1.1 : 0.8}
            strokeDasharray={i === 0 ? "2 7" : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 0.75, scale: 1 } : { opacity: 0.2 }}
            transition={{ duration: 1, delay: i * 0.08, ease: easeEditorial }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}

        {/* Blueprint stack layers */}
        {LAYERS.map((layer, i) => (
          <g key={layer.label}>
            <motion.rect
              x={100 + i * 4}
              y={layer.y}
              width={200 - i * 8}
              height="28"
              rx="4"
              fill="rgba(12,21,43,0.85)"
              stroke={i === LAYERS.length - 1 ? "#A8C5F0" : "#7C5CFF"}
              strokeWidth="1"
              filter={`url(#dpeh-${uid})`}
              initial={{ opacity: 0, x: -12 }}
              animate={
                active
                  ? { opacity: 0.4 + i * 0.12, x: 0 }
                  : { opacity: 0.1 }
              }
              transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: easeOutExpo }}
            />
            <text
              x="200"
              y={layer.y + 18}
              textAnchor="middle"
              fill={i === LAYERS.length - 1 ? "#F4F7FC" : "#9AA8C0"}
              fontSize="9"
              fontFamily="var(--font-space-grotesk), sans-serif"
              letterSpacing="0.1em"
            >
              {layer.label}
            </text>
          </g>
        ))}

        {/* Connecting spine */}
        <motion.line
          x1="200"
          y1="88"
          x2="200"
          y2="276"
          stroke="rgba(184,164,255,0.35)"
          strokeWidth="1"
          strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
        />

        {!reduced && active && (
          <motion.circle
            r="3"
            fill="#F5E9FF"
            filter={`url(#dpeh-${uid})`}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path="M 200 88 L 200 276"
            />
          </motion.circle>
        )}

        <motion.circle
          cx="200"
          cy="320"
          r="28"
          fill={`url(#dpehCore-${uid})`}
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
          style={{ transformOrigin: "200px 320px" }}
        />
        <circle cx="200" cy="320" r="3" fill="#D4C8FF" />
        <text
          x="200"
          y="348"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="8.5"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.14em"
        >
          PRODUCT LAB
        </text>
      </svg>
    </div>
  );
}

export function DigitalProductEngineeringHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
      aria-labelledby="dpe-hero-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[8%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,rgba(168,197,240,0.14),transparent_68%)]" />
        <div className="absolute -left-[6%] bottom-[10%] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.16),transparent_70%)]" />
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8C5F0] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A8C5F0]" />
                </span>
                Product Engineering Lab
              </p>
            </motion.div>

            <motion.h1
              id="dpe-hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06, ease: easeEditorial }}
              className="max-w-[15ch] text-[2.75rem] leading-[1.02] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl lg:text-[4.35rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              We don&apos;t build websites.
              <span className="mt-1 block text-[#B8A4FF]">
                We engineer digital products.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeEditorial }}
              className="mt-6 max-w-[30rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Strategy, UX, engineering, and cloud — built as one system so
              software scales with the business, not against it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: easeEditorial }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <BookCTA
                source="dpe-hero"
                className="s12-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Engineer Your Product
              </BookCTA>
              <a
                href="#journey"
                className="s12-btn-ghost inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Watch an idea become a platform
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
