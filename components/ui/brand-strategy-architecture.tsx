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
  form: "scatter" | "gather" | "focus" | "voice" | "shape" | "surface" | "crown";
};

const STAGES: Stage[] = [
  {
    id: "generic",
    index: "01",
    title: "Generic Business",
    body: "Capable. Invisible. Competing on features and price with no mental real estate.",
    accent: "#6B7890",
    glow: "rgba(107,120,144,0.3)",
    mark: "GENERIC",
    form: "scatter",
  },
  {
    id: "research",
    index: "02",
    title: "Research",
    body: "Market maps and customer psychology reveal the whitespace competitors left open.",
    accent: "#9AA8C0",
    glow: "rgba(154,168,192,0.32)",
    mark: "SIGNAL",
    form: "gather",
  },
  {
    id: "positioning",
    index: "03",
    title: "Positioning",
    body: "A single, defensible place in the category — sharp enough that buyers remember it.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.38)",
    mark: "POSITION",
    form: "focus",
  },
  {
    id: "messaging",
    index: "04",
    title: "Messaging",
    body: "One narrative architecture. Every channel speaks the same strategic truth.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.36)",
    mark: "VOICE",
    form: "voice",
  },
  {
    id: "identity",
    index: "05",
    title: "Visual Identity",
    body: "Expression that encodes strategy — recognition engineered, not decorated.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "IDENTITY",
    form: "shape",
  },
  {
    id: "digital",
    index: "06",
    title: "Digital Presence",
    body: "Web, product, and content as one experience system — perception made tangible.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    mark: "PRESENCE",
    form: "surface",
  },
  {
    id: "leadership",
    index: "07",
    title: "Category Leadership",
    body: "The brand becomes the reference point. Competitors orbit. Buyers already decided.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.38)",
    mark: "ICONIC",
    form: "crown",
  },
];

function ArchitectureVisual({
  stage,
  progress,
}: {
  stage: Stage;
  progress: number;
}) {
  const reduced = useReducedMotion();
  const uid = stage.id;

  const particles = [
    { x: 22, y: 28 },
    { x: 78, y: 24 },
    { x: 18, y: 62 },
    { x: 82, y: 58 },
    { x: 35, y: 78 },
    { x: 65, y: 76 },
    { x: 50, y: 18 },
  ];

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
          <filter id={`baBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
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

        {/* Stage-specific geometry */}
        {stage.form === "scatter" &&
          particles.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="1.4"
              fill={stage.accent}
              opacity={0.55}
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.3, 0.7, 0.3], y: [p.y, p.y - 1.5, p.y] }
              }
              transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

        {(stage.form === "gather" || stage.form === "focus") &&
          particles.map((p, i) => {
            const tx = 50 + (p.x - 50) * (stage.form === "focus" ? 0.25 : 0.55);
            const ty = 48 + (p.y - 48) * (stage.form === "focus" ? 0.25 : 0.55);
            return (
              <motion.line
                key={i}
                x1={tx}
                y1={ty}
                x2="50"
                y2="48"
                stroke={stage.accent}
                strokeWidth="0.25"
                opacity={0.4}
              />
            );
          })}

        {stage.form === "voice" && (
          <motion.path
            d="M 28 55 C 35 40, 42 35, 50 38 C 58 41, 65 48, 72 42"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.55"
            strokeLinecap="round"
            animate={
              reduced
                ? { opacity: 0.6 }
                : { opacity: [0.35, 0.85, 0.35], pathLength: [0.4, 1, 0.4] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {(stage.form === "shape" || stage.form === "surface") && (
          <>
            <motion.rect
              x="38"
              y="36"
              width="24"
              height="24"
              rx={stage.form === "surface" ? 3 : 1}
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.45"
              opacity={0.55}
              animate={
                reduced
                  ? undefined
                  : { rotate: [0, 2, 0], opacity: [0.4, 0.7, 0.4] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50px 48px" }}
            />
            {stage.form === "surface" && (
              <motion.rect
                x="32"
                y="30"
                width="36"
                height="36"
                rx="4"
                fill="none"
                stroke={stage.accent}
                strokeWidth="0.25"
                opacity={0.3}
              />
            )}
          </>
        )}

        {stage.form === "crown" && (
          <>
            <motion.circle
              cx="50"
              cy="48"
              r="26"
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.3"
              strokeDasharray="1.5 2"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              style={{ transformOrigin: "50px 48px" }}
            />
            <motion.circle
              cx="50"
              cy="48"
              r="18"
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.35"
              opacity={0.5}
            />
          </>
        )}

        <motion.circle
          cx="50"
          cy="48"
          r={stage.form === "crown" ? 12 : stage.form === "scatter" ? 5 : 10}
          fill={stage.accent}
          opacity={0.14}
          filter={`url(#baBloom-${uid})`}
          animate={
            reduced
              ? { opacity: 0.15 }
              : { opacity: [0.1, 0.26, 0.1] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="50" cy="48" r="2" fill="#F5E9FF" />

        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="4.2"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.14em"
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
          Brand architecture · {stage.index}
        </p>
      </div>
    </div>
  );
}

export function BrandStrategyArchitecture() {
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

  if (reduced) {
    return (
      <section
        id="architecture"
        className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
        aria-labelledby="brand-arch-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Brand Architecture
          </p>
          <h2
            id="brand-arch-heading"
            className="mt-4 text-[2.15rem] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch a brand transform.
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-[520px] space-y-5">
          {STAGES.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-[22px] border border-[rgba(168,196,240,0.12)]"
            >
              <div className="p-1">
                <ArchitectureVisual stage={s} progress={1} />
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
      </section>
    );
  }

  return (
    <section
      id="architecture"
      className="relative scroll-mt-28"
      aria-labelledby="brand-arch-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Brand Architecture
          </p>
          <h2
            id="brand-arch-heading"
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch a brand transform.
          </h2>
          <p
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scroll through the architecture. Each stage remakes the brand —
            from generic business to category leadership.
          </p>
        </div>
      </div>

      {/* Desktop sticky theatre */}
      <div
        ref={containerRef}
        className="relative mt-10 hidden md:block"
        style={{ height: `${STAGES.length * 85}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_1fr] items-center gap-12 px-5 lg:gap-16 lg:px-8">
            <ArchitectureVisual
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
                      {s.index} · Architecture
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
                aria-label="Brand architecture stages"
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

      {/* Mobile stacked */}
      <div className="mx-auto mt-10 max-w-[520px] space-y-5 px-5 pb-16 md:hidden">
        {STAGES.map((s) => (
          <article
            key={s.id}
            className="overflow-hidden rounded-[22px] border border-[rgba(168,196,240,0.12)]"
          >
            <div className="p-1">
              <ArchitectureVisual stage={s} progress={1} />
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
    </section>
  );
}
