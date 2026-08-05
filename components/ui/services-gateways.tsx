"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Gateway = {
  id: string;
  title: string;
  position: string;
  outcome: string;
  href: string;
  accent: string;
  featured?: boolean;
};

const GATEWAYS: Gateway[] = [
  {
    id: "ai",
    title: "AI Solutions & Automation",
    position: "Production AI that runs the business — agents, workflows, knowledge.",
    outcome: "Replace chaos with compounding operations.",
    href: "/services/ai-solutions",
    accent: "#B8A4FF",
    featured: true,
  },
  {
    id: "brand",
    title: "Brand Strategy",
    position: "Positioning sharp enough that every channel sells the same truth.",
    outcome: "Clarity that compounds across growth and product.",
    href: "/services/brand-strategy",
    accent: "#6EB8E8",
  },
  {
    id: "performance",
    title: "Performance Marketing",
    position: "Acquisition systems — not campaigns that reset every month.",
    outcome: "Predictable demand with shared instrumentation.",
    href: "/services/performance-marketing",
    accent: "#7C5CFF",
  },
  {
    id: "search",
    title: "Search & Content",
    position: "Organic and editorial engines built as growth infrastructure.",
    outcome: "Authority that turns into durable pipeline.",
    href: "/services/search-content",
    accent: "#5B8DEF",
  },
  {
    id: "web",
    title: "Digital Product Engineering",
    position: "Products engineered for speed, scale, and long-term maintainability.",
    outcome: "Software businesses can rely on — not websites that age overnight.",
    href: "/services/digital-product-engineering",
    accent: "#A8C5F0",
  },
  {
    id: "cloud",
    title: "Cloud, Data & Intelligent Infrastructure",
    position: "Intelligent infrastructure — cloud, data, APIs, DevOps, and AI as one system.",
    outcome: "Reliability that lets growth and AI compound safely.",
    href: "/services/cloud-data-infrastructure",
    accent: "#9AA8C0",
  },
];

function MiniOrbit({ accent, active }: { accent: string; active: boolean }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      <defs>
        <filter id={`gw-${uid}`}>
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke={accent}
        strokeWidth="0.8"
        strokeDasharray="2 4"
        opacity={active ? 0.55 : 0.25}
      />
      <circle
        cx="32"
        cy="32"
        r="12"
        fill={`${accent}22`}
        stroke={accent}
        strokeWidth="1"
        filter={`url(#gw-${uid})`}
        opacity={active ? 1 : 0.6}
      />
      <circle cx="32" cy="32" r="2.5" fill="#F5E9FF" opacity={active ? 1 : 0.5} />
      <circle cx="32" cy="10" r="2" fill={accent} opacity={active ? 0.9 : 0.4} />
    </svg>
  );
}

function FeaturedViz({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 280 180"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id={`feat-${uid}`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`featCore-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#7C5CFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[70, 48].map((r, i) => (
        <motion.circle
          key={r}
          cx="140"
          cy="90"
          r={r}
          fill="none"
          stroke="rgba(184,164,255,0.3)"
          strokeWidth="0.8"
          strokeDasharray={i === 0 ? "2 6" : undefined}
          animate={active ? { opacity: 0.7, rotate: i ? -360 : 360 } : { opacity: 0.35 }}
          transition={
            active
              ? { duration: 80, ease: "linear", repeat: Infinity }
              : { duration: 0.4 }
          }
          style={{ transformOrigin: "140px 90px" }}
        />
      ))}
      {[
        [140, 28],
        [210, 90],
        [140, 152],
        [70, 90],
      ].map(([x, y], i) => (
        <g key={i}>
          <line
            x1="140"
            y1="90"
            x2={x}
            y2={y}
            stroke="#7C5CFF"
            strokeWidth="0.8"
            opacity={active ? 0.45 : 0.2}
            filter={`url(#feat-${uid})`}
          />
          <circle
            cx={x}
            cy={y}
            r="5"
            fill="rgba(12,21,43,0.95)"
            stroke="#B8A4FF"
            strokeWidth="1"
          />
        </g>
      ))}
      <circle cx="140" cy="90" r="28" fill={`url(#featCore-${uid})`} />
      <circle cx="140" cy="90" r="3" fill="#D4C8FF" />
      <text
        x="140"
        y="118"
        textAnchor="middle"
        fill="#F4F7FC"
        fontSize="8"
        fontFamily="var(--font-space-grotesk), sans-serif"
        letterSpacing="0.16em"
      >
        AI OS
      </text>
    </svg>
  );
}

