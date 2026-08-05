"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PURPLE = "#7C5CFF";
const ICE = "#A8C5F0";

/** Approximate map positions in a 600×320 viewBox (editorial, not geographic GIS) */
const CITIES = [
  { id: "ny", label: "New York", x: 168, y: 128, region: "Americas" },
  { id: "london", label: "London", x: 292, y: 108, region: "Europe" },
  { id: "dubai", label: "Dubai", x: 368, y: 168, region: "Middle East" },
  { id: "riyadh", label: "Riyadh", x: 356, y: 188, region: "Middle East" },
  { id: "islamabad", label: "Islamabad", x: 412, y: 148, region: "South Asia" },
] as const;

export function ContactPresence() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const focus = CITIES.find((c) => c.id === active);

  return (
    <section
      ref={ref}
      id="presence"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="contact-presence-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[560px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Global Presence
          </motion.p>
          <motion.h2
            id="contact-presence-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Operating across
            <span className="mt-1 block text-[#A8C5F0]/95">time zones.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[32rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scale 12x serves ambitious businesses worldwide — one partner,
            founder-led execution, wherever you build.
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.12)] bg-[#07101f]">
            <svg
              viewBox="0 0 600 320"
              className="h-auto w-full"
              role="img"
              aria-label="Scale 12x global locations"
            >
              <defs>
                <filter id={`cpr-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="1.8" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id={`cprGlow-${uid}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={ICE} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
                </radialGradient>
                <pattern
                  id={`cprGrid-${uid}`}
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 24 0 L 0 0 0 24"
                    fill="none"
                    stroke="rgba(168,197,240,0.06)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>

              <rect width="600" height="320" fill={`url(#cprGrid-${uid})`} />

              {/* Soft continents silhouette */}
              <motion.ellipse
                cx="300"
                cy="160"
                rx="240"
                ry="110"
                fill="none"
                stroke="rgba(168,197,240,0.12)"
                strokeWidth="1"
                strokeDasharray="4 8"
                animate={
                  inView && !reduced ? { rotate: 360 } : { rotate: 0 }
                }
                transition={{ duration: 140, ease: "linear", repeat: Infinity }}
                style={{ transformOrigin: "300px 160px" }}
              />
              <ellipse
                cx="300"
                cy="160"
                rx="200"
                ry="90"
                fill={`url(#cprGlow-${uid})`}
                opacity={0.35}
              />

              {/* Connection arcs */}
              {CITIES.map((c, i) => {
                const next = CITIES[(i + 1) % CITIES.length];
                return (
                  <motion.path
                    key={`arc-${c.id}`}
                    d={`M ${c.x} ${c.y} Q ${(c.x + next.x) / 2} ${Math.min(c.y, next.y) - 28} ${next.x} ${next.y}`}
                    fill="none"
                    stroke={
                      active === c.id || active === next.id
                        ? ICE
                        : "rgba(124,92,255,0.25)"
                    }
                    strokeWidth={active === c.id || active === next.id ? 1.2 : 0.7}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      inView
                        ? { pathLength: 1, opacity: 0.55 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{
                      duration: 1.2,
                      delay: 0.15 + i * 0.08,
                      ease: easeOutExpo,
                    }}
                  />
                );
              })}

              {CITIES.map((c, i) => {
                const isHot = active === c.id;
                return (
                  <g
                    key={c.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${c.label}, ${c.region}`}
                    onMouseEnter={() => setActive(c.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(c.id)}
                    onBlur={() => setActive(null)}
                    className="cursor-pointer outline-none"
                  >
                    {!reduced && inView && (
                      <motion.circle
                        cx={c.x}
                        cy={c.y}
                        r={isHot ? 18 : 14}
                        fill="none"
                        stroke={isHot ? ICE : PURPLE}
                        strokeWidth="0.8"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0.35, 0, 0.35],
                          r: isHot ? [14, 22, 14] : [10, 16, 10],
                        }}
                        transition={{
                          duration: 2.8,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <motion.circle
                      cx={c.x}
                      cy={c.y}
                      r={isHot ? 6 : 4.5}
                      fill="rgba(12,21,43,0.95)"
                      stroke={isHot ? ICE : PURPLE}
                      strokeWidth={isHot ? 1.5 : 1}
                      filter={`url(#cpr-${uid})`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0.2 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.45 }}
                      style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                    />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="1.8"
                      fill={isHot ? "#F5E9FF" : "#B8A4FF"}
                    />
                    <text
                      x={c.x}
                      y={c.y + 20}
                      textAnchor="middle"
                      fill={isHot ? "#F4F7FC" : "#9AA8C0"}
                      fontSize="9"
                      fontFamily="var(--font-space-grotesk), sans-serif"
                      letterSpacing="0.06em"
                    >
                      {c.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <motion.div
            key={focus?.id ?? "default"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="s12-surface rounded-[24px] p-7 md:p-8"
          >
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#6B7890]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {focus ? focus.region : "Network"}
            </p>
            <h3
              className="mt-3 text-[1.55rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.75rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              {focus ? focus.label : "One studio. Global reach."}
            </h3>
            <p
              className="mt-4 text-[14px] leading-[1.7] text-[#9AA8C0] md:text-[15px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {focus
                ? `Presence in ${focus.label} — connected to the same Scale 12x operating system across every market we serve.`
                : "Hover a city. New York, London, Dubai, Riyadh, and Islamabad share one standard of craft and accountability."}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                    onClick={() => setActive(c.id)}
                    className={`rounded-full border px-3 py-1 text-[11px] tracking-[0.06em] transition-[border-color,color,background] duration-300 ${
                      active === c.id
                        ? "border-[rgba(168,197,240,0.45)] bg-[rgba(168,197,240,0.08)] text-[#F4F7FC]"
                        : "border-[rgba(168,196,240,0.18)] text-[#A8C5F0]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
