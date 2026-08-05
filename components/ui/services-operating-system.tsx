"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PURPLE = "#7C5CFF";
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HubNode = {
  id: string;
  label: string;
  outcome: string;
  feeds: string[];
  angle: number;
  ring: 1 | 2;
};

const NODES: HubNode[] = [
  {
    id: "paid",
    label: "Paid Media",
    outcome: "Predictable pipeline without channel silos competing for credit.",
    feeds: ["analytics", "brand", "content"],
    angle: -18,
    ring: 1,
  },
  {
    id: "content",
    label: "Content",
    outcome: "Authority that turns into inbound demand — continuously.",
    feeds: ["search", "paid", "brand"],
    angle: 28,
    ring: 2,
  },
  {
    id: "search",
    label: "Search",
    outcome: "Durable organic growth that compounds after paid spend pauses.",
    feeds: ["content", "analytics", "ai"],
    angle: 72,
    ring: 1,
  },
  {
    id: "brand",
    label: "Brand",
    outcome: "Positioning sharp enough that every channel sells the same truth.",
    feeds: ["content", "paid", "transform"],
    angle: 118,
    ring: 2,
  },
  {
    id: "ai",
    label: "Generative AI",
    outcome: "Faster research, creative, and ops — humans keep judgment.",
    feeds: ["analytics", "cloud", "transform"],
    angle: 162,
    ring: 1,
  },
  {
    id: "cloud",
    label: "Cloud & Data",
    outcome: "Infrastructure that keeps growth from outrunning trust.",
    feeds: ["ai", "analytics", "transform"],
    angle: 208,
    ring: 2,
  },
  {
    id: "transform",
    label: "Transformation",
    outcome: "One accountable system instead of five vendor handoffs.",
    feeds: ["ai", "cloud", "brand"],
    angle: 252,
    ring: 1,
  },
  {
    id: "analytics",
    label: "Analytics",
    outcome: "Spend maps to outcomes — so every cycle gets sharper.",
    feeds: ["paid", "search", "ai"],
    angle: 298,
    ring: 2,
  },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  // Round to avoid SSR/client float mismatches (hydration)
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  };
}

