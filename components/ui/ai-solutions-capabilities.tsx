"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Cap = {
  id: string;
  index: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  image: string;
};

const CAPS: Cap[] = [
  {
    id: "agents",
    index: "01",
    title: "Multi-Agent Systems",
    problem: "Single chatbots that can't own a real business process.",
    approach: "Specialized agents that collaborate with shared memory and tools.",
    outcome: "Complex workstreams handled end-to-end — with humans on exceptions.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "automation",
    index: "02",
    title: "Workflow Automation",
    problem: "Manual handoffs that create delay, error, and burnout.",
    approach: "Orchestrated flows across CRM, email, data, and internal tools.",
    outcome: "Hours of repetitive ops removed every week — permanently.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "knowledge",
    index: "03",
    title: "Knowledge Systems",
    problem: "Truth trapped in docs, Slack, and people who leave.",
    approach: "Grounded knowledge bases agents and teams both trust.",
    outcome: "Faster answers. Consistent policy. Institutional memory that scales.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "support",
    index: "04",
    title: "Support & Voice AI",
    problem: "Support volume scales. Headcount can't keep up.",
    approach: "AI-first resolution with seamless human escalation.",
    outcome: "Higher CSAT capacity without linear hiring.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "sales",
    index: "05",
    title: "Sales Automation",
    problem: "Reps drown in admin instead of conversations that close.",
    approach: "Qualification, follow-up, and briefing agents inside the CRM.",
    outcome: "More selling time. Cleaner pipeline. Faster cycles.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "infra",
    index: "06",
    title: "AI Infrastructure",
    problem: "Demos that never survive security, data, or production reality.",
    approach: "Secure models, integrations, observability, and governance.",
    outcome: "AI that ships — and stays reliable under load.",
    image: "/capabilities/capability-cloud.png",
  },
];

export function AiSolutionsCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="ai-caps-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[560px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Capabilities
          </motion.p>
          <motion.h2
            id="ai-caps-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Mastery that maps to outcomes.
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="space-y-1.5">
            {CAPS.map((c, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 + i * 0.04,
                    ease: easeOutExpo,
                  }}
                  className={`w-full rounded-[16px] border px-5 py-3.5 text-left transition-[border-color,background] duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:px-6 ${
                    isActive
                      ? "border-[rgba(184,164,255,0.38)] bg-[rgba(16,26,50,0.85)]"
                      : "border-transparent hover:border-[rgba(184,164,255,0.14)]"
                  }`}
                >
                  <span
                    className={`text-[11px] tracking-[0.2em] ${
                      isActive ? "text-[#7C5CFF]" : "text-[#4A5568]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {c.index}
                  </span>
                  <h3
                    className={`mt-1 text-[1.15rem] tracking-[-0.02em] md:text-[1.25rem] ${
                      isActive ? "text-[#F4F7FC]" : "text-[#9AA8C0]"
                    }`}
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {c.title}
                  </h3>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={cap.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeEditorial }}
              className="overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)]"
            >
              <div className="relative aspect-[16/9] bg-[#07101f]">
                <Image
                  src={cap.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/40 to-transparent" />
              </div>
              <div className="bg-[rgba(10,18,36,0.92)] p-6 md:p-8">
                <div className="grid gap-6 sm:grid-cols-3">
                  {(
                    [
                      ["Problem", cap.problem, "#6B7890"],
                      ["Approach", cap.approach, "#7C5CFF"],
                      ["Outcome", cap.outcome, "#B8A4FF"],
                    ] as const
                  ).map(([label, text, color]) => (
                    <div key={label}>
                      <p
                        className="text-[10px] uppercase tracking-[0.22em]"
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                          color,
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className={`mt-2 text-[13px] leading-relaxed ${
                          label === "Outcome"
                            ? "text-[#F4F7FC]/90"
                            : "text-[#9AA8C0]"
                        }`}
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
