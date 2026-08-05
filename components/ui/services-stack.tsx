"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type StackGroup = {
  id: string;
  label: string;
  layer: string;
  outcome: string;
  items: { name: string; role: string }[];
  accent: string;
};

const GROUPS: StackGroup[] = [
  {
    id: "ai",
    label: "AI",
    layer: "Intelligence",
    outcome: "Compress research and ops cycles without removing human judgment.",
    items: [
      { name: "OpenAI", role: "Model layer" },
      { name: "Anthropic", role: "Reasoning layer" },
      { name: "LangChain", role: "Orchestration" },
      { name: "Custom Agents", role: "In-product AI" },
      { name: "Vector DBs", role: "Memory" },
    ],
    accent: "#B8A4FF",
  },
  {
    id: "dev",
    label: "Development",
    layer: "Product surfaces",
    outcome: "Experiences fast enough to convert and clear enough to trust.",
    items: [
      { name: "Next.js", role: "App framework" },
      { name: "React", role: "Interface" },
      { name: "TypeScript", role: "Reliability" },
      { name: "Node.js", role: "Services" },
      { name: "Python", role: "Data & AI" },
    ],
    accent: "#6EB8E8",
  },
  {
    id: "cloud",
    label: "Cloud",
    layer: "Substrate",
    outcome: "Quiet infrastructure — growth gets loud without breaking trust.",
    items: [
      { name: "AWS", role: "Scale" },
      { name: "GCP", role: "Data gravity" },
      { name: "Vercel", role: "Edge delivery" },
      { name: "Cloudflare", role: "Performance" },
      { name: "Docker", role: "Portability" },
    ],
    accent: "#5B8DEF",
  },
  {
    id: "automation",
    label: "Automation",
    layer: "Operating cadence",
    outcome: "Strategy becomes weekly motion — not slide decks.",
    items: [
      { name: "n8n", role: "Workflows" },
      { name: "Make", role: "Integrations" },
      { name: "Zapier", role: "Speed" },
      { name: "HubSpot", role: "CRM rhythm" },
      { name: "Slack Ops", role: "Daily signal" },
    ],
    accent: "#7C5CFF",
  },
  {
    id: "analytics",
    label: "Analytics",
    layer: "Measurement",
    outcome: "Spend maps to outcomes — every cycle gets sharper.",
    items: [
      { name: "GA4", role: "Behavior" },
      { name: "Looker", role: "Decisioning" },
      { name: "Segment", role: "Identity" },
      { name: "Mixpanel", role: "Product" },
      { name: "BigQuery", role: "Warehouse" },
    ],
    accent: "#A8C5F0",
  },
  {
    id: "infra",
    label: "Infrastructure",
    layer: "Reliability",
    outcome: "Data, auth, and observability as growth prerequisites.",
    items: [
      { name: "PostgreSQL", role: "System of record" },
      { name: "Redis", role: "Speed" },
      { name: "Terraform", role: "Reproducibility" },
      { name: "Auth0", role: "Access" },
      { name: "Sentry", role: "Signal" },
    ],
    accent: "#9AA8C0",
  },
];

export function ServicesStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [active, setActive] = useState(0);
  const group = GROUPS[active];

  return (
    <section
      ref={ref}
      id="stack"
      className="relative scroll-mt-28 px-5 pb-10 pt-4 md:px-8 md:pb-14 md:pt-6"
      aria-labelledby="stack-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[520px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.65, ease: easeEditorial }}
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80 md:text-[12px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Chapter 06 · Instrumentation
            </motion.p>
            <motion.h2
              id="stack-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
              className="mt-4 text-[2.15rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.65rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Tools chosen for leverage.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="max-w-[28rem] text-[14px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Not logo wallpaper. Each layer exists so the Growth OS runs faster,
            clearer, and safer.
          </motion.p>
        </div>

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 md:mt-12 md:flex-wrap md:overflow-visible"
          role="tablist"
          aria-label="Technology categories"
        >
          {GROUPS.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.45,
                delay: 0.08 + i * 0.04,
                ease: easeOutExpo,
              }}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[12px] font-medium tracking-[0.08em] transition-[border-color,background,color] duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 ${
                active === i
                  ? "border-[rgba(184,164,255,0.45)] bg-[rgba(124,92,255,0.14)] text-[#F4F7FC]"
                  : "border-[rgba(168,196,240,0.12)] text-[#6B7890] hover:text-[#9AA8C0]"
              }`}
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {g.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeEditorial }}
          className="mt-8 overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.12)] bg-[rgba(10,18,36,0.55)]"
        >
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-[rgba(168,196,240,0.1)] p-7 md:border-b-0 md:border-r md:p-9">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: group.accent,
                }}
              >
                {group.layer}
              </p>
              <h3
                className="mt-4 text-[1.45rem] leading-snug tracking-[-0.025em] text-[#F4F7FC] md:text-[1.65rem]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {group.outcome}
              </h3>
            </div>
            <ul className="divide-y divide-[rgba(168,196,240,0.08)]">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 px-7 py-4 md:px-8"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: group.accent, opacity: 0.85 }}
                    />
                    <span
                      className="text-[14px] tracking-[0.03em] text-[#F4F7FC]/92"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    className="text-[11px] tracking-[0.08em] text-[#6B7890]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {item.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
