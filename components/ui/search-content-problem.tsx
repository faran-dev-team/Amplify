"use client";

import React from "react";
import { motion } from "framer-motion";
import { useProblemScroll } from "@/lib/use-problem-scroll";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FAILURES = [
  {
    id: "structure",
    label: "Poor website structure",
    detail:
      "Crawl paths break. Pages compete. Search engines can't map what you sell — so buyers can't either.",
  },
  {
    id: "random",
    label: "Random content",
    detail:
      "Blogs without a system. Topics without clusters. Effort that never compounds into authority.",
  },
  {
    id: "authority",
    label: "Weak authority",
    detail:
      "No earned trust signals. Competitors with thinner content outrank you because the web believes them more.",
  },
  {
    id: "topics",
    label: "Disconnected topics",
    detail:
      "Every page stands alone. No topical gravity. Search sees fragments — not an ecosystem.",
  },
  {
    id: "intent",
    label: "No search intent",
    detail:
      "Content answers questions nobody asks — or ranks for traffic that never converts.",
  },
  {
    id: "strategy",
    label: "No strategy",
    detail:
      "SEO as a checklist. Content as a calendar. Growth as hope. Nothing compounds.",
  },
] as const;

export function SearchContentProblem() {
  const { ref, inView, active, progress, select } = useProblemScroll(
    FAILURES.length
  );
  const barWidth = `${Math.max(12, progress * 100)}%`;
  const railFill = `${((active + 1) / FAILURES.length) * 100}%`;

  return (
    <section
      ref={ref}
      id="problem"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="sc-problem-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.65, ease: easeEditorial }}
              className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Why Organic Growth Fails
            </motion.p>
            <motion.h2
              id="sc-problem-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
              className="mt-4 max-w-[14ch] text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Invisible is expensive.
              <span className="mt-1 block text-[#9AA8C0]">
                Ecosystems compound.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
              className="mt-5 max-w-[28rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Most teams publish more when what they need is a connected search
              system — intent, structure, authority, and measurement sharing one
              signal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.2, ease: easeEditorial }}
              className="mt-8 max-w-[22rem]"
            >
              <div
                className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#6B7890]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span>Scattered</span>
                <span className="text-[#B8A4FF]">Ecosystem</span>
              </div>
              <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[rgba(168,196,240,0.12)]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#6B7890] via-[#5B8DEF] to-[#B8A4FF]"
                  animate={{ width: barWidth }}
                  transition={{ duration: 0.25, ease: easeOutExpo }}
                />
              </div>
            </motion.div>

            <a
              href="#system"
              className="group mt-8 inline-flex items-center gap-2 text-[13px] tracking-[0.04em] text-[#B8A4FF] transition-colors hover:text-[#F4F7FC]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Enter the Search Intelligence System
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          <ol className="relative">
            <div
              aria-hidden
              className="absolute bottom-6 left-[15px] top-6 w-px bg-[rgba(168,196,240,0.12)] md:left-[19px]"
            />
            <motion.div
              aria-hidden
              className="absolute left-[15px] top-6 w-px origin-top bg-gradient-to-b from-[#A8C5F0] via-[#5B8DEF] to-[#7C5CFF]/40 md:left-[19px]"
              animate={{ height: railFill }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              style={{ maxHeight: "calc(100% - 3rem)" }}
            />
            {FAILURES.map((item, i) => {
              const isActive = active === i;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: easeOutExpo,
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    className={`relative flex w-full gap-5 py-3.5 text-left transition-opacity duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:gap-6 md:py-4 ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-75"
                    }`}
                  >
                    <span
                      className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-[#0c152b] text-[11px] transition-[border-color,box-shadow] duration-400 ${
                        isActive
                          ? "border-[rgba(168,197,240,0.5)] shadow-[0_0_20px_rgba(91,141,239,0.3)] text-[#A8C5F0]"
                          : "border-[rgba(168,196,240,0.2)] text-[#6B7890]"
                      }`}
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className={`text-[1.1rem] tracking-[-0.02em] md:text-[1.25rem] ${
                          isActive ? "text-[#F4F7FC]" : "text-[#9AA8C0]"
                        }`}
                        style={{
                          fontFamily:
                            "var(--font-playfair), 'Playfair Display', serif",
                        }}
                      >
                        {item.label}
                      </h3>
                      <p
                        className={`mt-1.5 max-w-[28rem] text-[13px] leading-relaxed transition-opacity duration-400 ${
                          isActive
                            ? "text-[#9AA8C0] opacity-100"
                            : "opacity-0"
                        }`}
                        style={{
                          fontFamily: "var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
