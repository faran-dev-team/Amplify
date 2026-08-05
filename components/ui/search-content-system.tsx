"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PURPLE = "#7C5CFF";
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Node = {
  id: string;
  label: string;
  outcome: string;
  angle: number;
  feeds: string[];
};

const NODES: Node[] = [
  {
    id: "intent",
    label: "Customer Intent",
    outcome: "Jobs, questions, and decision triggers that define what content must earn.",
    angle: -90,
    feeds: ["keywords", "content"],
  },
  {
    id: "keywords",
    label: "Keyword Intelligence",
    outcome: "Opportunity maps grounded in demand, difficulty, and commercial value — not vanity volume.",
    angle: -38,
    feeds: ["content", "technical"],
  },
  {
    id: "content",
    label: "Content Strategy",
    outcome: "Topic ecosystems that own a category — clusters, pillars, and proof sequences.",
    angle: 14,
    feeds: ["technical", "authority"],
  },
  {
    id: "technical",
    label: "Technical SEO",
    outcome: "Crawlability, speed, structure, and indexation that let strategy actually surface.",
    angle: 66,
    feeds: ["authority", "analytics"],
  },
  {
    id: "authority",
    label: "Authority",
    outcome: "Earned trust signals — digital PR, mentions, and relationships that move rankings sustainably.",
    angle: 118,
    feeds: ["analytics", "optimize"],
  },
  {
    id: "analytics",
    label: "Analytics",
    outcome: "Search Console, GA4, and CRM joins that show which organic paths produce revenue.",
    angle: 170,
    feeds: ["optimize", "intent"],
  },
  {
    id: "optimize",
    label: "Continuous Optimization",
    outcome: "Refresh, expand, prune — the ecosystem gets sharper every quarter.",
    angle: 222,
    feeds: ["intent", "keywords"],
  },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  };
}

function SystemViz({
  active,
  hovered,
  onHover,
}: {
  active: boolean;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion();
  const cx = 300;
  const cy = 300;
  const focus = NODES.find((n) => n.id === hovered);
  const related = new Set(focus?.feeds ?? []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        role="img"
        aria-label="Search Intelligence System — connected organic growth stages"
      >
        <defs>
          <filter id={`scs-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`scsCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#5B8DEF" stopOpacity="0.28" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx={cx}
          cy={cy}
          r={200}
          fill="none"
          stroke="rgba(168,197,240,0.22)"
          strokeWidth="0.8"
          strokeDasharray="2 8"
          animate={active && !reduced ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        <motion.circle
          cx={cx}
          cy={cy}
          r={175}
          fill="none"
          stroke="rgba(124,92,255,0.12)"
          strokeWidth="0.6"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
        />

        {NODES.map((node, i) => {
          const tip = polar(cx, cy, 175, node.angle);
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
              strokeWidth={isHot ? 1.6 : 0.7}
              strokeLinecap="round"
              filter={`url(#scs-${uid})`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: active
                  ? dim
                    ? 0.05
                    : isHot
                      ? 0.7
                      : isRel
                        ? 0.4
                        : 0.16
                  : 0,
              }}
              transition={{ duration: 0.35, delay: hovered ? 0 : 0.12 + i * 0.03 }}
            />
          );
        })}

        {focus?.feeds.map((fid) => {
          const t = NODES.find((n) => n.id === fid);
          if (!t) return null;
          const a = polar(cx, cy, 175, focus.angle);
          const b = polar(cx, cy, 175, t.angle);
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
          r={48}
          fill={`url(#scsCore-${uid})`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.3 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <circle cx={cx} cy={cy} r={3.5} fill="#D4C8FF" />
        <text
          x={cx}
          y={cy + 70}
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="11"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.12em"
        >
          SEARCH OS
        </text>

        {NODES.map((node, i) => {
          const p = polar(cx, cy, 175, node.angle);
          const isHot = hovered === node.id;
          const isRel = related.has(node.id);
          const dim = hovered && !isHot && !isRel;
          return (
            <g
              key={node.id}
              transform={`translate(${p.x},${p.y})`}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.outcome}`}
              onMouseEnter={() => onHover(node.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(node.id)}
              onBlur={() => onHover(null)}
              className="cursor-pointer outline-none"
              style={{ opacity: dim ? 0.25 : 1 }}
            >
              <motion.circle
                r={isHot ? 13 : 10}
                fill="rgba(12,21,43,0.95)"
                stroke={isHot || isRel ? "#A8C5F0" : PURPLE}
                strokeWidth={isHot ? 1.5 : 1}
                filter={`url(#scs-${uid})`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.2 }}
                transition={{ delay: 0.25 + i * 0.04, duration: 0.45 }}
              />
              <circle r="2" fill={isHot ? "#F5E9FF" : "#B8A4FF"} />
              <text
                y="26"
                textAnchor="middle"
                fill={isHot ? "#F4F7FC" : "#9AA8C0"}
                fontSize="8.5"
                fontFamily="var(--font-space-grotesk), sans-serif"
                letterSpacing="0.02em"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function SearchContentSystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });
  const [hovered, setHovered] = useState<string | null>(null);
  const node = NODES.find((n) => n.id === hovered);

  return (
    <section
      ref={ref}
      id="system"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="sc-system-heading"
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
            Search Intelligence System
          </motion.p>
          <motion.h2
            id="sc-system-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Organic growth as an operating system.
            <span className="mt-1 block text-[#B8A4FF]/95">
              Not a content calendar.
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
            Hover a stage. Watch what it feeds. Authority only compounds when
            intent, content, technical health, and analytics share one signal.
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <SystemViz active={inView} hovered={hovered} onHover={setHovered} />
          <motion.div
            key={node?.id ?? "default"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="s12-surface rounded-[24px] p-7 md:p-8"
          >
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-[#6B7890]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {node ? "Strategic outcome" : "System principle"}
            </p>
            <h3
              className="mt-3 text-[1.55rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.75rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              {node ? node.label : "Ecosystems over articles."}
            </h3>
            <p
              className="mt-4 text-[14px] leading-[1.7] text-[#9AA8C0] md:text-[15px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {node
                ? node.outcome
                : "Intent defines keywords. Keywords shape content strategy. Technical SEO surfaces it. Authority amplifies it. Analytics proves what produces pipeline — then optimization sharpens the next cycle."}
            </p>
            {node && (
              <div className="mt-5 flex flex-wrap gap-2">
                {node.feeds.map((fid) => {
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
