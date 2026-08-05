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
    title: "Product Strategy",
    problem: "Building features without a thesis — roadmaps that don't move the business.",
    approach: "Outcome-led product definition with clear success metrics and constraints.",
    outcome: "Teams ship what matters — and know why it matters.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "uxui",
    index: "02",
    title: "UX/UI Design",
    problem: "Interfaces that look polished but create friction, support load, and churn.",
    approach: "Research-backed flows and design systems engineered for clarity and scale.",
    outcome: "Experiences users trust — and teams can extend without reinventing.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "web",
    index: "03",
    title: "Web Applications",
    problem: "Marketing sites asked to behave like products — then collapse under real use.",
    approach: "Application-grade frontends with performance, auth, and maintainability built in.",
    outcome: "Web products that feel native, fast, and ready for growth.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "mobile",
    index: "04",
    title: "Mobile Applications",
    problem: "Apps that ship once and age poorly — or never leave the backlog.",
    approach: "Cross-platform and native paths chosen for quality, speed, and long-term ownership.",
    outcome: "Mobile experiences that stay coherent with the rest of the product system.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "saas",
    index: "05",
    title: "SaaS Platforms",
    problem: "Multi-tenant complexity that wasn't designed for — billing, roles, and scale as afterthoughts.",
    approach: "Platform architecture for tenancy, permissions, and extensibility from day one.",
    outcome: "SaaS that can onboard customers without rewriting the core.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "api",
    index: "06",
    title: "API Development",
    problem: "Integrations that break silently and documentation that lies.",
    approach: "Versioned contracts, security, and developer experience as first-class design.",
    outcome: "APIs partners and products can depend on.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "backend",
    index: "07",
    title: "Backend Systems",
    problem: "Business logic trapped in fragile scripts and opaque databases.",
    approach: "Domain-driven services with clear boundaries, data models, and observability.",
    outcome: "A core that can evolve without fear.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "perf",
    index: "08",
    title: "Performance Optimization",
    problem: "Products that feel slow — users leave before value lands.",
    approach: "Profiling, caching, rendering strategy, and infrastructure tuned to real bottlenecks.",
    outcome: "Speed that converts — and costs less under load.",
    image: "/capabilities/capability-growth.png",
  },
];

export function DigitalProductEngineeringCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="dpe-caps-heading"
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
            id="dpe-caps-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Engineering disciplines that map to outcomes.
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="max-h-[520px] space-y-1.5 overflow-y-auto pr-1 lg:max-h-none">
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
                    delay: 0.06 + i * 0.03,
                    ease: easeOutExpo,
                  }}
                  className={`w-full rounded-[16px] border px-5 py-3 text-left transition-[border-color,background] duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:px-6 ${
                    isActive
                      ? "border-[rgba(168,197,240,0.38)] bg-[rgba(16,26,50,0.85)]"
                      : "border-transparent hover:border-[rgba(184,164,255,0.14)]"
                  }`}
                >
                  <span
                    className={`text-[11px] tracking-[0.2em] ${
                      isActive ? "text-[#A8C5F0]" : "text-[#4A5568]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {c.index}
                  </span>
                  <h3
                    className={`mt-1 text-[1.1rem] tracking-[-0.02em] md:text-[1.2rem] ${
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
              className="overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] lg:sticky lg:top-28"
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
                      ["Engineering Approach", cap.approach, "#A8C5F0"],
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
