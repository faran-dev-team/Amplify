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
  form:
    | "request"
    | "app"
    | "gateway"
    | "auth"
    | "logic"
    | "db"
    | "ai"
    | "cloud"
    | "monitor"
    | "analytics"
    | "response";
};

const STAGES: Stage[] = [
  {
    id: "request",
    index: "01",
    title: "User Request",
    body: "A click, a checkout, a dashboard load — the business moment that depends on everything beneath it.",
    accent: "#6B7890",
    glow: "rgba(107,120,144,0.3)",
    mark: "IN",
    form: "request",
  },
  {
    id: "app",
    index: "02",
    title: "Application",
    body: "The product surface receives intent and begins the path — fast, accessible, and aware of failure modes.",
    accent: "#9AA8C0",
    glow: "rgba(154,168,192,0.32)",
    mark: "APP",
    form: "app",
  },
  {
    id: "gateway",
    index: "03",
    title: "API Gateway",
    body: "Traffic enters through a controlled edge — routing, rate limits, and contracts before anything deeper runs.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "EDGE",
    form: "gateway",
  },
  {
    id: "auth",
    index: "04",
    title: "Authentication",
    body: "Identity verified. Permissions enforced. Trust established before business logic ever executes.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    mark: "AUTH",
    form: "auth",
  },
  {
    id: "logic",
    index: "05",
    title: "Business Logic",
    body: "Domain services apply the rules that make the product valuable — not just the request possible.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.36)",
    mark: "CORE",
    form: "logic",
  },
  {
    id: "db",
    index: "06",
    title: "Database",
    body: "Truth is read and written with integrity — models chosen for the query patterns the business actually has.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.36)",
    mark: "DATA",
    form: "db",
  },
  {
    id: "ai",
    index: "07",
    title: "AI Services",
    body: "When intelligence is needed, models respond inside the same observed, secured path — never a side door.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "AI",
    form: "ai",
  },
  {
    id: "cloud",
    index: "08",
    title: "Cloud Infrastructure",
    body: "Compute, network, and regions absorb the load — capacity that scales without drama.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "CLOUD",
    form: "cloud",
  },
  {
    id: "monitor",
    index: "09",
    title: "Monitoring",
    body: "Latency, errors, and saturation are watched in real time — signals that keep the path honest.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.38)",
    mark: "OBS",
    form: "monitor",
  },
  {
    id: "analytics",
    index: "10",
    title: "Analytics",
    body: "The request becomes learning — patterns that improve products, forecasts, and capacity planning.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.32)",
    mark: "LEARN",
    form: "analytics",
  },
  {
    id: "response",
    index: "11",
    title: "Response",
    body: "The user gets an answer. The business gets continuity. Infrastructure did its job without being noticed — until it deserves applause.",
    accent: "#F4F7FC",
    glow: "rgba(244,247,252,0.2)",
    mark: "OUT",
    form: "response",
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
          <filter id={`cijBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id={`cijGrid-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(168,197,240,0.08)" strokeWidth="0.3" />
          </pattern>
        </defs>

        <rect x="10" y="10" width="80" height="80" fill={`url(#cijGrid-${uid})`} />

        <motion.path
          d="M 50 16 L 50 82"
          fill="none"
          stroke={stage.accent}
          strokeWidth="0.35"
          strokeDasharray="1.2 2"
          opacity={0.45}
        />

        <motion.circle
          cx="50"
          cy={16 + progress * 66}
          r="3.2"
          fill="#F5E9FF"
          filter={`url(#cijBloom-${uid})`}
          animate={
            reduced
              ? undefined
              : { opacity: [0.7, 1, 0.7], r: [2.8, 3.5, 2.8] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {stage.form === "request" && (
          <motion.circle
            cx="50"
            cy="48"
            r="10"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.4"
            strokeDasharray="2 2"
            opacity={0.55}
          />
        )}

        {stage.form === "app" && (
          <rect
            x="34"
            y="36"
            width="32"
            height="24"
            rx="3"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.45"
            opacity={0.55}
          />
        )}

        {stage.form === "gateway" && (
          <motion.path
            d="M 30 48 L 42 48 M 58 48 L 70 48 M 50 36 L 50 60"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.45"
            strokeLinecap="round"
            animate={
              reduced ? { opacity: 0.6 } : { opacity: [0.35, 0.9, 0.35] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {stage.form === "auth" && (
          <motion.path
            d="M 42 52 L 42 44 C 42 38 58 38 58 44 L 58 52 M 40 52 L 60 52 L 60 62 L 40 62 Z"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.45"
            opacity={0.6}
          />
        )}

        {stage.form === "logic" && (
          <>
            {[38, 50, 62].map((x, i) => (
              <motion.rect
                key={x}
                x={x - 5}
                y={42}
                width="10"
                height="12"
                rx="1"
                fill="none"
                stroke={stage.accent}
                strokeWidth="0.4"
                opacity={0.35 + i * 0.18}
              />
            ))}
          </>
        )}

        {stage.form === "db" && (
          <motion.ellipse
            cx="50"
            cy="48"
            rx="14"
            ry="8"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.45"
            opacity={0.55}
          />
        )}

        {stage.form === "ai" && (
          <motion.circle
            cx="50"
            cy="48"
            r="14"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.4"
            strokeDasharray="3 3"
            animate={
              reduced ? undefined : { rotate: 360 }
            }
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "50px 48px" }}
            opacity={0.55}
          />
        )}

        {stage.form === "cloud" && (
          <motion.ellipse
            cx="50"
            cy="48"
            rx="20"
            ry="11"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.4"
            opacity={0.55}
          />
        )}

        {stage.form === "monitor" && (
          <motion.path
            d="M 32 56 L 40 44 L 48 50 L 56 36 L 68 48"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={
              reduced
                ? { opacity: 0.7 }
                : { pathLength: [0.4, 1, 0.4], opacity: [0.4, 0.9, 0.4] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {stage.form === "analytics" && (
          <>
            {[36, 46, 56, 66].map((x, i) => (
              <motion.rect
                key={x}
                x={x - 2}
                y={58 - (i + 1) * 5}
                width="4"
                height={(i + 1) * 5}
                rx="0.5"
                fill={stage.accent}
                opacity={0.25 + i * 0.12}
              />
            ))}
          </>
        )}

        {stage.form === "response" && (
          <motion.circle
            cx="50"
            cy="48"
            r="18"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.35"
            opacity={0.5}
            animate={
              reduced ? undefined : { opacity: [0.35, 0.75, 0.35] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <motion.circle
          cx="50"
          cy="48"
          r={stage.form === "response" ? 11 : 8}
          fill={stage.accent}
          opacity={0.14}
          filter={`url(#cijBloom-${uid})`}
        />
        <circle cx="50" cy="48" r="2" fill="#F5E9FF" />

        <text
          x="50"
          y="66"
          textAnchor="middle"
          fill="#F4F7FC"
          fontSize="3.6"
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
          Request path · {stage.index}
        </p>
      </div>
    </div>
  );
}

export function CloudInfrastructureJourney() {
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
        aria-labelledby="ci-journey-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Infrastructure Journey
          </p>
          <h2
            id="ci-journey-heading"
            className="mt-4 text-[2.15rem] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Follow a request through the stack.
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
      aria-labelledby="ci-journey-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Infrastructure Journey
          </p>
          <h2
            id="ci-journey-heading"
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Follow a request through the stack.
          </h2>
          <p
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scroll through Mission Control. Watch one business moment travel
            from edge to response — and leave learning behind.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-10 hidden md:block"
        style={{ height: `${STAGES.length * 70}vh` }}
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
                      {s.index} · Signal path
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
                aria-label="Infrastructure journey stages"
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
