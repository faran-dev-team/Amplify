"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Layer = {
  id: string;
  label: string;
  detail: string;
  feeds: string;
};

const LAYERS: Layer[] = [
  {
    id: "signals",
    label: "Search Signals",
    detail: "Queries, SERP features, competitors, and conversion paths unified into one feed.",
    feeds: "Grounds every decision.",
  },
  {
    id: "opportunities",
    label: "Content Opportunities",
    detail: "Gaps where demand exists and your ecosystem has a right to win.",
    feeds: "Prioritizes effort.",
  },
  {
    id: "intent",
    label: "Intent Prediction",
    detail: "Models that forecast what seekers need next — before the calendar fills with noise.",
    feeds: "Anticipates demand.",
  },
  {
    id: "clusters",
    label: "Topic Clustering",
    detail: "AI-assisted maps that turn keywords into coherent topical gravity.",
    feeds: "Builds ecosystems.",
  },
  {
    id: "authority",
    label: "Authority Mapping",
    detail: "Who earns trust in your category — and which relationships move the needle.",
    feeds: "Targets influence.",
  },
  {
    id: "optimize",
    label: "Optimization",
    detail: "Refresh, expand, prune — continuous improvement driven by performance signal.",
    feeds: "Compounds gains.",
  },
];

export function SearchContentAi() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [active, setActive] = useState(0);
  const uid = useId().replace(/:/g, "");
  const layer = LAYERS[active];

  return (
    <section
      ref={ref}
      id="ai-layer"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="sc-ai-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[640px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            AI Search Intelligence
          </motion.p>
          <motion.h2
            id="sc-ai-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Research that never sleeps.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Hover each layer. AI compresses discovery — humans keep judgment,
            voice, and strategic taste.
          </motion.p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative">
            <svg
              viewBox="0 0 480 380"
              className="mx-auto h-auto w-full max-w-[480px]"
              role="img"
              aria-label="AI search intelligence layers"
            >
              <defs>
                <filter id={`sai-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id={`saiLine-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(91,141,239,0.55)" />
                  <stop offset="100%" stopColor="rgba(124,92,255,0.4)" />
                </linearGradient>
              </defs>

              <motion.line
                x1="48"
                y1="28"
                x2="48"
                y2="352"
                stroke={`url(#saiLine-${uid})`}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.2, ease: easeOutExpo }}
              />

              {LAYERS.map((l, i) => {
                const y = 42 + i * 54;
                const isHot = active === i;
                const isPast = i < active;
                return (
                  <g
                    key={l.id}
                    tabIndex={0}
                    role="button"
                    aria-label={l.label}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="cursor-pointer outline-none"
                  >
                    <motion.circle
                      cx="48"
                      cy={y}
                      r={isHot ? 8 : 6}
                      fill="rgba(12,21,43,0.95)"
                      stroke={
                        isHot
                          ? "#A8C5F0"
                          : isPast
                            ? "#5B8DEF"
                            : "rgba(168,196,240,0.35)"
                      }
                      strokeWidth={isHot ? 1.6 : 1}
                      filter={isHot ? `url(#sai-${uid})` : undefined}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={inView ? { opacity: 1, scale: 1 } : undefined}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    />
                    <circle
                      cx="48"
                      cy={y}
                      r="2"
                      fill={isHot ? "#F5E9FF" : isPast ? "#A8C5F0" : "#6B7890"}
                    />

                    <motion.rect
                      x="72"
                      y={y - 16}
                      height="32"
                      rx="10"
                      fill={
                        isHot ? "rgba(16,26,50,0.95)" : "rgba(12,21,43,0.4)"
                      }
                      stroke={
                        isHot
                          ? "rgba(168,197,240,0.4)"
                          : "rgba(168,196,240,0.1)"
                      }
                      strokeWidth="1"
                      initial={{ width: 180, opacity: 0 }}
                      animate={
                        inView
                          ? {
                              width: isHot ? 360 : 200 + i * 12,
                              opacity: isHot ? 1 : 0.55,
                            }
                          : undefined
                      }
                      transition={{ duration: 0.4, ease: easeEditorial }}
                    />
                    <text
                      x="88"
                      y={y + (isHot ? -2 : 1)}
                      dominantBaseline="middle"
                      fill={isHot ? "#F4F7FC" : "#9AA8C0"}
                      fontSize="13"
                      fontFamily="var(--font-playfair), 'Playfair Display', serif"
                    >
                      {l.label}
                    </text>
                    {isHot && (
                      <text
                        x="88"
                        y={y + 12}
                        fill="#A8C5F0"
                        fontSize="8.5"
                        fontFamily="var(--font-space-grotesk), sans-serif"
                        letterSpacing="0.06em"
                      >
                        {l.feeds}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="s12-surface rounded-[24px] p-7 md:sticky md:top-32 md:p-8"
          >
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#6B7890]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Layer 0{active + 1} · {LAYERS.length}
            </p>
            <h3
              className="mt-3 text-[1.65rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.85rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              {layer.label}
            </h3>
            <p
              className="mt-4 text-[14px] leading-[1.7] text-[#9AA8C0] md:text-[15px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {layer.detail}
            </p>
            <p
              className="mt-5 text-[13px] tracking-[0.04em] text-[#A8C5F0]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {layer.feeds}
            </p>

            {active < LAYERS.length - 1 && (
              <button
                type="button"
                onClick={() => setActive(active + 1)}
                className="group mt-8 inline-flex items-center gap-2 text-[13px] text-[#9AA8C0] transition-colors hover:text-[#F4F7FC]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Next: {LAYERS[active + 1].label}
                <span
                  aria-hidden
                  className="text-[#5B8DEF] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
