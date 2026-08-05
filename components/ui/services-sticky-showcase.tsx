"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const PURPLE = "#7C5CFF";
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

type ShowcaseBeat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  glow: string;
  nodes: { label: string; x: number; y: number }[];
};

const BEATS: ShowcaseBeat[] = [
  {
    id: "signal",
    eyebrow: "01 · Signal",
    title: "Strategy becomes signal.",
    body: "Positioning and ICP clarity encode into every channel — so paid, content, and product stop inventing competing stories.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.35)",
    nodes: [
      { label: "ICP", x: 28, y: 32 },
      { label: "Position", x: 62, y: 24 },
      { label: "Narrative", x: 48, y: 58 },
    ],
  },
  {
    id: "demand",
    eyebrow: "02 · Demand",
    title: "Demand strengthens demand.",
    body: "Paid, search, and content share instrumentation and creative systems. Each channel makes the next one smarter.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    nodes: [
      { label: "Paid", x: 22, y: 40 },
      { label: "Search", x: 50, y: 22 },
      { label: "Content", x: 72, y: 48 },
      { label: "CRM", x: 48, y: 68 },
    ],
  },
  {
    id: "intelligence",
    eyebrow: "03 · Intelligence",
    title: "AI accelerates the loop.",
    body: "Agents compress research, creative, and ops cycles — humans keep judgment. Speed without losing taste.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.4)",
    nodes: [
      { label: "Agents", x: 35, y: 28 },
      { label: "Workflows", x: 68, y: 36 },
      { label: "Review", x: 44, y: 64 },
    ],
  },
  {
    id: "infrastructure",
    eyebrow: "04 · Infrastructure",
    title: "Friction leaves the system.",
    body: "Cloud, data, web, and security form the substrate. Ambition no longer stalls on tooling or trust.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    nodes: [
      { label: "Cloud", x: 26, y: 36 },
      { label: "Data", x: 55, y: 24 },
      { label: "Web", x: 70, y: 52 },
      { label: "Secure", x: 40, y: 68 },
    ],
  },
  {
    id: "compound",
    eyebrow: "05 · Compound",
    title: "Scale becomes structural.",
    body: "Weekly cadence. Shared truth. Founder-led when it matters. The OS keeps learning — growth stops being seasonal.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    nodes: [
      { label: "Cadence", x: 32, y: 30 },
      { label: "Insight", x: 64, y: 28 },
      { label: "Scale", x: 50, y: 62 },
    ],
  },
];

function ShowcaseVisual({
  beat,
  progress,
}: {
  beat: ShowcaseBeat;
  progress: number;
}) {
  const reduced = useReducedMotion();
  const uid = beat.id;

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] bg-[#07101f] md:aspect-square lg:aspect-[5/6]">
      {/* Lighting wash driven by active beat */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(70% 55% at 55% 40%, ${beat.glow} 0%, transparent 62%), linear-gradient(165deg, #0c152b 0%, #050814 100%)`,
        }}
        transition={{ duration: 0.7, ease: easeEditorial }}
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <filter id={`scBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft grid */}
        <g opacity="0.12" stroke="rgba(168,197,240,0.5)" strokeWidth="0.15">
          {[20, 40, 60, 80].map((v) => (
            <React.Fragment key={v}>
              <line x1={v} y1="8" x2={v} y2="92" />
              <line x1="8" y1={v} x2="92" y2={v} />
            </React.Fragment>
          ))}
        </g>

        {/* Central core */}
        <motion.circle
          cx="50"
          cy="48"
          r="7"
          fill={beat.accent}
          opacity={0.2}
          filter={`url(#scBloom-${uid})`}
          animate={
            reduced
              ? { opacity: 0.25 }
              : { opacity: [0.18, 0.35, 0.18], r: [6.5, 7.5, 6.5] }
          }
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="50" cy="48" r="2.2" fill="#F5E9FF" />

        {/* Orbit */}
        <motion.circle
          cx="50"
          cy="48"
          r="22"
          fill="none"
          stroke={beat.accent}
          strokeWidth="0.25"
          strokeDasharray="1.2 2.4"
          opacity={0.45}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 48, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "50px 48px" }}
        />

        {/* Connections + nodes */}
        {beat.nodes.map((node, i) => (
          <g key={node.label}>
            <motion.line
              x1="50"
              y1="48"
              x2={node.x}
              y2={node.y}
              stroke={beat.accent}
              strokeWidth="0.3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="2.4"
              fill="rgba(12,21,43,0.95)"
              stroke={beat.accent}
              strokeWidth="0.45"
              filter={`url(#scBloom-${uid})`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
            />
            <circle cx={node.x} cy={node.y} r="0.7" fill="#F4F7FC" />
            <text
              x={node.x}
              y={node.y + 5.5}
              textAnchor="middle"
              fill="#9AA8C0"
              fontSize="2.6"
              fontFamily="var(--font-space-grotesk), sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Progress arc */}
        <motion.circle
          cx="50"
          cy="48"
          r="34"
          fill="none"
          stroke={PURPLE}
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray={`${Math.max(0.01, progress) * 213} 213`}
          opacity="0.35"
          transform="rotate(-90 50 48)"
        />
      </svg>

      <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.28em]"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            color: beat.accent,
          }}
        >
          Live system view
        </p>
      </div>
    </div>
  );
}

