"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const AUTO_MS = 3200;

type Stage = {
  id: string;
  index: string;
  title: string;
  body: string;
  accent: string;
  glow: string;
  mark: string;
};

const STAGES: Stage[] = [
  {
    id: "data",
    index: "01",
    title: "Business data enters",
    body: "CRM, docs, tickets, and product events become usable signal — not siloed files.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.35)",
    mark: "DATA",
  },
  {
    id: "knowledge",
    index: "02",
    title: "Knowledge base forms",
    body: "A living company brain — grounded, permissioned, and ready for agents to reason over.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "KB",
  },
  {
    id: "agents",
    index: "03",
    title: "AI agents activate",
    body: "Specialists for support, sales, research, and ops — coordinated, not random chatbots.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.4)",
    mark: "AGENT",
  },
  {
    id: "automation",
    index: "04",
    title: "Automation engine runs",
    body: "Workflows fire across tools. Repetition leaves. Exceptions surface for humans.",
    accent: "#5B8DEF",
    glow: "rgba(91,141,239,0.35)",
    mark: "FLOW",
  },
  {
    id: "approve",
    index: "05",
    title: "Human approval",
    body: "Judgment stays with people. Agents propose; operators approve high-stakes actions.",
    accent: "#A8C5F0",
    glow: "rgba(168,197,240,0.35)",
    mark: "HUMAN",
  },
  {
    id: "execute",
    index: "06",
    title: "Execution",
    body: "Actions land in the systems where work already happens — CRM, Slack, email, data.",
    accent: "#B8A4FF",
    glow: "rgba(184,164,255,0.35)",
    mark: "RUN",
  },
  {
    id: "report",
    index: "07",
    title: "Reporting",
    body: "Outcomes are visible — time saved, tickets resolved, pipeline moved, errors caught.",
    accent: "#6EB8E8",
    glow: "rgba(110,184,232,0.35)",
    mark: "REPORT",
  },
  {
    id: "learn",
    index: "08",
    title: "Continuous learning",
    body: "Every cycle writes back into knowledge and agents. The OS gets sharper weekly.",
    accent: "#7C5CFF",
    glow: "rgba(124,92,255,0.4)",
    mark: "LEARN",
  },
];

function EngineVisual({ stage, progress }: { stage: Stage; progress: number }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] bg-[#07101f] md:aspect-square">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(65% 50% at 50% 42%, ${stage.glow} 0%, transparent 65%), linear-gradient(165deg, #0c152b 0%, #050814 100%)`,
        }}
        transition={{ duration: 0.6, ease: easeEditorial }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <g opacity="0.1" stroke="rgba(168,197,240,0.6)" strokeWidth="0.15">
          {[25, 50, 75].map((v) => (
            <React.Fragment key={v}>
              <line x1={v} y1="10" x2={v} y2="90" />
              <line x1="10" y1={v} x2="90" y2={v} />
            </React.Fragment>
          ))}
        </g>
        <motion.path
          d="M 18 72 C 28 55, 34 42, 42 38 C 55 30, 62 42, 55 52 C 48 62, 62 68, 74 52 C 80 44, 82 30, 76 22"
          fill="none"
          stroke={stage.accent}
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="1.5 2"
          animate={
            reduced
              ? { opacity: 0.5 }
              : { opacity: [0.35, 0.8, 0.35], pathLength: [0.35, 1, 0.35] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="48"
          r="16"
          fill={stage.accent}
          opacity={0.12}
          animate={
            reduced
              ? { opacity: 0.15 }
              : { opacity: [0.1, 0.24, 0.1], r: [14, 17, 14] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F4F7FC"
          fontSize="5.5"
          fontFamily="var(--font-space-grotesk), sans-serif"
          letterSpacing="0.12em"
        >
          {stage.mark}
        </text>
        <motion.circle
          cx="50"
          cy="48"
          r="28"
          fill="none"
          stroke={stage.accent}
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray={`${Math.max(0.05, progress) * 176} 176`}
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
          Live system · {stage.index}
        </p>
      </div>
    </div>
  );
}

export function AiSolutionsEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = STAGES[active];

  useEffect(() => {
    if (reduced || paused || !inView) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STAGES.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, inView, active]);

  return (
    <section
      id="engine"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="ai-engine-heading"
    >
      <div className="mx-auto max-w-[720px] text-center">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Signature Experience
        </p>
        <h2
          id="ai-engine-heading"
          className="mt-4 text-[2.35rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-5xl"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          }}
        >
          Watch an AI system come alive.
        </h2>
        <p
          className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          From business data to continuous learning — each stage transforms the
          operating layer. Not a timeline. A living system.
        </p>
      </div>

      {!reduced && (
        <div
          ref={ref}
          className="mx-auto mt-12 hidden max-w-[1200px] md:mt-14 md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-12 lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <EngineVisual stage={stage} progress={(active + 1) / STAGES.length} />
          <div className="relative flex min-h-[380px] flex-col justify-center">
            <div className="relative min-h-[210px]">
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
                    {s.index} · System path
                  </p>
                  <h3
                    className="mt-4 max-w-[16ch] text-[2.15rem] leading-[1.08] tracking-[-0.035em] text-[#F4F7FC] lg:text-[2.5rem]"
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
              aria-label="AI system stages"
            >
              {STAGES.map((s, di) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={di === active}
                  aria-label={s.title}
                  onClick={() => setActive(di)}
                  className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[rgba(168,196,240,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                >
                  {di === active && (
                    <motion.span
                      key={`fill-${active}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: stage.accent }}
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? undefined : "100%" }}
                      transition={
                        paused
                          ? { duration: 0 }
                          : { duration: AUTO_MS / 1000, ease: "linear" }
                      }
                    />
                  )}
                  {di < active && (
                    <span
                      className="absolute inset-0 rounded-full opacity-50"
                      style={{ background: stage.accent }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={`mx-auto mt-10 max-w-[520px] space-y-5 ${reduced ? "" : "md:hidden"}`}
      >
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
    </section>
  );
}
