"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const RELATED = [
  {
    href: "/services/cloud-data-infrastructure",
    label: "Cloud, Data & Intelligent Infrastructure",
    line: "The substrate agents and automation need to stay reliable.",
  },
  {
    href: "/services/digital-product-engineering",
    label: "Digital Product Engineering",
    line: "Product surfaces where AI experiences meet customers.",
  },
  {
    href: "/services/performance-marketing",
    label: "Performance Marketing",
    line: "Demand systems that feed — and learn from — the AI OS.",
  },
  {
    href: "/services/search-content",
    label: "Search & Content",
    line: "Knowledge and narrative that ground agents in brand truth.",
  },
  {
    href: "/services/brand-strategy",
    label: "Brand Strategy",
    line: "Positioning sharp enough that every AI interaction stays on-brand.",
  },
  {
    href: "/services",
    label: "Growth Operating System",
    line: "One partner. Every capability. AI-native across the stack.",
  },
] as const;

export function AiSolutionsRelated() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section
      ref={ref}
      id="related"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="ai-related-heading"
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
            Connected Capabilities
          </motion.p>
          <motion.h2
            id="ai-related-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.15rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.65rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            AI never works alone.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mt-5 text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Automation needs cloud. Agents need brand truth. Growth needs one
            partner across the OS.
          </motion.p>
        </div>

        <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {RELATED.map((r, i) => (
            <motion.li
              key={r.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.45,
                delay: 0.08 + i * 0.05,
                ease: easeOutExpo,
              }}
            >
              <a
                href={r.href}
                className="group flex h-full flex-col rounded-[18px] border border-[rgba(168,196,240,0.1)] px-5 py-5 transition-[border-color,background] duration-400 hover:border-[rgba(184,164,255,0.32)] hover:bg-[rgba(16,26,50,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:px-6 md:py-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="text-[1.15rem] tracking-[-0.02em] text-[#F4F7FC]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {r.label}
                  </h3>
                  <span
                    aria-hidden
                    className="text-[#7C5CFF] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                <p
                  className="mt-2 text-[13px] leading-relaxed text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {r.line}
                </p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
