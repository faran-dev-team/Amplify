"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PURPLE = "#7C5CFF";
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Node = {
  id: string;
  label: string;
  detail: string;
  angle: number;
  feeds: string[];
};

const NODES: Node[] = [
  {
    id: "google",
    label: "Google Ads",
    detail: "Intent demand — search and performance max wired to revenue events.",
    angle: -90,
    feeds: ["ga4", "crm"],
  },
  {
    id: "meta",
    label: "Meta",
    detail: "Social acquisition with creative systems and conversion APIs.",
    angle: -45,
    feeds: ["ga4", "tracking"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "B2B pipeline channels joined to CRM opportunity stages.",
    angle: 0,
    feeds: ["crm", "dash"],
  },
  {
    id: "ga4",
    label: "GA4",
    detail: "Behavioral signal that informs creative, landing, and budget decisions.",
    angle: 45,
    feeds: ["tracking", "ai"],
  },
  {
    id: "crm",
    label: "CRM",
    detail: "Closed-loop outcomes — so marketing optimizes for revenue, not MQLs alone.",
    angle: 90,
    feeds: ["dash", "ai"],
  },
  {
    id: "tracking",
    label: "Server-side Tracking",
    detail: "Durable measurement when cookies and pixels fail.",
    angle: 135,
    feeds: ["ga4", "ai"],
  },
  {
    id: "dash",
    label: "Dashboards",
    detail: "Leadership views that answer: what produced revenue this week?",
    angle: 180,
    feeds: ["ai", "google"],
  },
  {
    id: "ai",
    label: "AI Insights",
    detail: "Pattern detection and budget recommendations across the stack.",
    angle: 225,
    feeds: ["google", "meta"],
  },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  };
}

export function PerformanceMarketingStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const cx = 300;
  const cy = 300;
  const focus = NODES.find((n) => n.id === hovered);
  const related = new Set(focus?.feeds ?? []);

  return (
    <section
      ref={ref}
      id="stack"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="pm-stack-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[680px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Marketing Technology Ecosystem
          </motion.p>
          <motion.h2
            id="pm-stack-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            One infrastructure.
            <span className="mt-1 block text-[#B8A4FF]/95">
              Not a logo wall.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Hover a node. Platforms, measurement, CRM, and AI share one signal —
            so acquisition compounds instead of fragmenting.
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <svg
              viewBox="0 0 600 600"
              className="h-full w-full"
              role="img"
              aria-label="Marketing technology ecosystem"
            >
              <defs>
                <filter id={`pms-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id={`pmsCore-${uid}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.45" />
                  <stop offset="50%" stopColor={PURPLE} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
                </radialGradient>
              </defs>

              <motion.circle
                cx={cx}
                cy={cy}
                r={195}
                fill="none"
                stroke="rgba(184,164,255,0.18)"
                strokeWidth="0.8"
                strokeDasharray="2 8"
                animate={inView && !reduced ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 100, ease: "linear", repeat: Infinity }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {NODES.map((node, i) => {
                const tip = polar(cx, cy, 170, node.angle);
                const isHot = hovered === node.id;
                const isRel = related.has(node.id);
                const dim = hovered && !isHot && !isRel;
                return (
                  <motion.line
                    key={`s-${node.id}`}
                    x1={cx}
                    y1={cy}
                    x2={tip.x}
                    y2={tip.y}
                    stroke={isHot || isRel ? "#B8A4FF" : PURPLE}
                    strokeWidth={isHot ? 1.5 : 0.7}
                    strokeLinecap="round"
                    filter={`url(#pms-${uid})`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: inView
                        ? dim
                          ? 0.05
                          : isHot
                            ? 0.7
                            : isRel
                              ? 0.4
                              : 0.15
                        : 0,
                    }}
                    transition={{ duration: 0.35, delay: hovered ? 0 : 0.1 + i * 0.03 }}
                  />
                );
              })}

              {focus?.feeds.map((fid) => {
                const t = NODES.find((n) => n.id === fid);
                if (!t) return null;
                const a = polar(cx, cy, 170, focus.angle);
                const b = polar(cx, cy, 170, t.angle);
                return (
                  <motion.line
                    key={`x-${fid}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#6EB8E8"
                    strokeWidth="1"
                    strokeDasharray="4 5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  />
                );
              })}

              <motion.circle
                cx={cx}
                cy={cy}
                r={42}
                fill={`url(#pmsCore-${uid})`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0.3 }}
                transition={{ duration: 0.9, ease: easeOutExpo }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
              <circle cx={cx} cy={cy} r={3} fill="#D4C8FF" />
              <text
                x={cx}
                y={cy + 62}
                textAnchor="middle"
                fill="#F4F7FC"
                fontSize="10"
                fontFamily="var(--font-space-grotesk), sans-serif"
                letterSpacing="0.14em"
              >
                MARTECH
              </text>

              {NODES.map((node, i) => {
                const p = polar(cx, cy, 170, node.angle);
                const isHot = hovered === node.id;
                const isRel = related.has(node.id);
                const dim = hovered && !isHot && !isRel;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${p.x},${p.y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label}: ${node.detail}`}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(node.id)}
                    onBlur={() => setHovered(null)}
                    className="cursor-pointer outline-none"
                    style={{ opacity: dim ? 0.25 : 1 }}
                  >
                    <motion.circle
                      r={isHot ? 12 : 9}
                      fill="rgba(12,21,43,0.95)"
                      stroke={isHot || isRel ? "#B8A4FF" : PURPLE}
                      strokeWidth={isHot ? 1.5 : 1}
                      filter={`url(#pms-${uid})`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0.2 }}
                      transition={{ delay: 0.2 + i * 0.04, duration: 0.45 }}
                    />
                    <circle r="2" fill={isHot ? "#F5E9FF" : "#B8A4FF"} />
                    <text
                      y="24"
                      textAnchor="middle"
                      fill={isHot ? "#F4F7FC" : "#9AA8C0"}
                      fontSize="8"
                      fontFamily="var(--font-space-grotesk), sans-serif"
                    >
                      {node.label}
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
              {focus ? "Connected layer" : "Infrastructure principle"}
            </p>
            <h3
              className="mt-3 text-[1.55rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.75rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              {focus ? focus.label : "Measurement that closes the loop."}
            </h3>
            <p
              className="mt-4 text-[14px] leading-[1.7] text-[#9AA8C0] md:text-[15px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {focus
                ? focus.detail
                : "Ads platforms feed analytics. Analytics joins CRM. Server-side tracking protects signal. Dashboards decide. AI reallocates. The stack is one organism — not eight tools."}
            </p>
            {focus && (
              <div className="mt-5 flex flex-wrap gap-2">
                {focus.feeds.map((fid) => {
                  const n = NODES.find((x) => x.id === fid);
                  return (
                    <button
                      key={fid}
                      type="button"
                      onMouseEnter={() => setHovered(fid)}
                      className="rounded-full border border-[rgba(184,164,255,0.28)] px-3 py-1 text-[11px] tracking-[0.06em] text-[#B8A4FF]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      → {n?.label}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
