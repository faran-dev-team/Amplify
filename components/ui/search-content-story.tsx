"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BEATS = [
  {
    id: "challenge",
    label: "Challenge",
    body: "Growth meant juggling specialists. SEO lived in one silo, content in another. Quality diluted. Nobody owned the whole system.",
  },
  {
    id: "research",
    label: "Research",
    body: "Intent maps and competitive whitespace revealed where organic demand was real — and where paid was covering for invisibility.",
  },
  {
    id: "strategy",
    label: "Strategy",
    body: "One partner across SEO, content, and paid — topic ecosystems, technical health, and weekly operating rhythm as infrastructure.",
  },
  {
    id: "execution",
    label: "Execution",
    body: "Clusters shipped. Authority earned. Technical debt cleared. Content and search shared one brief and one dashboard.",
  },
  {
    id: "growth",
    label: "Organic Growth",
    body: "Visibility compounded. Qualified traffic rose. Paid stopped carrying the entire acquisition burden alone.",
  },
  {
    id: "results",
    label: "Business Results",
    body: "One partner. Every channel. Organic as a durable pipeline asset — not a quarterly experiment.",
  },
] as const;

const METRICS = [
  { value: "Ecosystem", label: "Topic architecture" },
  { value: "Unified", label: "SEO + content" },
  { value: "Compounding", label: "Organic pipeline" },
] as const;

export function SearchContentStory() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      id="story"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="sc-story-heading"
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
            Featured Transformation
          </motion.p>
          <motion.h2
            id="sc-story-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            From agency sprawl to one organic system.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mt-5 text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            SaaS · Search · Content · Growth Systems
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="relative overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)]"
          >
            <div className="relative aspect-[16/11] bg-[#07101f]">
              <Image
                src="/transformations/featured-after.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-6 p-6 md:gap-10 md:p-8">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <p
                    className="text-[1.35rem] tracking-[-0.02em] text-[#F4F7FC] md:text-[1.55rem]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {m.value}
                  </p>
                  <p
                    className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#9AA8C0]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            {BEATS.map((beat, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={beat.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.06,
                    ease: easeOutExpo,
                  }}
                  className={`border-l-2 py-3.5 pl-5 text-left transition-[border-color,opacity] duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:py-4 md:pl-6 ${
                    isActive
                      ? "border-[#A8C5F0] opacity-100"
                      : "border-[rgba(168,196,240,0.15)] opacity-45 hover:opacity-70"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.24em] ${
                      isActive ? "text-[#5B8DEF]" : "text-[#4A5568]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    0{i + 1} · {beat.label}
                  </p>
                  <p
                    className={`mt-2 text-[14px] leading-relaxed md:text-[15px] ${
                      isActive ? "text-[#F4F7FC]" : "text-[#9AA8C0]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {isActive ? beat.body : beat.label}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