function EcosystemViz({
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
  const activeNode = NODES.find((n) => n.id === hovered);
  const related = new Set(activeNode?.feeds ?? []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        role="img"
        aria-label="Scale 12x Growth Operating System — connected capabilities"
      >
        <defs>
          <filter id={`osBloom-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`osCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.5" />
            <stop offset="45%" stopColor={PURPLE} stopOpacity="0.28" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`osRing-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#5B8DEF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B8A4FF" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {[210, 155].map((r, i) => (
          <motion.circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={`url(#osRing-${uid})`}
            strokeWidth={0.8}
            strokeDasharray={i === 0 ? "2 8" : "1 6"}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              active
                ? { opacity: 0.45, scale: 1 }
                : { opacity: 0.15, scale: 0.96 }
            }
            transition={{ duration: 1.1, delay: 0.15 * i, ease: easeEditorial }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        {/* Cross-links between related practices when focused */}
        {activeNode &&
          activeNode.feeds.map((fid) => {
            const target = NODES.find((n) => n.id === fid);
            if (!target) return null;
            const a = polar(
              cx,
              cy,
              activeNode.ring === 1 ? 155 : 210,
              activeNode.angle
            );
            const b = polar(cx, cy, target.ring === 1 ? 155 : 210, target.angle);
            return (
              <motion.line
                key={`link-${fid}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#B8A4FF"
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="4 6"
                filter={`url(#osBloom-${uid})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.35 }}
              />
            );
          })}

        {NODES.map((node, i) => {
          const r = node.ring === 1 ? 155 : 210;
          const tip = polar(cx, cy, r, node.angle);
          const isFocus = hovered === node.id;
          const isRelated = related.has(node.id);
          const dimmed = hovered !== null && !isFocus && !isRelated;
          return (
            <motion.line
              key={`spoke-${node.id}`}
              x1={cx}
              y1={cy}
              x2={tip.x}
              y2={tip.y}
              stroke={isFocus || isRelated ? "#B8A4FF" : PURPLE}
              strokeWidth={isFocus ? 1.6 : isRelated ? 1.1 : 0.7}
              strokeLinecap="round"
              filter={`url(#osBloom-${uid})`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: active
                  ? dimmed
                    ? 0.05
                    : isFocus
                      ? 0.65
                      : isRelated
                        ? 0.35
                        : 0.16
                  : 0,
              }}
              transition={{ duration: 0.4, delay: hovered ? 0 : 0.2 + i * 0.04 }}
            />
          );
        })}

        <motion.circle
          cx={cx}
          cy={cy}
          r={54}
          fill={`url(#osCore-${uid})`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.85 }}
          transition={{ duration: 1, ease: easeOutExpo }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={28}
          fill="none"
          stroke={PURPLE}
          strokeWidth={1.2}
          filter={`url(#osBloom-${uid})`}
          initial={{ opacity: 0 }}
          animate={
            active && !reduced
              ? { opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }
              : { opacity: active ? 0.45 : 0 }
          }
          transition={
            active && !reduced
              ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6 }
          }
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <circle cx={cx} cy={cy} r={4} fill="#D4C8FF" />
        <text
          x={cx}
          y={cy + 78}
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="13"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.18em"
        >
          SCALE 12X
        </text>

        {NODES.map((node, i) => {
          const r = node.ring === 1 ? 155 : 210;
          const p = polar(cx, cy, r, node.angle);
          const isHot = hovered === node.id;
          const isRelated = related.has(node.id);
          const dimmed = hovered !== null && !isHot && !isRelated;
          return (
            <g
              key={node.id}
              transform={`translate(${p.x}, ${p.y})`}
              onMouseEnter={() => onHover(node.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(node.id)}
              onBlur={() => onHover(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.outcome}`}
              className="cursor-pointer outline-none focus-visible:opacity-100"
              style={{ opacity: dimmed ? 0.28 : 1 }}
            >
              <motion.circle
                r={isHot ? 14 : isRelated ? 11 : 10}
                fill="rgba(12,21,43,0.92)"
                stroke={isHot || isRelated ? "#B8A4FF" : PURPLE}
                strokeWidth={isHot ? 1.5 : 1}
                filter={`url(#osBloom-${uid})`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={
                  active
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0.2, scale: 0.6 }
                }
                transition={{
                  duration: 0.55,
                  delay: 0.35 + i * 0.05,
                  ease: easeEditorial,
                }}
              />
              <circle r={2.2} fill={isHot ? "#F5E9FF" : "#B8A4FF"} />
              <text
                y={isHot ? 28 : 26}
                textAnchor="middle"
                fill={isHot ? "#F4F7FC" : isRelated ? "#B8A4FF" : "#9AA8C0"}
                fontSize="10"
                fontFamily="var(--font-space-grotesk), sans-serif"
                letterSpacing="0.06em"
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

export function ServicesOperatingSystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: false });
  const [hovered, setHovered] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.id === hovered) ?? null;

  return (
    <section
      ref={ref}
      id="operating-system"
      className="relative scroll-mt-28 px-5 pb-8 pt-4 md:px-8 md:pb-12 md:pt-6"
      aria-labelledby="os-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[680px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80 md:text-[12px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Chapter 01 · Architecture
          </motion.p>
          <motion.h2
            id="os-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl lg:text-[3.65rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Everything compounds.
            <span className="mt-1 block text-[#B8A4FF]/95">Nothing works alone.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Inspect any practice. Watch what it feeds. Growth becomes structural
            when brand, demand, intelligence, and infrastructure share one signal.
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <EcosystemViz
            active={inView}
            hovered={hovered}
            onHover={setHovered}
          />

          <div className="relative min-h-[220px]">
            <motion.div
              key={activeNode?.id ?? "default"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeEditorial }}
              className="s12-surface rounded-[24px] p-7 md:p-8"
            >
              <p
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6B7890]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {activeNode ? "Business outcome" : "Operating principle"}
              </p>
              <h3
                className="mt-3 text-[1.55rem] leading-snug tracking-[-0.025em] text-[#F4F7FC] md:text-[1.75rem]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {activeNode
                  ? activeNode.label
                  : "One Partner. Every Channel."}
              </h3>
              <p
                className="mt-4 text-[14px] leading-[1.7] text-[#9AA8C0] md:text-[15px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {activeNode
                  ? activeNode.outcome
                  : "Hover a node to see the outcome it creates — and which practices it strengthens. This is not a menu. It is a compounding loop."}
              </p>

              {activeNode ? (
                <div className="mt-6">
                  <p
                    className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6B7890]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Feeds into
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.feeds.map((fid) => {
                      const n = NODES.find((x) => x.id === fid);
                      return (
                        <button
                          key={fid}
                          type="button"
                          onMouseEnter={() => setHovered(fid)}
                          onFocus={() => setHovered(fid)}
                          className="rounded-full border border-[rgba(184,164,255,0.28)] bg-[rgba(124,92,255,0.08)] px-3 py-1 text-[11px] tracking-[0.06em] text-[#B8A4FF] transition-colors hover:border-[rgba(184,164,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                          style={{
                            fontFamily: "var(--font-space-grotesk), sans-serif",
                          }}
                        >
                          {n?.label ?? fid}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Unified ownership", "Shared instrumentation", "Founder-led"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(168,196,240,0.14)] px-3 py-1 text-[11px] tracking-[0.08em] text-[#9AA8C0]"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
