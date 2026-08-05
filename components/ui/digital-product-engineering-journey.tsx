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
  form: "concept" | "wire" | "design" | "front" | "back" | "api" | "cloud" | "test" | "launch" | "improve";
};

const STAGES: Stage[] = [
  {
    id: "concept",
    index: "01",
    title: "Concept",
    body: "A business problem becomes a product thesis — who it's for, what it must change, how we'll know.",
    accent: "#6B7890",
    glow: "rgba(107,120,144,0.3)",
    mark: "IDEA",
    form: "concept",
  },
  {
    id: "wire",
    index: "02",
    title: "Wireframes",
    body: "Structure before style. Flows that prove the experience before visual systems lock in.",
    accent: "#9AA8C0",
    glow: "rgba(154,168,192,0.32)",
    mark: "WIRE",
    form: "wire",
  },
  {
    id: "design",
    index: "03",
    title: "Design System",
    body: "Tokens, components, and patterns that keep product and brand coherent as teams scale.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "SYSTEM",
    form: "design",
  },
  {
    id: "front",
    index: "04",
    title: "Frontend",
    body: "Interfaces engineered for speed, accessibility, and the interactions users actually need.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    mark: "UI",
    form: "front",
  },
  {
    id: "back",
    index: "05",
    title: "Backend",
    body: "Domain logic, data models, and services built for reliability — not just the happy path.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.36)",
    mark: "CORE",
    form: "back",
  },
  {
    id: "api",
    index: "06",
    title: "API Layer",
    body: "Contracts between systems — secure, versioned, and ready for web, mobile, and partners.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.36)",
    mark: "API",
    form: "api",
  },
  {
    id: "cloud",
    index: "07",
    title: "Cloud",
    body: "Infrastructure that scales with demand — observability, security, and cost discipline included.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "CLOUD",
    form: "cloud",
  },
  {
    id: "test",
    index: "08",
    title: "Testing",
    body: "Automated confidence — unit, integration, and release gates that protect velocity.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "QA",
    form: "test",
  },
  {
    id: "launch",
    index: "09",
    title: "Launch",
    body: "Production-ready. Monitored. Documented. The product enters the business for real.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.38)",
    mark: "LIVE",
    form: "launch",
  },
  {
    id: "improve",
    index: "10",
    title: "Continuous Improvement",
    body: "Telemetry feeds the next cycle. The platform gets sharper with every release.",
    accent: "#F4F7FC",
    glow: "rgba(244,247,252,0.2)",
    mark: "SCALE",
    form: "improve",
  },
];

function JourneyVisual({ stage, progress }: { stage: Stage; progress: number }) {
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
          <filter id={`dpejBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id={`dpejGrid-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(168,197,240,0.08)" strokeWidth="0.3" />
          </pattern>
        </defs>

        <rect x="10" y="10" width="80" height="80" fill={`url(#dpejGrid-${uid})`} />

        <motion.path
          d="M 50 18 L 50 78"
          fill="none"
          stroke={stage.accent}
          strokeWidth="0.35"
          strokeDasharray="1.2 2"
          opacity={0.45}
        />

        <motion.circle
          cx="50"
          cy={18 + progress * 60}
          r="3.2"
          fill="#F5E9FF"
          filter={`url(#dpejBloom-${uid})`}
          animate={
            reduced
              ? undefined
              : { opacity: [0.7, 1, 0.7], r: [2.8, 3.5, 2.8] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {stage.form === "concept" && (
          <motion.circle
            cx="50"
            cy="48"
            r="12"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.4"
            strokeDasharray="2 2"
            opacity={0.55}
          />
        )}

        {stage.form === "wire" && (
          <>
            <rect x="32" y="34" width="36" height="28" rx="1" fill="none" stroke={stage.accent} strokeWidth="0.4" opacity={0.5} />
            <line x1="32" y1="42" x2="68" y2="42" stroke={stage.accent} strokeWidth="0.3" opacity={0.4} />
            <line x1="40" y1="42" x2="40" y2="62" stroke={stage.accent} strokeWidth="0.3" opacity={0.35} />
          </>
        )}

        {stage.form === "design" && (
          <>
            {[36, 50, 64].map((x, i) => (
              <motion.rect
                key={x}
                x={x - 5}
                y={40}
                width="10"
                height="10"
                rx="1.5"
                fill="none"
                stroke={stage.accent}
                strokeWidth="0.4"
                opacity={0.35 + i * 0.2}
              />
            ))}
          </>
        )}

        {(stage.form === "front" || stage.form === "back") && (
          <motion.rect
            x="34"
            y="36"
            width="32"
            height="24"
            rx={stage.form === "front" ? 3 : 1}
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.45"
            opacity={0.55}
            animate={
              reduced
                ? undefined
                : { opacity: [0.4, 0.75, 0.4] }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {stage.form === "api" && (
          <motion.path
            d="M 30 50 L 42 50 M 58 50 L 70 50"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.5"
            strokeLinecap="round"
            animate={
              reduced
                ? { opacity: 0.6 }
                : { opacity: [0.35, 0.9, 0.35] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {stage.form === "cloud" && (
          <motion.ellipse
            cx="50"
            cy="48"
            rx="18"
            ry="10"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.4"
            opacity={0.55}
          />
        )}

        {stage.form === "test" && (
          <motion.path
            d="M 38 50 L 46 58 L 64 38"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={
              reduced
                ? { opacity: 0.7 }
                : { pathLength: [0.3, 1, 0.3], opacity: [0.4, 0.9, 0.4] }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {(stage.form === "launch" || stage.form === "improve") && (
          <>
            <motion.circle
              cx="50"
              cy="48"
              r={stage.form === "improve" ? 22 : 16}
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.35"
              opacity={0.5}
              animate={
                reduced
                  ? undefined
                  : stage.form === "improve"
                    ? { rotate: 360 }
                    : { opacity: [0.35, 0.7, 0.35] }
              }
              transition={
                stage.form === "improve"
                  ? { duration: 36, ease: "linear", repeat: Infinity }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ transformOrigin: "50px 48px" }}
            />
          </>
        )}

        <motion.circle
          cx="50"
          cy="48"
          r={stage.form === "improve" ? 11 : 8}
          fill={stage.accent}
          opacity={0.14}
          filter={`url(#dpejBloom-${uid})`}
        />
        <circle cx="50" cy="48" r="2" fill="#F5E9FF" />

        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="3.8"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.1em"
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
          Product journey · {stage.index}
        </p>
      </div>
    </div>
  );
}

export function DigitalProductEngineeringJourney() {
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
            <JourneyVisual stage={s} progress={1} />
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
        id="journey"
        className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
        aria-labelledby="dpe-journey-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Product Journey
          </p>
          <h2
            id="dpe-journey-heading"
            className="mt-4 text-[2.15rem] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch an idea become a platform.
          </h2>
        </div>
        <div className="mt-12">{stacked}</div>
      </section>
    );
  }

  return (
    <section
      id="journey"
      className="relative scroll-mt-28"
      aria-labelledby="dpe-journey-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Product Journey
          </p>
          <h2
            id="dpe-journey-heading"
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch an idea become a platform.
          </h2>
          <p
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scroll through the lab. Each stage transforms the product — from
            concept to continuous improvement.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-10 hidden md:block"
        style={{ height: `${STAGES.length * 75}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_1fr] items-center gap-12 px-5 lg:gap-16 lg:px-8">
            <JourneyVisual
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
                      {s.index} · Engineering path
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
                aria-label="Product journey stages"
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
