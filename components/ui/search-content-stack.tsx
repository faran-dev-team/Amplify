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
    label: "Google Search",
    detail: "The demand surface — where intent meets your ecosystem.",
    angle: -90,
    feeds: ["gsc", "ga4"],
  },
  {
    id: "gsc",
    label: "Search Console",
    detail: "Query and page performance that tells you what already wants you.",
    angle: -45,
    feeds: ["ga4", "ahrefs"],
  },
  {
    id: "ga4",
    label: "GA4",
    detail: "Behavioral truth — which organic paths convert and which waste attention.",
    angle: 0,
    feeds: ["dash", "analytics"],
  },
  {
    id: "ahrefs",
    label: "Ahrefs",
    detail: "Competitive maps, backlink graphs, and content gap intelligence.",
    angle: 45,
    feeds: ["semrush", "ai"],
  },
  {
    id: "semrush",
    label: "Semrush",
    detail: "Keyword and SERP intelligence that informs cluster prioritization.",
    angle: 90,
    feeds: ["ai", "dash"],
  },
  {
    id: "ai",
    label: "AI Research",
    detail: "Briefs, clustering, and opportunity scoring that compress discovery cycles.",
    angle: 135,
    feeds: ["dash", "google"],
  },
  {
    id: "analytics",
    label: "Analytics",
    detail: "Joined measurement across search, web, and pipeline outcomes.",
    angle: 180,
    feeds: ["dash", "ga4"],
  },
  {
    id: "dash",
    label: "Dashboards",
    detail: "Leadership views that answer: which organic investments produced revenue?",
    angle: 225,
    feeds: ["google", "gsc"],
  },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  };
}

export function SearchContentStack() {
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
      aria-labelledby="sc-stack-heading"
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
            Search Technology Ecosystem
          </motion.p>
          <motion.h2
            id="sc-stack-heading"
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
            Hover a node. Search platforms, research tools, analytics, and AI
            share one signal — so organic compounds instead of fragmenting.
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <svg
              viewBox="0 0 600 600"
              className="h-full w-full"
              role="img"
              aria-label="Search technology ecosystem"
            >
              <defs>
                <filter id={`sst-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id={`sstCore-${uid}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#5B8DEF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
                </radialGradient>
              </defs>

              <motion.circle
                cx={cx}
                cy={cy}
                r={195}
                fill="none"
                stroke="rgba(168,197,240,0.2)"
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
                    stroke={isHot || isRel ? "#A8C5F0" : PURPLE}
                    strokeWidth={isHot ? 1.5 : 0.7}
                    strokeLinecap="round"
                    filter={`url(#sst-${uid})`}
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
                fill={`url(#sstCore-${uid})`}
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
                letterSpacing="0.12em"
              >
                SEARCH STACK
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
                      stroke={isHot || isRel ? "#A8C5F0" : PURPLE}
                      strokeWidth={isHot ? 1.5 : 1}
                      filter={`url(#sst-${uid})`}
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
                : "Search Console informs strategy. Research tools map opportunity. Analytics proves conversion. Dashboards decide. AI compresses the next research cycle. The stack is one organism."}
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
                      className="rounded-full border border-[rgba(168,197,240,0.28)] px-3 py-1 text-[11px] tracking-[0.06em] text-[#A8C5F0]"
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
