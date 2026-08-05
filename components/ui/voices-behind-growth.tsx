"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Design tokens — Scale 12x system
───────────────────────────────────────────── */

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const HOLD_MS = 3000;

type Story = {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  portrait: string;
  quoteLines: [string, string];
  story: string;
};

const STORIES: Story[] = [
  {
    id: "elena",
    name: "Elena Vasquez",
    role: "Founder & CEO",
    company: "NovaOps",
    industry: "SaaS",
    portrait: "/voices/founder-02.jpg",
    quoteLines: [
      "We stopped managing five agencies.",
      "We started building one growth system.",
    ],
    story:
      "Paid, SEO, content, and automation finally moved as one — with startup speed and enterprise depth.",
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    role: "COO",
    company: "Meridian Commerce",
    industry: "E-Commerce",
    portrait: "/voices/founder-01.jpg",
    quoteLines: [
      "We didn't need another agency.",
      "We needed growth we could stand behind.",
    ],
    story:
      "Past $2M, channel sprawl was expensive. One AI-native partner restored a single operating rhythm.",
  },
  {
    id: "amira",
    name: "Amira Okonkwo",
    role: "Chief Product Officer",
    company: "Aether Care",
    industry: "Healthcare",
    portrait: "/voices/founder-04.jpg",
    quoteLines: [
      "In healthcare, trust is the product.",
      "We needed transformation without vendor sprawl.",
    ],
    story:
      "Website, AI workflows, cloud, and security under one partner — modernization without diluted accountability.",
  },
  {
    id: "jordan",
    name: "Jordan Hale",
    role: "Managing Partner",
    company: "Lumen Advisory",
    industry: "Professional Services",
    portrait: "/voices/founder-03.jpg",
    quoteLines: [
      "Sprawl is the product most agencies sell.",
      "Scale 12x is the fix.",
    ],
    story:
      "Brand, site, and narrative finally matched the firm. Prospects arrive further along. Meetings start with substance.",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "VP of Operations",
    company: "Summit Infra",
    industry: "Home Services",
    portrait: "/voices/founder-05.jpg",
    quoteLines: [
      "Serious growth investment,",
      "without enterprise bloat.",
    ],
    story:
      "Launch made the foundation possible. Scale is ready when the pipeline demands it — founder-led, transparent, retained.",
  },
];

/* ─────────────────────────────────────────────
   5-star rating
───────────────────────────────────────────── */

function StarRating({ id }: { id: string }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(250,204,21,0.28)] bg-[rgba(250,204,21,0.08)] px-3 py-1.5 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
      aria-label="Rated 5 out of 5 stars"
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.6, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.045,
              duration: 0.35,
              ease: easeEditorial,
            }}
            className="relative inline-flex"
            aria-hidden
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              className="drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
            >
              <defs>
                <linearGradient
                  id={`s12-star-${id}-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="45%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
              <path
                d="M12 2.6l2.7 5.7 6.2.7-4.6 4.3 1.3 6.1L12 16.5 6.4 19.4l1.3-6.1L3.1 9l6.2-.7L12 2.6z"
                fill={`url(#s12-star-${id}-${i})`}
              />
            </svg>
          </motion.span>
        ))}
      </div>
      <span
        className="text-[11px] font-medium tabular-nums tracking-[0.08em] text-[#FDE68A]"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        5.0
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Featured editorial card
───────────────────────────────────────────── */

