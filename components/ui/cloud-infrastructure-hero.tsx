"use client";

import React, { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PURPLE = "#7C5CFF";
const ICE = "#A8C5F0";

const TRUST = [
  { label: "Focus", value: "Intelligent infra" },
  { label: "Method", value: "Mission control" },
  { label: "Horizon", value: "Built to endure" },
] as const;

const REGIONS = [
  { cx: 118, cy: 150, label: "API" },
  { cx: 200, cy: 108, label: "Data" },
  { cx: 282, cy: 150, label: "AI" },
  { cx: 140, cy: 248, label: "Cloud" },
  { cx: 260, cy: 248, label: "Ops" },
] as const;

function HeroViz({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
        <defs>
          <filter id={`cih-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`cihCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.5" />
            <stop offset="40%" stopColor={ICE} stopOpacity="0.28" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`cihGrid-${uid}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(168,197,240,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <motion.rect
          x="50"
          y="50"
          width="300"
          height="300"
          fill={`url(#cihGrid-${uid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.85 : 0.12 }}
          transition={{ duration: 0.8 }}
        />

        {[155, 110, 72].map((r, i) => (
          <motion.circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={
              i === 0
                ? "rgba(168,197,240,0.18)"
                : i === 1
                  ? "rgba(110,184,232,0.28)"
                  : "rgba(124,92,255,0.38)"
            }
            strokeWidth={i === 2 ? 1.1 : 0.8}
            strokeDasharray={i === 0 ? "2 8" : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 0.8, scale: 1 } : { opacity: 0.2 }}
            transition={{ duration: 1, delay: i * 0.08, ease: easeEditorial }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}

        {/* Hub connections */}
        {REGIONS.map((n, i) => (
          <motion.line
            key={`l-${n.label}`}
            x1="200"
            y1="200"
            x2={n.cx}
            y2={n.cy}
            stroke={i % 2 === 0 ? ICE : PURPLE}
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.35 : 0.08 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
          />
        ))}

        {/* Orbiting signal */}
        {!reduced && active && (
          <motion.circle
            r="3"
            fill="#F5E9FF"
            filter={`url(#cih-${uid})`}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path="M 200 90 A 110 110 0 1 1 199.9 90"
            />
          </motion.circle>
        )}

        {REGIONS.map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r="18"
              fill="rgba(12,21,43,0.9)"
              stroke={i === 1 ? ICE : PURPLE}
              strokeWidth="1"
              filter={`url(#cih-${uid})`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                active
                  ? { opacity: 0.95, scale: 1 }
                  : { opacity: 0.2, scale: 0.9 }
              }
              transition={{
                delay: 0.4 + i * 0.07,
                duration: 0.5,
                ease: easeOutExpo,
              }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r="2.5"
              fill={i === 1 ? "#F4F7FC" : "#B8A4FF"}
            />
            <text
              x={n.cx}
              y={n.cy + 32}
              textAnchor="middle"
              fill="#9AA8C0"
              fontSize="8"
              fontFamily="var(--font-space-grotesk), sans-serif"
              letterSpacing="0.08em"
            >
              {n.label}
            </text>
          </g>
        ))}

        <motion.circle
          cx="200"
          cy="200"
          r="36"
          fill={`url(#cihCore-${uid})`}
          animate={
            active && !reduced
              ? { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }
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
          y="348"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="8.5"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.14em"
        >
          MISSION CONTROL
        </text>
      </svg>
    </div>
  );
}

export function CloudInfrastructureHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
      aria-labelledby="ci-hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-[8%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,rgba(168,197,240,0.16),transparent_68%)]" />
        <div className="absolute -left-[6%] bottom-[10%] h-[42vmin] w-[42vmin] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.14),transparent_70%)]" />
        <div className="absolute left-[40%] top-[20%] h-[28vmin] w-[28vmin] rounded-full bg-[radial-gradient(circle,rgba(110,184,232,0.1),transparent_70%)]" />
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
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.34em] text-[#A8C5F0]/90 md:text-[12px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A8C5F0] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A8C5F0]" />
                </span>
                Mission Control
              </p>
            </motion.div>

            <motion.h1
              id="ci-hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06, ease: easeEditorial }}
              className="max-w-[16ch] text-[2.75rem] leading-[1.02] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl lg:text-[4.35rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              We don&apos;t simply host.
              <span className="mt-1 block text-[#A8C5F0]">
                We engineer intelligent infrastructure.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeEditorial }}
              className="mt-6 max-w-[30rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Cloud, data, APIs, automation, and AI — designed as one resilient
              system so infrastructure becomes a competitive advantage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: easeEditorial }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <BookCTA
                source="cloud-hero"
                className="s12-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Engineer Your Infrastructure
              </BookCTA>
              <a
                href="#journey"
                className="s12-btn-ghost inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Follow a request through the stack
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
