"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PURPLE = "#7C5CFF";
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Stage = {
  id: string;
  index: string;
  title: string;
  outcome: string;
  body: string;
  meta: string;
  next: string;
};

const STAGES: Stage[] = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    outcome: "Truth before tooling — ICP and constraints mapped with founder clarity.",
    body: "We start from how you actually buy and grow — not a templated audit. The OS is designed against reality.",
    meta: "Strategy sprint",
    next: "Feeds Architect",
  },
  {
    id: "architect",
    index: "02",
    title: "Architect",
    outcome: "A Growth OS sized to your stage — channels, AI, cadence, instrumentation.",
    body: "System design before activation. Every practice knows what it feeds and what feeds it.",
    meta: "System design",
    next: "Feeds Activate",
  },
  {
    id: "activate",
    index: "03",
    title: "Activate",
    outcome: "Parallel launch across brand, demand, product, and infrastructure — no handoff gaps.",
    body: "One team. Shared measurement. Close in 14–21 days with ownership that does not fragment.",
    meta: "14–21 day close",
    next: "Feeds Compound",
  },
  {
    id: "compound",
    index: "04",
    title: "Compound",
    outcome: "Weekly rhythm that turns insight into structural scale — Launch, Scale, or Dominate.",
    body: "Transparent reporting. Continuous refinement. The OS keeps learning so growth stops resetting.",
    meta: "Long-term growth",
    next: "Loops to Discover",
  },
];

export function ServicesWorkflow() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section
      ref={ref}
      id="workflow"
      className="relative scroll-mt-28 px-5 pb-10 pt-4 md:px-8 md:pb-14 md:pt-6"
      aria-labelledby="workflow-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[640px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80 md:text-[12px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Chapter 05 · Engagement
          </motion.p>
          <motion.h2
            id="workflow-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            How the OS gets installed.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[32rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Four connected stages. Hover to see what each unlocks — and what it
            feeds next. No agency theatre.
          </motion.p>
        </div>

        {/* Desktop interactive workflow */}
        <div className="relative mt-14 hidden lg:block">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-[52px] h-8 w-full"
            viewBox="0 0 1200 32"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={`wfLine-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={PURPLE} stopOpacity="0.15" />
                <stop offset="50%" stopColor={PURPLE} stopOpacity="0.55" />
                <stop offset="100%" stopColor="#5B8DEF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 80 16 H 1120"
              fill="none"
              stroke={`url(#wfLine-${uid})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                inView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.4, delay: 0.2, ease: easeEditorial }}
            />
          </svg>

          <ol className="grid grid-cols-4 gap-5">
            {STAGES.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.1,
                    ease: easeOutExpo,
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`relative w-full pt-4 text-left transition-opacity duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 ${
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-80"
                    }`}
                  >
                    <div
                      className={`relative z-10 mx-auto mb-8 flex h-10 w-10 items-center justify-center rounded-full border bg-[#0c152b] transition-[border-color,box-shadow] duration-400 ${
                        isActive
                          ? "border-[rgba(184,164,255,0.55)] shadow-[0_0_24px_rgba(124,92,255,0.35)]"
                          : "border-[rgba(184,164,255,0.28)]"
                      }`}
                    >
                      <span
                        className="text-[11px] font-medium tracking-[0.08em] text-[#B8A4FF]"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {s.index}
                      </span>
                    </div>
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#6B7890]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {s.meta}
                    </p>
                    <h3
                      className="mt-2 text-[1.4rem] tracking-[-0.025em] text-[#F4F7FC]"
                      style={{
                        fontFamily:
                          "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-3 text-[13px] leading-relaxed text-[#9AA8C0]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {s.outcome}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </ol>

          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="s12-surface mt-10 rounded-[22px] px-7 py-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p
                className="text-[11px] uppercase tracking-[0.22em] text-[#7C5CFF]/80"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {stage.title} · in depth
              </p>
              <p
                className="text-[11px] tracking-[0.08em] text-[#B8A4FF]/85"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {stage.next}
              </p>
            </div>
            <p
              className="mt-3 max-w-[48rem] text-[14px] leading-relaxed text-[#9AA8C0] md:text-[15px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {stage.body}
            </p>
          </motion.div>
        </div>

        {/* Mobile / tablet */}
        <ol className="relative mx-auto mt-12 max-w-[520px] space-y-0 lg:hidden">
          <div
            aria-hidden
            className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-[#7C5CFF]/50 via-[#5B8DEF]/30 to-transparent"
          />
          {STAGES.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.08,
                ease: easeOutExpo,
              }}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(184,164,255,0.35)] bg-[#0c152b]">
                <span
                  className="text-[11px] font-medium text-[#B8A4FF]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {s.index}
                </span>
              </div>
              <div className="pt-1">
                <p
                  className="text-[10px] uppercase tracking-[0.24em] text-[#6B7890]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {s.meta}
                </p>
                <h3
                  className="mt-1 text-[1.35rem] tracking-[-0.025em] text-[#F4F7FC]"
                  style={{
                    fontFamily:
                      "var(--font-playfair), 'Playfair Display', serif",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-[14px] leading-relaxed text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {s.outcome}
                </p>
                <p
                  className="mt-2 text-[12px] leading-relaxed text-[#6B7890]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
