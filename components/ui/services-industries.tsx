"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Industry = {
  id: string;
  title: string;
  focus: string;
  depth: string;
  image: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "saas",
    title: "SaaS",
    focus: "Pipeline without vendor sprawl",
    depth: "Replace five channel specialists with one OS — paid, SEO, content, and automation sharing instrumentation.",
    image: "/ecosystem/saas.jpg",
  },
  {
    id: "tech",
    title: "Tech Startups",
    focus: "Velocity without chaos",
    depth: "AI-native demand and product surfaces that move at startup speed while earning enterprise trust.",
    image: "/ecosystem/technology.jpg",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    focus: "Modernization without risk theatre",
    depth: "Secure infrastructure and experiences that protect patient trust while growth systems accelerate.",
    image: "/ecosystem/healthcare.jpg",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    focus: "Multi-channel past the $2M wall",
    depth: "Paid, search, content, and analytics orchestrated so scale does not reset every quarter.",
    image: "/ecosystem/ecommerce.jpg",
  },
  {
    id: "pro",
    title: "Professional Services",
    focus: "Authority that converts",
    depth: "Brand and demand systems for firms selling expertise — premium positioning with measurable pipeline.",
    image: "/ecosystem/proservices.jpg",
  },
  {
    id: "home",
    title: "Home Services",
    focus: "Local demand, professional ops",
    depth: "Acquisition and measurement built for operators ready to stop guessing and start compounding.",
    image: "/ecosystem/homeservices.jpg",
  },
];

export function ServicesIndustries() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="industries"
      className="relative scroll-mt-28 px-5 pb-10 pt-4 md:px-8 md:pb-14 md:pt-6"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[640px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80 md:text-[12px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Chapter 07 · Context
          </motion.p>
          <motion.h2
            id="industries-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.15rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.65rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Same OS. Different pressure.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Built for US B2B operators with real budgets — tired of juggling five
            agencies, ready for one compounding system.
          </motion.p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {INDUSTRIES.map((ind, i) => {
            const isHot = hovered === ind.id;
            return (
              <motion.li
                key={ind.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.06,
                  ease: easeOutExpo,
                }}
                onMouseEnter={() => setHovered(ind.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(ind.id)}
                onBlur={() => setHovered(null)}
                className="group relative"
              >
                <article
                  tabIndex={0}
                  className={`relative overflow-hidden rounded-[24px] border transition-[border-color,box-shadow,transform] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 ${
                    isHot
                      ? "border-[rgba(184,164,255,0.38)] shadow-[0_20px_50px_rgba(2,4,10,0.45),0_0_40px_rgba(124,92,255,0.1)]"
                      : "border-[rgba(168,196,240,0.12)]"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isHot ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={ind.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover transition-transform duration-700 ${
                        isHot ? "scale-[1.05]" : "scale-100"
                      }`}
                      style={{
                        transitionTimingFunction:
                          "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/55 to-transparent" />
                    <div
                      className={`absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(124,92,255,0.22),transparent_70%)] transition-opacity duration-500 ${
                        isHot ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  <div className="relative bg-[rgba(10,18,36,0.88)] px-5 pb-5 pt-4 md:px-6 md:pb-6">
                    <h3
                      className="text-[1.35rem] tracking-[-0.025em] text-[#F4F7FC]"
                      style={{
                        fontFamily:
                          "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      {ind.title}
                    </h3>
                    <p
                      className="mt-1 text-[12px] tracking-[0.06em] text-[#B8A4FF]/85"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {ind.focus}
                    </p>
                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ${
                        isHot
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className="text-[13px] leading-relaxed text-[#9AA8C0]"
                          style={{
                            fontFamily:
                              "var(--font-space-grotesk), sans-serif",
                          }}
                        >
                          {ind.depth}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
