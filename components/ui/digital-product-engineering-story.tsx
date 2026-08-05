"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BEATS = [
  {
    id: "challenge",
    label: "Business Challenge",
    body: "Patients and providers moved across disconnected tools. Trust eroded with every handoff. The stack couldn't keep up with care.",
  },
  {
    id: "discovery",
    label: "Discovery",
    body: "Healthcare buyers don't need more agencies. They need one partner who can transform product, experience, and infrastructure together.",
  },
  {
    id: "engineering",
    label: "Engineering",
    body: "Full product rebuild, custom AI workflows, cloud and data foundations, cybersecurity essentials — shipped as one system.",
  },
  {
    id: "launch",
    label: "Launch",
    body: "Weekly founder cadence. White-glove account management. Slack for daily ops. Startup speed with enterprise depth.",
  },
  {
    id: "impact",
    label: "Business Impact",
    body: "One connected growth system. Experiences patients trust. Infrastructure the business can scale without adding another vendor.",
  },
] as const;

const METRICS = [
  { value: "Unified", label: "Product + infra" },
  { value: "AI-native", label: "Workflows" },
  { value: "Secure", label: "By design" },
] as const;

export function DigitalProductEngineeringStory() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      id="story"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="dpe-story-heading"
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
            Featured Product Story
          </motion.p>
          <motion.h2
            id="dpe-story-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Modernizing care without another vendor.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mt-5 text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Healthcare · Product Engineering · Cloud · AI
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
                src="/transformations/archive-health.jpg"
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
                    delay: 0.15 + i * 0.07,
                    ease: easeOutExpo,
                  }}
                  className={`border-l-2 py-4 pl-5 text-left transition-[border-color,opacity] duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:py-5 md:pl-6 ${
                    isActive
                      ? "border-[#A8C5F0] opacity-100"
                      : "border-[rgba(168,196,240,0.15)] opacity-45 hover:opacity-70"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.24em] ${
                      isActive ? "text-[#A8C5F0]" : "text-[#4A5568]"
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
