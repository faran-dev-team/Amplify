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
  form: "query" | "intent" | "create" | "tech" | "authority" | "rank" | "traffic" | "leads" | "revenue";
};

const STAGES: Stage[] = [
  {
    id: "query",
    index: "01",
    title: "Search Query",
    body: "A real customer question enters the ecosystem — the atomic unit of organic demand.",
    accent: "#6B7890",
    glow: "rgba(107,120,144,0.3)",
    mark: "QUERY",
    form: "query",
  },
  {
    id: "intent",
    index: "02",
    title: "Intent Analysis",
    body: "We decode why they searched — learn, compare, or buy — so content matches the job.",
    accent: "#9AA8C0",
    glow: "rgba(154,168,192,0.32)",
    mark: "INTENT",
    form: "intent",
  },
  {
    id: "create",
    index: "03",
    title: "Content Creation",
    body: "Assets engineered for that intent — structured, proof-rich, and built to earn links.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.36)",
    mark: "CREATE",
    form: "create",
  },
  {
    id: "tech",
    index: "04",
    title: "Technical Optimization",
    body: "Crawl paths, speed, schema, and internal links so search engines can trust and surface it.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.36)",
    mark: "TECH",
    form: "tech",
  },
  {
    id: "authority",
    index: "05",
    title: "Authority Building",
    body: "Earned mentions and digital PR that amplify topical gravity across the cluster.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.36)",
    mark: "TRUST",
    form: "authority",
  },
  {
    id: "rank",
    index: "06",
    title: "Ranking",
    body: "Visibility earned — not rented. Positions that hold because the system is stronger.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "RANK",
    form: "rank",
  },
  {
    id: "traffic",
    index: "07",
    title: "Qualified Traffic",
    body: "Visitors who searched with intent — not vanity sessions that bounce.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "TRAFFIC",
    form: "traffic",
  },
  {
    id: "leads",
    index: "08",
    title: "Leads",
    body: "Conversion paths that capture demand cleanly — with the context sales needs.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    mark: "LEADS",
    form: "leads",
  },
  {
    id: "revenue",
    index: "09",
    title: "Revenue",
    body: "Organic becomes pipeline. Attribution closes the loop. The next query starts smarter.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.4)",
    mark: "GROWTH",
    form: "revenue",
  },
];

function EngineVisual({ stage, progress }: { stage: Stage; progress: number }) {
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
          <filter id={`sceBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
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
          filter={`url(#sceBloom-${uid})`}
          animate={
            reduced
              ? undefined
              : { opacity: [0.7, 1, 0.7], r: [2.8, 3.5, 2.8] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {stage.form === "query" && (
          <motion.rect
            x="28"
            y="42"
            width="44"
            height="10"
            rx="5"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.4"
            opacity={0.55}
          />
        )}

        {stage.form === "intent" &&
          [
            [32, 36],
            [68, 34],
            [28, 58],
            [72, 56],
          ].map(([x, y], i) => (
            <motion.line
              key={i}
              x1={x}
              y1={y}
              x2="50"
              y2="48"
              stroke={stage.accent}
              strokeWidth="0.25"
              opacity={0.45}
            />
          ))}

        {stage.form === "create" && (
          <>
            {[36, 50, 64].map((x, i) => (
              <motion.rect
                key={x}
                x={x - 5}
                y={38}
                width="10"
                height="16"
                rx="1.2"
                fill="none"
                stroke={stage.accent}
                strokeWidth="0.4"
                opacity={0.3 + i * 0.2}
                animate={
                  reduced
                    ? undefined
                    : { y: [38, 36 + i * 0.5, 38] }
                }
                transition={{
                  duration: 2.4 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}

        {stage.form === "tech" && (
          <motion.path
            d="M 32 55 L 42 40 L 50 52 L 58 35 L 68 48"
            fill="none"
            stroke={stage.accent}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={
              reduced
                ? { opacity: 0.6 }
                : { opacity: [0.35, 0.85, 0.35] }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {stage.form === "authority" && (
          <>
            <motion.circle
              cx="50"
              cy="48"
              r="14"
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.35"
              opacity={0.5}
            />
            {[0, 120, 240].map((deg) => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const x = Math.round((50 + 20 * Math.cos(rad)) * 10) / 10;
              const y = Math.round((48 + 20 * Math.sin(rad)) * 10) / 10;
              return (
                <g key={deg}>
                  <line
                    x1="50"
                    y1="48"
                    x2={x}
                    y2={y}
                    stroke={stage.accent}
                    strokeWidth="0.25"
                    opacity={0.4}
                  />
                  <circle cx={x} cy={y} r="1.8" fill={stage.accent} opacity={0.6} />
                </g>
              );
            })}
          </>
        )}

        {(stage.form === "rank" || stage.form === "traffic") && (
          <motion.path
            d="M 30 62 C 38 50, 44 42, 50 40 C 56 38, 62 44, 70 36"
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

        {(stage.form === "leads" || stage.form === "revenue") && (
          <>
            <motion.circle
              cx="50"
              cy="48"
              r={stage.form === "revenue" ? 22 : 16}
              fill="none"
              stroke={stage.accent}
              strokeWidth="0.35"
              opacity={0.5}
              animate={
                reduced
                  ? undefined
                  : stage.form === "revenue"
                    ? { rotate: 360 }
                    : { opacity: [0.35, 0.7, 0.35] }
              }
              transition={
                stage.form === "revenue"
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
          r={stage.form === "revenue" ? 11 : 8}
          fill={stage.accent}
          opacity={0.14}
          filter={`url(#sceBloom-${uid})`}
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
          Organic engine · {stage.index}
        </p>
      </div>
    </div>
  );
}

export function SearchContentEngine() {
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
            <EngineVisual stage={s} progress={1} />
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
        id="engine"
        className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
        aria-labelledby="sc-engine-heading"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Organic Growth Engine
          </p>
          <h2
            id="sc-engine-heading"
            className="mt-4 text-[2.15rem] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch a question become growth.
          </h2>
        </div>
        <div className="mt-12">{stacked}</div>
      </section>
    );
  }

  return (
    <section
      id="engine"
      className="relative scroll-mt-28"
      aria-labelledby="sc-engine-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Interactive Organic Growth Engine
          </p>
          <h2
            id="sc-engine-heading"
            className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Watch a question become growth.
          </h2>
          <p
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scroll through the engine. Each stage transforms a customer query —
            from intent to compounding revenue.
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
            <EngineVisual
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
                      {s.index} · Query path
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
                aria-label="Organic growth stages"
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
