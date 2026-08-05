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

type Stage = {
  id: string;
  index: string;
  title: string;
  body: string;
  accent: string;
  glow: string;
  mark: string;
  form: "budget" | "discover" | "ai" | "creative" | "landing" | "lead" | "sales" | "revenue" | "growth";
};

const STAGES: Stage[] = [
  {
    id: "budget",
    index: "01",
    title: "Budget",
    body: "One marketing dollar enters the system — tracked from the first impression to closed revenue.",
    accent: "#6B7890",
    glow: "rgba(107,120,144,0.3)",
    mark: "$1",
    form: "budget",
  },
  {
    id: "discover",
    index: "02",
    title: "Audience Discovery",
    body: "Intent signals and ICP filters decide where the dollar goes — and where it never will.",
    accent: "#9AA8C0",
    glow: "rgba(154,168,192,0.32)",
    mark: "ICP",
    form: "discover",
  },
  {
    id: "ai",
    index: "03",
    title: "AI Optimization",
    body: "Models reallocate toward winning audiences and placements in real time — not weekly guesswork.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.38)",
    mark: "AI",
    form: "ai",
  },
  {
    id: "creative",
    index: "04",
    title: "Creative Testing",
    body: "Variants compete. Winners scale. Losers die fast — learning compounds into the next cycle.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.36)",
    mark: "TEST",
    form: "creative",
  },
  {
    id: "landing",
    index: "05",
    title: "Landing Page",
    body: "The promise of the ad becomes an experience — fast, clear, and built to convert.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "PAGE",
    form: "landing",
  },
  {
    id: "lead",
    index: "06",
    title: "Lead Generation",
    body: "Qualified demand captured cleanly — with the data sales actually needs.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    mark: "LEAD",
    form: "lead",
  },
  {
    id: "sales",
    index: "07",
    title: "Sales",
    body: "Pipeline motion that respects intent. Marketing and sales share one truth.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "SALES",
    form: "sales",
  },
  {
    id: "revenue",
    index: "08",
    title: "Revenue",
    body: "The dollar closes. Attribution writes the story back into the engine.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.4)",
    mark: "REV",
    form: "revenue",
  },
  {
    id: "growth",
    index: "09",
    title: "Growth",
    body: "Unit economics proven. Scale unlocks. The next dollar starts smarter.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.4)",
    mark: "SCALE",
    form: "growth",
  },
];

