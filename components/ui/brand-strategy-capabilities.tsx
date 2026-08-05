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
    id: "strategy",
    index: "01",
    title: "Brand Strategy",
    problem: "Business goals and brand activity live in separate rooms.",
    approach: "Strategy that ties category ambition to commercial outcomes.",
    outcome: "A brand plan leadership can execute — and measure.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "positioning",
    index: "02",
    title: "Brand Positioning",
    problem: "You sound like everyone else — or like nothing at all.",
    approach: "Whitespace mapping, competitive framing, and a sharp position.",
    outcome: "Buyers know exactly why you — and why not the alternative.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "messaging",
    index: "03",
    title: "Messaging Framework",
    problem: "Every channel invents its own story. Consistency dies.",
    approach: "Narrative architecture: pillars, proof, and voice for every surface.",
    outcome: "Sales, marketing, and product speak one strategic language.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "identity",
    index: "04",
    title: "Visual Identity Direction",
    problem: "Look and feel without strategic intent becomes decoration.",
    approach: "Identity systems that encode positioning into recognition.",
    outcome: "Visual gravity that makes the brand unmistakable.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "guidelines",
    index: "05",
    title: "Brand Guidelines",
    problem: "Assets scatter. Quality erodes. New hires reinvent the brand.",
    approach: "Living systems — principles, not PDFs that gather dust.",
    outcome: "Scale without dilution. Consistency without bureaucracy.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "gtm",
    index: "06",
    title: "Go-To-Market Strategy",
    problem: "Launch without positioning is noise with a budget.",
    approach: "GTM sequences grounded in audience, message, and channel fit.",
    outcome: "Market entry that builds authority — not just awareness.",
    image: "/capabilities/capability-cloud.png",
  },
];

export function BrandStrategyCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="brand-caps-heading"
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
            Core Capabilities
          </motion.p>
          <motion.h2
            id="brand-caps-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Strategy that maps to business outcomes.
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
                      ["Business Challenge", cap.problem, "#6B7890"],
                      ["Our Strategic Approach", cap.approach, "#7C5CFF"],
                      ["Business Outcome", cap.outcome, "#B8A4FF"],
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
                          label === "Business Outcome"
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
