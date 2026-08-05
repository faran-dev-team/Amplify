"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const OUTCOMES = [
  {
    id: "reliability",
    title: "Higher Reliability",
    body: "Architectures designed for failure domains — so incidents stay contained and recoveries stay fast.",
    mark: "◎",
    metric: "Uptime",
  },
  {
    id: "cost",
    title: "Lower Operational Costs",
    body: "Automation and right-sized capacity replace firefighting and idle spend.",
    mark: "◇",
    metric: "Efficiency",
  },
  {
    id: "performance",
    title: "Better Performance",
    body: "Latency and throughput tuned to real bottlenecks — measured in production, not slides.",
    mark: "↗",
    metric: "Speed",
  },
  {
    id: "releases",
    title: "Faster Releases",
    body: "CI/CD and environments that make shipping predictable — cadence without chaos.",
    mark: "◆",
    metric: "Velocity",
  },
  {
    id: "scale",
    title: "Scalable Infrastructure",
    body: "Capacity that grows with demand — multi-region readiness without a rewrite.",
    mark: "⬡",
    metric: "Capacity",
  },
  {
    id: "security",
    title: "Improved Security",
    body: "Identity, encryption, and audit designed in — compliance that can be demonstrated.",
    mark: "▣",
    metric: "Trust",
  },
  {
    id: "continuity",
    title: "Business Continuity",
    body: "Disaster recovery that holds under pressure — RTO and RPO matched to risk.",
    mark: "◈",
    metric: "Resilience",
  },
  {
    id: "future",
    title: "Future-Ready Architecture",
    body: "Platforms that accept AI, new products, and new markets without panic rebuilds.",
    mark: "✦",
    metric: "Longevity",
  },
] as const;

export function CloudInfrastructureOutcomes() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      id="outcomes"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="ci-outcomes-heading"
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
            Business Outcomes
          </motion.p>
          <motion.h2
            id="ci-outcomes-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Not servers.
            <span className="mt-1 block text-[#A8C5F0]">Business confidence.</span>
          </motion.h2>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {OUTCOMES.map((o, i) => {
            const isHot = active === i;
            return (
              <motion.li
                key={o.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + i * 0.04,
                  ease: easeOutExpo,
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <article
                  tabIndex={0}
                  className={`h-full rounded-[22px] border p-6 transition-[border-color,background,transform,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:p-7 ${
                    isHot
                      ? "border-[rgba(168,197,240,0.38)] bg-[rgba(16,26,50,0.88)] shadow-[0_0_40px_rgba(168,197,240,0.08)] -translate-y-0.5"
                      : "border-[rgba(168,196,240,0.1)] bg-transparent"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`block text-[1.75rem] leading-none ${
                        isHot ? "text-[#A8C5F0]" : "text-[#4A5568]"
                      }`}
                      aria-hidden
                    >
                      {o.mark}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.18em] ${
                        isHot ? "text-[#A8C5F0]" : "text-[#4A5568]"
                      }`}
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {o.metric}
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-[1.25rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.3rem]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {o.title}
                  </h3>
                  <p
                    className="mt-3 text-[13px] leading-relaxed text-[#9AA8C0] md:text-[14px]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {o.body}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
