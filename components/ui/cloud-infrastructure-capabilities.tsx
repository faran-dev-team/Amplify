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
    id: "architecture",
    index: "01",
    title: "Cloud Architecture",
    problem: "Cloud accounts without an architecture — spend rises, reliability doesn't.",
    approach: "Reference architectures for regions, networks, tenancy, and failure domains.",
    outcome: "A foundation that scales with the business — not against it.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "engineering",
    index: "02",
    title: "Infrastructure Engineering",
    problem: "Snowflakes and tribal knowledge. Environments that can't be reproduced.",
    approach: "Infrastructure as code, environments as products, change as a controlled pipeline.",
    outcome: "Consistency across staging and production — without heroics.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "api",
    index: "03",
    title: "API Development & Integration",
    problem: "Integrations that break silently and documentation that lies.",
    approach: "Versioned contracts, gateways, and security as first-class design.",
    outcome: "Systems that compose — partners and products that can depend on each other.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "data",
    index: "04",
    title: "Data Platforms",
    problem: "Silos that make reporting slow and AI impossible.",
    approach: "Pipelines, warehouses, and governance designed for trustworthy decisioning.",
    outcome: "One source of truth that products, growth, and AI can share.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "devops",
    index: "05",
    title: "DevOps & CI/CD",
    problem: "Release day as theater — fear replacing cadence.",
    approach: "Automated pipelines, progressive delivery, and environments that mirror reality.",
    outcome: "Shipping that feels boring — in the best enterprise sense.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "observability",
    index: "06",
    title: "Monitoring & Observability",
    problem: "Dashboards nobody watches until something is already on fire.",
    approach: "SLOs, traces, and alerts that map to user impact — not vanity metrics.",
    outcome: "Issues caught before customers feel them.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "ai-infra",
    index: "07",
    title: "AI Infrastructure",
    problem: "Model demos that never survive production security, cost, or latency.",
    approach: "Inference paths, vector stores, and guardrails on the same observed stack.",
    outcome: "AI that runs like infrastructure — reliable, governed, and measurable.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "security",
    index: "08",
    title: "Security & Compliance",
    problem: "Controls bolted on after the architecture is already fragile.",
    approach: "Identity, encryption, audit, and least privilege designed into the platform.",
    outcome: "Trust that auditors and customers can verify.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "resilience",
    index: "09",
    title: "Disaster Recovery & Resilience",
    problem: "Backups that exist on paper — and fail when tested under pressure.",
    approach: "RTO/RPO design, failover drills, and multi-region strategies that match risk.",
    outcome: "Business continuity that holds when the unexpected arrives.",
    image: "/capabilities/capability-growth.png",
  },
];

export function CloudInfrastructureCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="ci-caps-heading"
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
            id="ci-caps-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Disciplines that map to business confidence.
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
