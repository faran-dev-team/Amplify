"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type CaseStudy = {
  id: string;
  featured?: boolean;
  industry: string;
  tier: string;
  title: string;
  outcome: string;
  image: string;
  metrics: { value: string; label: string }[];
};

const CASES: CaseStudy[] = [
  {
    id: "saas-partner",
    featured: true,
    industry: "SaaS",
    tier: "Scale",
    title: "From agency sprawl to one AI-native partner",
    outcome:
      "A Series A/B team replaced five vendors with a single Growth OS across paid, SEO, content, and automation.",
    image: "/transformations/featured-after.jpg",
    metrics: [
      { value: "$10K", label: "Monthly retainer" },
      { value: "1", label: "Partner" },
      { value: "4hr", label: "Priority response" },
    ],
  },
  {
    id: "health-system",
    industry: "Healthcare",
    tier: "Dominate",
    title: "Modernizing care without another vendor",
    outcome:
      "End-to-end modernization across brand, web, AI workflows, and secure infrastructure — startup speed, enterprise depth.",
    image: "/transformations/archive-health.jpg",
    metrics: [
      { value: "$20K", label: "Monthly retainer" },
      { value: "90-day", label: "Setup guarantee" },
    ],
  },
  {
    id: "commerce-scale",
    industry: "E-Commerce",
    tier: "Scale",
    title: "Multi-channel growth past $2M",
    outcome:
      "Paid, SEO, content, and LinkedIn under one AI-native operating rhythm — measurement closed the loop.",
    image: "/transformations/archive-commerce.jpg",
    metrics: [
      { value: "$10K", label: "Monthly retainer" },
      { value: "Multi", label: "Channel system" },
    ],
  },
];

export function ServicesCases() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const featured = CASES.find((c) => c.featured)!;
  const archive = CASES.filter((c) => !c.featured);

  return (
    <section
      ref={ref}
      id="cases"
      className="relative scroll-mt-28 px-5 pb-16 pt-4 md:px-8 md:pb-24 md:pt-6"
      aria-labelledby="cases-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.65, ease: easeEditorial }}
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80 md:text-[12px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Chapter 08 · Proof
            </motion.p>
            <motion.h2
              id="cases-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
              className="mt-4 text-[2.15rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.65rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Sprawl ends. Scale compounds.
            </motion.h2>
          </div>
          <motion.a
            href="/#work"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15, ease: easeEditorial }}
            className="group inline-flex items-center gap-2 text-[13px] tracking-[0.04em] text-[#B8A4FF] transition-colors hover:text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            View full archive
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </motion.a>
        </div>

        {/* Featured editorial block */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.12, ease: easeOutExpo }}
          className="mt-12 overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] md:mt-14"
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[280px] md:min-h-[420px]">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority={false}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050814]/80 max-lg:bg-gradient-to-t max-lg:from-[#050814] max-lg:via-[#050814]/30 max-lg:to-transparent" />
            </div>
            <div className="flex flex-col justify-center bg-[rgba(10,18,36,0.92)] p-7 md:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full border border-[rgba(168,196,240,0.16)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {featured.industry}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] text-[#7C5CFF]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {featured.tier} tier
                </span>
              </div>
              <h3
                className="mt-5 text-[1.65rem] leading-[1.15] tracking-[-0.03em] text-[#F4F7FC] md:text-[2rem]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {featured.title}
              </h3>
              <p
                className="mt-4 text-[14px] leading-relaxed text-[#9AA8C0] md:text-[15px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {featured.outcome}
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[rgba(168,196,240,0.12)] pt-6">
                {featured.metrics.map((m) => (
                  <div key={m.label}>
                    <dt
                      className="text-[10px] uppercase tracking-[0.16em] text-[#6B7890]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {m.label}
                    </dt>
                    <dd
                      className="mt-1.5 text-[1.35rem] tracking-[-0.03em] text-[#F4F7FC] md:text-[1.55rem]"
                      style={{
                        fontFamily:
                          "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.article>

        {/* Secondary editorial pair */}
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {archive.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                delay: 0.25 + i * 0.08,
                ease: easeOutExpo,
              }}
            >
              <article className="group overflow-hidden rounded-[24px] border border-[rgba(168,196,240,0.12)] transition-[border-color] duration-500 hover:border-[rgba(184,164,255,0.32)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      transitionTimingFunction:
                        "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <span
                      className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#F4F7FC]/90 backdrop-blur-sm"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {c.industry}
                    </span>
                    <span
                      className="rounded-full border border-[#7C5CFF]/35 bg-[#7C5CFF]/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#B8A4FF] backdrop-blur-sm"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {c.tier}
                    </span>
                  </div>
                </div>
                <div className="bg-[rgba(10,18,36,0.9)] p-6 md:p-7">
                  <h3
                    className="text-[1.35rem] leading-snug tracking-[-0.025em] text-[#F4F7FC]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-3 text-[13px] leading-relaxed text-[#9AA8C0] md:text-[14px]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {c.outcome}
                  </p>
                  <dl className="mt-5 flex gap-8 border-t border-[rgba(168,196,240,0.1)] pt-5">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <dt
                          className="text-[10px] uppercase tracking-[0.16em] text-[#6B7890]"
                          style={{
                            fontFamily:
                              "var(--font-space-grotesk), sans-serif",
                          }}
                        >
                          {m.label}
                        </dt>
                        <dd
                          className="mt-1 text-[1.2rem] tracking-[-0.03em] text-[#F4F7FC]"
                          style={{
                            fontFamily:
                              "var(--font-playfair), 'Playfair Display', serif",
                          }}
                        >
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
