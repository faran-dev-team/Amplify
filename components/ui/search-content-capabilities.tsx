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
    id: "technical",
    index: "01",
    title: "Technical SEO",
    problem: "Great content trapped behind crawl errors, slow pages, and broken structure.",
    approach: "Architecture, indexation, Core Web Vitals, and schema as growth infrastructure.",
    outcome: "Search engines can find, trust, and surface everything that deserves to rank.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "strategy",
    index: "02",
    title: "Content Strategy",
    problem: "Publishing without a map — topics compete, cannibalize, and never build gravity.",
    approach: "Intent-led topic ecosystems with pillars, clusters, and commercial sequencing.",
    outcome: "A content system that owns categories — not a calendar of one-offs.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "marketing",
    index: "03",
    title: "Content Marketing",
    problem: "Assets that inform but never convert — or convert without earning authority.",
    approach: "Editorial systems that serve search, sales, and brand in one narrative.",
    outcome: "Content that ranks, educates, and moves pipeline.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "onpage",
    index: "04",
    title: "On-Page SEO",
    problem: "Pages that ignore intent, bury proof, and leak relevance to competitors.",
    approach: "Message-match structure, internal links, and conversion-aware optimization.",
    outcome: "Pages that satisfy searchers and search engines — and convert both.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "offpage",
    index: "05",
    title: "Off-Page Authority",
    problem: "Thin backlink campaigns that look like spam and die under algorithm updates.",
    approach: "Digital PR, earned mentions, and relationship-led authority that lasts.",
    outcome: "Trust signals competitors can't buy overnight.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "local",
    index: "06",
    title: "Local SEO",
    problem: "Locations invisible in Maps and local pack while paid eats the budget.",
    approach: "Entity hygiene, reviews systems, and location pages built for intent.",
    outcome: "Local demand that compounds without perpetual ad spend.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "ai-content",
    index: "07",
    title: "AI Content Systems",
    problem: "Generic AI drafts that dilute brand voice and never survive quality review.",
    approach: "Research agents, brief systems, and human editorial control as one loop.",
    outcome: "Scale without sacrificing expertise, accuracy, or differentiation.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "monitor",
    index: "08",
    title: "Performance Monitoring",
    problem: "Rank tracking without revenue context — vanity charts that don't decide.",
    approach: "Dashboards joining Search Console, GA4, and CRM outcomes.",
    outcome: "Optimization priorities grounded in business impact.",
    image: "/capabilities/capability-software.png",
  },
];

export function SearchContentCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="sc-caps-heading"
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
            id="sc-caps-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Search disciplines that map to growth.
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
                      isActive ? "text-[#5B8DEF]" : "text-[#4A5568]"
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
                      ["Business Problem", cap.problem, "#6B7890"],
                      ["Scale 12x Strategy", cap.approach, "#5B8DEF"],
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