export function ServicesGateways() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const [hovered, setHovered] = useState<string | null>("ai");
  const featured = GATEWAYS.find((g) => g.featured)!;
  const secondary = GATEWAYS.filter((g) => !g.featured);

  return (
    <section
      ref={ref}
      id="gateways"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="gateways-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Flagship Services
          </motion.p>
          <motion.h2
            id="gateways-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.85rem] lg:text-[3.15rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Six gateways into the Growth OS.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mt-5 max-w-[34rem] text-[15px] leading-[1.7] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Each practice is its own operating layer. Start with AI — the
            intelligence that makes every other capability compound.
          </motion.p>
        </div>

        {/* Featured AI gateway */}
        <motion.a
          href={featured.href}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, delay: 0.15, ease: easeOutExpo }}
          onMouseEnter={() => setHovered(featured.id)}
          onFocus={() => setHovered(featured.id)}
          className="group relative mt-12 block overflow-hidden rounded-[28px] border border-[rgba(184,164,255,0.28)] bg-[rgba(10,18,36,0.72)] transition-[border-color,box-shadow] duration-500 hover:border-[rgba(184,164,255,0.5)] hover:shadow-[0_0_60px_rgba(124,92,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:mt-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_70%)]"
          />
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full border border-[rgba(124,92,255,0.35)] bg-[rgba(124,92,255,0.12)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#B8A4FF]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Featured · Flagship
                </span>
              </div>
              <h3
                className="mt-5 text-[2rem] leading-[1.1] tracking-[-0.035em] text-[#F4F7FC] md:text-[2.45rem]"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {featured.title}
              </h3>
              <p
                className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-[#9AA8C0]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {featured.position}
              </p>
              <p
                className="mt-3 text-[13px] tracking-[0.04em] text-[#B8A4FF]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {featured.outcome}
              </p>
              <span
                className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium tracking-[0.02em] text-[#F4F7FC]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Enter the AI Command Center
                <span
                  aria-hidden
                  className="text-[#7C5CFF] transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </div>
            <div className="relative min-h-[200px] border-t border-[rgba(168,196,240,0.1)] bg-[#07101f]/60 p-4 lg:min-h-[320px] lg:border-l lg:border-t-0">
              <FeaturedViz active={hovered === featured.id || hovered === null} />
            </div>
          </div>
        </motion.a>

        {/* Secondary gateways */}
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3 lg:gap-4">
          {secondary.map((g, i) => {
            const isHot = hovered === g.id;
            return (
              <motion.li
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.06,
                  ease: easeOutExpo,
                }}
                onMouseEnter={() => setHovered(g.id)}
                onMouseLeave={() => setHovered("ai")}
                onFocus={() => setHovered(g.id)}
              >
                <a
                  href={g.href}
                  className={`group flex h-full flex-col rounded-[22px] border p-6 transition-[border-color,background,transform,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:p-7 ${
                    isHot
                      ? "border-[rgba(184,164,255,0.35)] bg-[rgba(16,26,50,0.88)] shadow-[0_16px_40px_rgba(2,4,10,0.35)] -translate-y-0.5"
                      : "border-[rgba(168,196,240,0.1)] bg-transparent hover:border-[rgba(184,164,255,0.2)]"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <MiniOrbit accent={g.accent} active={isHot} />
                  <h3
                    className="mt-5 text-[1.25rem] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.35rem]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {g.title}
                  </h3>
                  <p
                    className="mt-2 flex-1 text-[13px] leading-relaxed text-[#9AA8C0]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {g.position}
                  </p>
                  <p
                    className={`mt-3 text-[12px] tracking-[0.04em] transition-opacity duration-400 ${
                      isHot ? "opacity-100 text-[#B8A4FF]" : "opacity-70 text-[#6B7890]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {g.outcome}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-[0.03em] text-[#F4F7FC]/90"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Explore service
                    <span
                      aria-hidden
                      className="text-[#7C5CFF] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
