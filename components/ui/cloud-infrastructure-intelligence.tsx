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
    id: "traffic",
    label: "Traffic Patterns",
    detail: "Request volume, regions, and peaks become a living map — not a monthly spreadsheet.",
    feeds: "Sees demand as it forms.",
  },
  {
    id: "monitor",
    label: "Monitoring",
    detail: "Latency, errors, and saturation watched against SLOs that map to user impact.",
    feeds: "Turns noise into signal.",
  },
  {
    id: "anomaly",
    label: "Anomaly Detection",
    detail: "Deviations surface before outages — models trained on your baseline, not generic alerts.",
    feeds: "Catches drift early.",
  },
  {
    id: "scale",
    label: "Predictive Scaling",
    detail: "Capacity moves ahead of demand — so growth feels smooth instead of emergency.",
    feeds: "Prepares for load.",
  },
  {
    id: "optimize",
    label: "Resource Optimization",
    detail: "Right-sized compute and storage — performance kept, waste removed.",
    feeds: "Protects the margin.",
  },
  {
    id: "insights",
    label: "Performance Insights",
    detail: "Bottlenecks ranked by business impact — so engineering time goes where it pays.",
    feeds: "Focuses the team.",
  },
  {
    id: "improve",
    label: "Continuous Improvement",
    detail: "Every cycle feeds architecture — infrastructure that gets sharper with the business.",
    feeds: "Compounds reliability.",
  },
];

export function CloudInfrastructureIntelligence() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [active, setActive] = useState(0);
  const uid = useId().replace(/:/g, "");
  const layer = LAYERS[active];

  return (
    <section
      ref={ref}
      id="intelligence"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="ci-intel-heading"
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
            Infrastructure Intelligence Layer
          </motion.p>
          <motion.h2
            id="ci-intel-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Infrastructure that learns
            <span className="mt-1 block text-[#A8C5F0]">while it runs.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Hover each layer. AI doesn&apos;t replace operators — it compresses
            the loop from signal to safer scale.
          </motion.p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative">
            <svg
              viewBox="0 0 480 420"
              className="mx-auto h-auto w-full max-w-[480px]"
              role="img"
              aria-label="Infrastructure intelligence layers"
            >
              <defs>
                <filter id={`cii-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id={`ciiLine-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(168,197,240,0.55)" />
                  <stop offset="100%" stopColor="rgba(124,92,255,0.4)" />
                </linearGradient>
              </defs>

              <motion.line
                x1="48"
                y1="28"
                x2="48"
                y2="392"
                stroke={`url(#ciiLine-${uid})`}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.2, ease: easeOutExpo }}
              />

              {LAYERS.map((l, i) => {
                const y = 40 + i * 52;
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
                            ? "#7C5CFF"
                            : "rgba(168,196,240,0.35)"
                      }
                      strokeWidth={isHot ? 1.6 : 1}
                      filter={isHot ? `url(#cii-${uid})` : undefined}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={inView ? { opacity: 1, scale: 1 } : undefined}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                    />
                    <circle
                      cx="48"
                      cy={y}
                      r="2"
                      fill={isHot ? "#F5E9FF" : isPast ? "#B8A4FF" : "#6B7890"}
                    />

                    <motion.rect
                      x="72"
                      y={y - 16}
                      height="32"
                      rx="8"
                      fill={
                        isHot
                          ? "rgba(16,26,50,0.95)"
                          : "rgba(12,21,43,0.4)"
                      }
                      stroke={
                        isHot
                          ? "rgba(168,197,240,0.4)"
                          : "rgba(168,196,240,0.12)"
                      }
                      strokeWidth="1"
                      initial={{ width: 0, opacity: 0 }}
                      animate={
                        inView
                          ? { width: isHot ? 360 : 280, opacity: 1 }
                          : undefined
                      }
                      transition={{ duration: 0.45, ease: easeOutExpo }}
                    />
                    <text
                      x="88"
                      y={y + 5}
                      fill={isHot ? "#F4F7FC" : "#9AA8C0"}
                      fontSize="13"
                      fontFamily="var(--font-space-grotesk), sans-serif"
                    >
                      {l.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeEditorial }}
            className="s12-surface sticky top-28 rounded-[24px] p-7 md:p-8"
          >
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#6B7890]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Layer {String(active + 1).padStart(2, "0")} · {layer.feeds}
            </p>
            <h3
              className="mt-3 text-[1.55rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.75rem]"
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
            <button
              type="button"
              onClick={() => setActive((active + 1) % LAYERS.length)}
              className="mt-6 inline-flex items-center gap-2 text-[13px] tracking-[0.04em] text-[#A8C5F0] transition-colors hover:text-[#F4F7FC]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Next layer
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