export function ServicesStickyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
  });

  const [active, setActive] = useState(0);
  const progressValue = useTransform(smooth, (v) => v);

  useEffect(() => {
    if (reduced) return;
    const unsub = progressValue.on("change", (v) => {
      const idx = Math.min(
        BEATS.length - 1,
        Math.max(0, Math.floor(v * BEATS.length))
      );
      setActive(idx);
    });
    return () => unsub();
  }, [progressValue, reduced]);

  // Mobile / reduced: stacked chapters instead of sticky theatre
  if (reduced) {
    return (
      <section
        id="showcase"
        className="relative scroll-mt-28 px-5 py-20 md:px-8"
        aria-labelledby="showcase-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Chapter 04 · Compound loop
          </p>
          <h2
            id="showcase-heading"
            className="mt-4 text-[2.15rem] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch the system lock together.
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-[720px] space-y-10">
          {BEATS.map((beat) => (
            <article
              key={beat.id}
              className="s12-surface rounded-[24px] p-6 md:p-8"
            >
              <p
                className="text-[11px] uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: beat.accent,
                }}
              >
                {beat.eyebrow}
              </p>
              <h3
                className="mt-3 text-[1.5rem] tracking-[-0.025em] text-[#F4F7FC]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {beat.title}
              </h3>
              <p
                className="mt-3 text-[14px] leading-relaxed text-[#9AA8C0]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {beat.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="showcase"
      className="relative scroll-mt-28"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80 md:text-[12px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Chapter 04 · Compound loop
          </p>
          <h2
            id="showcase-heading"
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl lg:text-[3.35rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch the system lock together.
          </h2>
          <p
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scroll through the operating layers. Each beat is a dependency —
            not a feature list.
          </p>
        </div>
      </div>

      {/* Desktop sticky theatre */}
      <div
        ref={containerRef}
        className="relative mt-10 hidden md:block"
        style={{ height: `${BEATS.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_1fr] items-center gap-12 px-8 lg:gap-16">
            <ShowcaseVisual
              beat={BEATS[active]}
              progress={(active + 1) / BEATS.length}
            />

            <div className="relative min-h-[320px]">
              {BEATS.map((beat, i) => {
                const isActive = i === active;
                return (
                  <motion.article
                    key={beat.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : i < active ? -24 : 24,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ duration: 0.5, ease: easeEditorial }}
                    aria-hidden={!isActive}
                  >
                    <p
                      className="text-[11px] font-medium uppercase tracking-[0.3em]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        color: beat.accent,
                      }}
                    >
                      {beat.eyebrow}
                    </p>
                    <h3
                      className="mt-4 max-w-[16ch] text-[2.35rem] leading-[1.08] tracking-[-0.035em] text-[#F4F7FC] lg:text-[2.75rem]"
                      style={{
                        fontFamily:
                          "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      {beat.title}
                    </h3>
                    <p
                      className="mt-5 max-w-[28rem] text-[15px] leading-relaxed text-[#9AA8C0] lg:text-[16px]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {beat.body}
                    </p>

                    <div className="mt-10 flex gap-2" aria-hidden>
                      {BEATS.map((_, di) => (
                        <span
                          key={di}
                          className="h-[2px] flex-1 rounded-full transition-colors duration-500"
                          style={{
                            background:
                              di === active
                                ? beat.accent
                                : "rgba(168,196,240,0.15)",
                          }}
                        />
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet / small: sequential cards */}
      <div className="mx-auto mt-12 max-w-[720px] space-y-6 px-5 pb-16 md:hidden">
        {BEATS.map((beat) => (
          <article
            key={beat.id}
            className="overflow-hidden rounded-[24px] border border-[rgba(168,196,240,0.12)]"
          >
            <div className="p-1">
              <ShowcaseVisual beat={beat} progress={1} />
            </div>
            <div className="p-6">
              <p
                className="text-[11px] uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: beat.accent,
                }}
              >
                {beat.eyebrow}
              </p>
              <h3
                className="mt-3 text-[1.45rem] tracking-[-0.025em] text-[#F4F7FC]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {beat.title}
              </h3>
              <p
                className="mt-3 text-[14px] leading-relaxed text-[#9AA8C0]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {beat.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