function FeaturedStory({
  story,
  index,
  total,
  reduced,
}: {
  story: Story;
  index: number;
  total: number;
  reduced: boolean;
}) {
  const n = String(index + 1).padStart(2, "0");
  const t = String(total).padStart(2, "0");

  return (
    <article className="grid overflow-hidden rounded-[24px] border border-[rgba(168,196,240,0.12)] bg-[linear-gradient(165deg,rgba(16,26,50,0.96)_0%,rgba(10,18,36,0.92)_100%)] shadow-[inset_0_1px_0_rgba(232,240,255,0.07),0_28px_80px_rgba(2,4,10,0.55),0_0_60px_rgba(124,92,255,0.06)] md:grid-cols-[0.38fr_0.62fr] md:rounded-[28px] lg:grid-cols-[0.4fr_0.6fr]">
      {/* Portrait — magazine cover */}
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[420px] lg:min-h-[460px]">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reduced ? undefined : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.95, ease: easeEditorial }}
        >
          <Image
            src={story.portrait}
            alt={`${story.name}, ${story.role} at ${story.company}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={index === 0}
            className="object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03]"
          />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1224]/80 via-transparent to-[#0A1224]/15 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0A1224]/55"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(168,196,240,0.1)]"
        />
        <p
          className="absolute left-5 top-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#F4F7FC]/70 md:left-6 md:top-6"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {story.industry}
        </p>
      </div>

      {/* Editorial content */}
      <div className="relative flex flex-col justify-center px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-14 lg:py-14">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: easeEditorial }}
          className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#B8A4FF]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Featured Story
            <span className="mx-2.5 text-[#4A5568]">·</span>
            <span className="tabular-nums text-[#6B7890]">
              {n} / {t}
            </span>
          </p>
          <StarRating id={story.id} />
        </motion.div>

        <blockquote>
          {story.quoteLines.map((line, i) => (
            <motion.p
              key={`${story.id}-q-${i}`}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.18 + i * 0.08,
                duration: 0.7,
                ease: easeEditorial,
              }}
              className="text-[1.65rem] font-medium leading-[1.18] tracking-[-0.03em] text-[#F4F7FC] sm:text-[1.85rem] md:text-[2.15rem] lg:text-[2.35rem]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {i === 0 ? `“${line}` : line}
              {i === story.quoteLines.length - 1 ? "”" : ""}
            </motion.p>
          ))}
        </blockquote>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.65, ease: easeEditorial }}
          className="mt-6 max-w-md text-[14px] leading-relaxed text-[#9AA8C0] md:mt-7 md:text-[15px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {story.story}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: easeEditorial }}
          className="mt-8 md:mt-10"
        >
          <p
            className="text-[16px] font-medium tracking-[-0.015em] text-[#F4F7FC]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {story.name}
          </p>
          <p
            className="mt-1 text-[13px] tracking-[0.01em] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {story.role}
          </p>
          <p
            className="mt-0.5 text-[13px] tracking-[0.02em] text-[#6B7890]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {story.company}
          </p>
        </motion.div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Controls
───────────────────────────────────────────── */

function ProgressRail({
  index,
  total,
  progress,
  onSelect,
}: {
  index: number;
  total: number;
  progress: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-2"
      role="tablist"
      aria-label="Featured stories"
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Show story ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`relative h-1 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/50 ${
              active
                ? "w-10 bg-[rgba(168,196,240,0.15)]"
                : "w-1.5 bg-[rgba(168,196,240,0.22)] hover:bg-[rgba(184,164,255,0.4)]"
            }`}
          >
            {active && (
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-full bg-[#B8A4FF]"
                style={{ width: `${progress * 100}%` }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */

export function VoicesBehindGrowth() {
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const indexRef = useRef(0);
  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "-6% 0px -8% 0px",
  });
  const reduced = !!useReducedMotion();

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const total = STORIES.length;
  const story = STORIES[index];

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback((nextIndex: number) => {
    const safe =
      ((nextIndex % STORIES.length) + STORIES.length) % STORIES.length;
    indexRef.current = safe;
    setIndex(safe);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo(indexRef.current + 1);
  }, [goTo]);

  const prev = useCallback(() => {
    goTo(indexRef.current - 1);
  }, [goTo]);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, next, prev]);

  // Reliable interval autoplay (4s)
  useEffect(() => {
    const canPlay = inView && tabVisible && !paused && !reduced;
    if (!canPlay) return;

    const started = performance.now();
    let raf = 0;
    let advanced = false;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / HOLD_MS);
      setProgress(t);
      if (t >= 1 && !advanced) {
        advanced = true;
        goTo(indexRef.current + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, tabVisible, paused, reduced, index, goTo]);

  useEffect(() => {
    const nextStory = STORIES[(index + 1) % total];
    const img = new window.Image();
    img.src = nextStory.portrait;
  }, [index, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    setPaused(false);
    if (Math.abs(dx) < 48) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Voices behind the scale"
      aria-roledescription="carousel"
      className="relative z-[8] -mt-28 overflow-hidden py-12 pb-16 md:-mt-36 md:py-16 md:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050814]/15 via-transparent to-[#050814]/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[420px] w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.12)_0%,rgba(91,141,239,0.06)_40%,transparent_70%)] blur-[2px]"
      />

      <div className="relative z-[6] mx-auto max-w-[1120px] px-5 md:px-8">
        <div className="mb-8 text-center md:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#B8A4FF]/80 md:text-[12px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Voices Behind the Scale
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9, delay: 0.06, ease: easeEditorial }}
            className="mx-auto max-w-2xl text-[2.15rem] font-medium leading-[1.08] tracking-[-0.035em] text-[#F4F7FC] md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Featured success stories.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.75, delay: 0.14, ease: easeEditorial }}
            className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-[#9AA8C0] md:mt-4 md:text-[15px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Founders and operators who chose one AI-native partner over agency
            sprawl.
          </motion.p>
        </div>

        <div
          className="group/card relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.35, ease: easeEditorial }}
            >
              <FeaturedStory
                story={story}
                index={index}
                total={total}
                reduced={reduced}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-30 mt-6 flex items-center justify-between gap-4 pointer-events-auto md:mt-8">
          <ProgressRail
            index={index}
            total={total}
            progress={reduced ? 0 : progress}
            onSelect={goTo}
          />

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => prev()}
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(168,196,240,0.22)] bg-[#0C152B] text-[#A8C5F0] transition-colors hover:border-[#FACC15]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/50"
            >
              <span aria-hidden className="text-[16px] group-hover:-translate-x-0.5 transition-transform">
                ←
              </span>
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => next()}
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(168,196,240,0.22)] bg-[#0C152B] text-[#A8C5F0] transition-colors hover:border-[#FACC15]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/50"
            >
              <span aria-hidden className="text-[16px] group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {story.name}, {story.role} at {story.company}. {story.quoteLines.join(" ")}
      </div>
    </section>
  );
}