function FlowVisual({ stage, progress }: { stage: Stage; progress: number }) {
  const reduced = useReducedMotion();
  const uid = stage.id;

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] bg-[#07101f] md:aspect-square lg:aspect-[5/6]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(65% 50% at 50% 42%, ${stage.glow} 0%, transparent 65%), linear-gradient(165deg, #0c152b 0%, #050814 100%)`,
        }}
        transition={{ duration: 0.6, ease: easeEditorial }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <filter id={`pmfBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.1" stroke="rgba(168,197,240,0.55)" strokeWidth="0.15">
          {[25, 50, 75].map((v) => (
            <React.Fragment key={v}>
              <line x1={v} y1="10" x2={v} y2="90" />
              <line x1="10" y1={v} x2="90" y2={v} />
            </React.Fragment>
          ))}
        </g>

        {/* Vertical revenue path */}
        <motion.path
          d="M 50 18 L 50 78"
          fill="none"
          stroke={stage.accent}
          strokeWidth="0.35"
          strokeDasharray="1.2 2"
          opacity={0.45}
        />

        {/* Progress node on path */}
        <motion.circle
          cx="50"
          cy={18 + progress * 60}
          r="3.2"
          fill="#F5E9FF"
          filter={`url(#pmfBloom-${uid})`}
          animate={
            reduced
              ? undefined
              : { opacity: [0.7, 1, 0.7], r: [2.8, 3.5, 2.8] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {stage.form === "budget" && (
          <text
            x="50"
            y="48"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={stage.accent}
            fontSize="10"
            fontFamily="var(--font-space-grotesk), sans-serif"
            letterSpacing="0.08em"
          >
            $1
          </text>
        )}

        {(stage.form === "discover" || stage.form === "ai") &&
          [
            [32, 36],
            [68, 34],
            [28, 58],
            [72, 56],
            [50, 70],
          ].map(([x, y], i) => (
            <motion.line
              key={i}
              x1={x}
              y1={y}
              x2="50"
              y2="48"
              stroke={stage.accent}
              strokeWidth="0.25"
              opacity={stage.form === "ai" ? 0.55 : 0.35}
            />
          ))}

        {stage.form === "creative" && (
          <>
            {[38, 50, 62].map((x, i) => (
              <motion.rect
                key={x}
                x={x - 5}
                y={40}
                width="10"
                height="14"
                rx="1.5"
                fill="none"
                stroke={stage.accent}
                strokeWidth="0.4"
                opacity={0.35 + i * 0.2}
                animate={
                  reduced
                    ? undefined
                    : { y: [40, 38 + i, 40], opacity: [0.3, 0.7, 0.3] }
                }
                transition={{
                  duration: 2.2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}

        {stage.form === "landing" && (
          <motion.rect
            x="36"
            y="34"
            width="28"
            height="28"
            rx="2"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.45"
            opacity={0.55}
          />
        )}

        {(stage.form === "lead" || stage.form === "sales") && (
          <motion.path
            d="M 35 55 C 42 42, 48 38, 50 40 C 52 42, 58 48, 65 44"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.5"
            strokeLinecap="round"
            animate={
              reduced
                ? { opacity: 0.6 }
                : { opacity: [0.35, 0.85, 0.35], pathLength: [0.4, 1, 0.4] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {(stage.form === "revenue" || stage.form === "growth") && (
          <>
            <motion.circle
              cx="50"
              cy="48"
              r={stage.form === "growth" ? 22 : 16}
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.35"
              opacity={0.5}
              animate={
                reduced
                  ? undefined
                  : stage.form === "growth"
                    ? { rotate: 360 }
                    : { opacity: [0.35, 0.7, 0.35] }
              }
              transition={
                stage.form === "growth"
                  ? { duration: 36, ease: "linear", repeat: Infinity }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ transformOrigin: "50px 48px" }}
            />
            {stage.form === "growth" && (
              <motion.circle
                cx="50"
                cy="48"
                r="28"
                fill="none"
                stroke={stage.accent}
                strokeWidth="0.25"
                strokeDasharray="1.5 2"
                opacity={0.35}
              />
            )}
          </>
        )}

        <motion.circle
          cx="50"
          cy="48"
          r={stage.form === "growth" ? 11 : 8}
          fill={stage.accent}
          opacity={0.14}
          filter={`url(#pmfBloom-${uid})`}
        />
        <circle cx="50" cy="48" r="2" fill="#F5E9FF" />

        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="4"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.12em"
        >
          {stage.mark}
        </text>

        <motion.circle
          cx="50"
          cy="48"
          r="32"
          fill="none"
          stroke={PURPLE}
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray={`${Math.max(0.05, progress) * 201} 201`}
          opacity="0.4"
          transform="rotate(-90 50 48)"
        />
      </svg>

      <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.28em]"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            color: stage.accent,
          }}
        >
          Revenue flow · {stage.index}
        </p>
      </div>
    </div>
  );
}

export function PerformanceMarketingFlow() {
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
        STAGES.length - 1,
        Math.max(0, Math.floor(v * STAGES.length))
      );
      setActive(idx);
    });
    return () => unsub();
  }, [progressValue, reduced]);

  const stage = STAGES[active];

  const stacked = (
    <div className="mx-auto max-w-[520px] space-y-5">
      {STAGES.map((s) => (
        <article
          key={s.id}
          className="overflow-hidden rounded-[22px] border border-[rgba(168,196,240,0.12)]"
        >
          <div className="p-1">
            <FlowVisual stage={s} progress={1} />
          </div>
          <div className="p-5">
            <p
              className="text-[11px] uppercase tracking-[0.24em]"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                color: s.accent,
              }}
            >
              {s.index}
            </p>
            <h3
              className="mt-2 text-[1.35rem] text-[#F4F7FC]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              {s.title}
            </h3>
            <p
              className="mt-2 text-[14px] leading-relaxed text-[#9AA8C0]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {s.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <section
        id="flow"
        className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
        aria-labelledby="pm-flow-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Revenue Flow
          </p>
          <h2
            id="pm-flow-heading"
            className="mt-4 text-[2.15rem] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch one dollar become growth.
          </h2>
        </div>
        <div className="mt-12">{stacked}</div>
      </section>
    );
  }

  return (
    <section
      id="flow"
      className="relative scroll-mt-28"
      aria-labelledby="pm-flow-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Revenue Flow
          </p>
          <h2
            id="pm-flow-heading"
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch one dollar become growth.
          </h2>
          <p
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scroll through the engine. Each stage transforms the dollar — from
            budget to predictable scale.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-10 hidden md:block"
        style={{ height: `${STAGES.length * 80}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_1fr] items-center gap-12 px-5 lg:gap-16 lg:px-8">
            <FlowVisual
              stage={stage}
              progress={(active + 1) / STAGES.length}
            />
            <div className="relative flex min-h-[380px] flex-col justify-center">
              <div className="relative min-h-[220px]">
                {STAGES.map((s, i) => (
                  <motion.div
                    key={s.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      y: i === active ? 0 : i < active ? -18 : 18,
                      filter: i === active ? "blur(0px)" : "blur(4px)",
                    }}
                    transition={{ duration: 0.5, ease: easeEditorial }}
                    aria-hidden={i !== active}
                  >
                    <p
                      className="text-[11px] font-medium uppercase tracking-[0.3em]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        color: s.accent,
                      }}
                    >
                      {s.index} · Dollar path
                    </p>
                    <h3
                      className="mt-4 max-w-[14ch] text-[2.15rem] leading-[1.08] tracking-[-0.035em] text-[#F4F7FC] lg:text-[2.5rem]"
                      style={{
                        fontFamily:
                          "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-5 max-w-[28rem] text-[15px] leading-relaxed text-[#9AA8C0]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {s.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div
                className="mt-10 flex gap-1.5"
                role="tablist"
                aria-label="Revenue flow stages"
              >
                {STAGES.map((s, di) => (
                  <div
                    key={s.id}
                    role="tab"
                    aria-selected={di === active}
                    aria-label={s.title}
                    className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[rgba(168,196,240,0.14)]"
                  >
                    {di <= active && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: stage.accent,
                          opacity: di === active ? 1 : 0.45,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 px-5 pb-16 md:hidden">{stacked}</div>
    </section>
  );
}
