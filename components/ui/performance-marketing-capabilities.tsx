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
    id: "google",
    index: "01",
    title: "Google Ads",
    problem: "Search spend without intent discipline burns budget on vanity keywords.",
    approach: "Intent architecture, negative systems, and conversion-tied bidding.",
    outcome: "Lower CAC on high-intent demand that actually closes.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "meta",
    index: "02",
    title: "Meta Ads",
    problem: "Broad reach without creative systems produces expensive noise.",
    approach: "Audience intelligence + creative testing loops wired to revenue events.",
    outcome: "Scalable acquisition with unit economics that hold.",
    image: "/capabilities/capability-brand.png",
  },
  {
    id: "linkedin",
    index: "03",
    title: "LinkedIn Ads",
    problem: "B2B spend that looks professional but never reaches decision-makers.",
    approach: "Account-based targeting, offer sequencing, and CRM-closed loops.",
    outcome: "Qualified pipeline — not vanity impressions in the feed.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "tiktok",
    index: "04",
    title: "TikTok Ads",
    problem: "Trend chasing without measurement becomes entertainment spend.",
    approach: "Native creative systems with attribution that survives the platform.",
    outcome: "New demand channels that prove themselves in revenue — not views.",
    image: "/capabilities/capability-software.png",
  },
  {
    id: "cro",
    index: "05",
    title: "Conversion Rate Optimization",
    problem: "Traffic scales. Conversion doesn't. CAC climbs invisibly.",
    approach: "Hypothesis-driven tests across funnel friction and proof.",
    outcome: "More revenue from the same spend — permanently.",
    image: "/capabilities/capability-cloud.png",
  },
  {
    id: "landing",
    index: "06",
    title: "Landing Page Optimization",
    problem: "Ads promise one thing. Pages deliver another. Trust dies mid-click.",
    approach: "Message-match experiences engineered for speed and clarity.",
    outcome: "Higher conversion. Cleaner data. Creative that finally compounds.",
    image: "/capabilities/capability-growth.png",
  },
  {
    id: "attribution",
    index: "07",
    title: "Attribution",
    problem: "Last-click lies. Leadership stops trusting marketing entirely.",
    approach: "Server-side tracking, CRM joins, and multi-touch models that decide.",
    outcome: "Budget allocation grounded in truth — not platform vanity.",
    image: "/capabilities/capability-ai.png",
  },
  {
    id: "ai-opt",
    index: "08",
    title: "AI Campaign Optimization",
    problem: "Human pacing can't reallocate fast enough as markets shift.",
    approach: "Signal → pattern → budget → creative loops that run continuously.",
    outcome: "Campaigns that get sharper every week without heroics.",
    image: "/capabilities/capability-brand.png",
  },
];

export function PerformanceMarketingCapabilities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="pm-caps-heading"
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
            Performance Capabilities
          </motion.p>
          <motion.h2
            id="pm-caps-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Channels as infrastructure. Outcomes as the brief.
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
                      ["Scale 12x Approach", cap.approach, "#7C5CFF"],
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
