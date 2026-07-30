"use client";

import React, {
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────── */

const PURPLE = "#A855F7";
const PURPLE_SOFT = "#C084FC";
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

type Category =
  | "Strategy"
  | "Technology"
  | "Process"
  | "Timeline"
  | "Partnership"
  | "Growth";

type Exchange = {
  id: string;
  category: Category;
  question: string;
  answer: string[];
  /** Opening exchange — shown alone until explored */
  opening?: boolean;
  /** Emotional closer — bridges to CTA */
  closer?: boolean;
};

const EXCHANGES: Exchange[] = [
  {
    id: "hesitation",
    opening: true,
    category: "Strategy",
    question:
      "What usually prevents ambitious companies from taking the next step?",
    answer: [
      "Rarely is it a lack of ambition. More often it's uncertainty — about whether a partner will truly understand the business, or simply apply a template.",
      "The companies we work with aren't looking for another vendor. They're looking for clarity before commitment.",
      "That hesitation is healthy. It means the decision matters.",
    ],
  },
  {
    id: "team",
    category: "Partnership",
    question:
      "We already have an internal team. How would Amplify complement our existing workflow?",
    answer: [
      "We don't replace the people who know your business best. We amplify them.",
      "Your team brings institutional knowledge. We bring systems thinking, AI architecture, and a outside perspective sharpened by building growth engines across industries.",
      "The best partnerships feel like adding a specialized layer — not inserting a second company into the room.",
    ],
  },
  {
    id: "stack",
    category: "Technology",
    question: "Can you work with our current technology stack?",
    answer: [
      "Almost always. We design around what you already have — not against it.",
      "Rip-and-replace theater is expensive and usually unnecessary. We integrate with your stack, strengthen the weak seams, and introduce intelligence where it compounds.",
      "If something genuinely needs to change, we'll say so plainly — and explain why.",
    ],
  },
  {
    id: "different",
    category: "Strategy",
    question: "What makes Amplify different from a traditional agency?",
    answer: [
      "Agencies deliver projects. We build operating systems for growth.",
      "That means fewer decks, more durable infrastructure. Less campaign thinking. More compound advantage.",
      "You're not hiring us to make something look finished. You're partnering with us to make growth feel inevitable.",
    ],
  },
  {
    id: "efficiency",
    category: "Growth",
    question: "How do AI systems actually improve operational efficiency?",
    answer: [
      "Not by adding dashboards no one checks. By removing friction from decisions that already happen every day.",
      "When intelligence sits inside the workflow — routing, forecasting, prioritization, personalization — teams stop spending energy on coordination and start spending it on judgment.",
      "Efficiency isn't speed for its own sake. It's reclaiming attention for work that only humans can do.",
    ],
  },
  {
    id: "after-launch",
    category: "Process",
    question: "What does collaboration look like after launch?",
    answer: [
      "Launch is a milestone, not a farewell.",
      "We stay close through a calm operating cadence — reviewing signals, refining systems, and adjusting as the business evolves.",
      "The goal is a partnership that feels steady under pressure, not theatrical after every release.",
    ],
  },
  {
    id: "involvement",
    category: "Partnership",
    question: "How involved will our team need to be?",
    answer: [
      "Present for the decisions that matter. Protected from the noise that doesn't.",
      "We ask for clarity on goals, access to context, and honest feedback. We don't ask your leadership to become project managers.",
      "The right level of involvement feels like stewardship — not another full-time job.",
    ],
  },
  {
    id: "results",
    category: "Timeline",
    question: "How quickly can we expect measurable results?",
    answer: [
      "Some signals appear early — clearer workflows, faster cycles, sharper visibility. Compound outcomes take longer, and we won't pretend otherwise.",
      "We set expectations against your reality, not a generic timeline slide.",
      "If we can't see a path to meaningful measurement, we shouldn't begin.",
    ],
  },
  {
    id: "ready",
    closer: true,
    category: "Partnership",
    question: "What happens when we're ready?",
    answer: [
      "We begin with a conversation.",
      "No pitch theater. No premature proposals. Just a careful look at where you are, where you intend to go, and whether Amplify is the right partner for that journey.",
      "If it is, we'll know — and so will you.",
    ],
  },
];

/* ─────────────────────────────────────────────
   Soft arrival — signal settles into a listening node
───────────────────────────────────────────── */

function ListeningArrival({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-none relative mx-auto mb-10 h-40 w-full max-w-sm md:mb-14 md:h-44">
      <svg
        className="h-full w-full"
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={`listenBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`listenCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.65" />
            <stop offset="45%" stopColor={PURPLE} stopOpacity="0.32" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.path
          d="M 160 0 C 160 28, 160 48, 160 72"
          fill="none"
          stroke={PURPLE}
          strokeWidth={1.6}
          strokeLinecap="round"
          filter={`url(#listenBloom-${uid})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.35 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.4, ease: easeEditorial }}
        />

        {[
          "M 90 18 C 120 42, 145 62, 160 78",
          "M 230 16 C 200 40, 175 60, 160 78",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={PURPLE}
            strokeWidth={1.1}
            strokeLinecap="round"
            filter={`url(#listenBloom-${uid})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 0.14 - i * 0.02 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.55,
              delay: 0.18 + i * 0.1,
              ease: easeEditorial,
            }}
          />
        ))}

        <motion.circle
          cx={160}
          cy={96}
          r={28}
          fill={`url(#listenCore-${uid})`}
          filter={`url(#listenBloom-${uid})`}
          initial={{ opacity: 0, scale: 0.45 }}
          animate={
            active
              ? { opacity: 0.55, scale: 1 }
              : { opacity: 0, scale: 0.45 }
          }
          transition={{ duration: 1.25, delay: 0.45, ease: easeOutExpo }}
        />

        <motion.circle
          cx={160}
          cy={96}
          r={5}
          fill="#E9D5FF"
          initial={{ opacity: 0 }}
          animate={
            active
              ? {
                  opacity: [0.55, 0.9, 0.55],
                  scale: [1, 1.12, 1],
                }
              : { opacity: 0, scale: 1 }
          }
          transition={
            active
              ? {
                  duration: 3.6,
                  delay: 0.9,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : { duration: 0.4 }
          }
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Exit line → final CTA
───────────────────────────────────────────── */

function ConversationExit({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-none relative mx-auto mt-10 h-28 w-full max-w-xs md:mt-12 md:h-32">
      <svg
        className="h-full w-full"
        viewBox="0 0 240 120"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={`exitBloom-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M 120 8 C 120 40, 120 70, 120 118"
          fill="none"
          stroke={PURPLE}
          strokeWidth={2}
          strokeLinecap="round"
          filter={`url(#exitBloom-${uid})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.48 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.35, delay: 0.2, ease: easeEditorial }}
        />
        <motion.circle
          cx={120}
          cy={12}
          r={3.2}
          fill="#E9D5FF"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.85 : 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Answer — line-by-line reveal
───────────────────────────────────────────── */

function UnfoldingAnswer({
  lines,
  category,
  reduced,
}: {
  lines: string[];
  category: Category;
  reduced: boolean | null;
}) {
  return (
    <div className="overflow-hidden pt-1">
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeEditorial }}
        className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#A855F7]/55"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {category}
      </motion.p>

      <div className="space-y-4 md:space-y-5">
        {lines.map((line, i) => (
          <motion.p
            key={`${i}-${line.slice(0, 24)}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reduced ? 0 : 0.12 + i * 0.14,
              ease: easeEditorial,
            }}
            className="max-w-2xl text-[15px] leading-[1.75] text-white/55 md:text-[16px] md:leading-[1.8]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single exchange in the conversation
───────────────────────────────────────────── */

function ConversationTurn({
  exchange,
  index,
  open,
  explored,
  onSelect,
  isLastVisible,
}: {
  exchange: Exchange;
  index: number;
  open: boolean;
  explored: boolean;
  onSelect: () => void;
  isLastVisible: boolean;
}) {
  const reduced = useReducedMotion();
  const panelId = `exchange-panel-${exchange.id}`;
  const buttonId = `exchange-btn-${exchange.id}`;

  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        layout: { duration: 0.55, ease: easeOutExpo },
        opacity: { duration: 0.7, delay: reduced ? 0 : Math.min(index, 4) * 0.05, ease: easeEditorial },
        y: { duration: 0.7, delay: reduced ? 0 : Math.min(index, 4) * 0.05, ease: easeEditorial },
      }}
      className="relative mb-5 pl-10 md:mb-6 md:pl-12"
    >
      {/* Timeline node + path */}
      <div className="absolute left-0 top-0 bottom-0 w-5">
        <motion.span
          className="absolute left-1/2 top-[1.35rem] z-[1] block h-2.5 w-2.5 -translate-x-1/2 rounded-full md:top-[1.55rem]"
          style={{
            background: open || explored ? PURPLE_SOFT : "rgba(255,255,255,0.22)",
            boxShadow: open
              ? `0 0 16px ${PURPLE}88, 0 0 32px ${PURPLE}44`
              : explored
                ? `0 0 10px ${PURPLE}55`
                : "none",
          }}
          animate={
            open && !reduced
              ? { scale: [1, 1.18, 1] }
              : { scale: 1 }
          }
          transition={
            open && !reduced
              ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.35 }
          }
          aria-hidden
        />
        {!isLastVisible && (
          <span
            aria-hidden
            className={`absolute left-1/2 top-[1.85rem] bottom-[-1.35rem] w-px -translate-x-1/2 md:top-[2.05rem] ${
              explored || open
                ? "bg-gradient-to-b from-[#A855F7]/45 via-white/12 to-white/[0.04]"
                : "bg-gradient-to-b from-white/18 via-white/10 to-white/[0.04]"
            }`}
          />
        )}
      </div>

      <motion.div
        layout
        className={`group relative overflow-hidden rounded-[22px] border transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "border-[#A855F7]/25 bg-[#0A0B12]/90 shadow-[0_0_48px_rgba(168,85,247,0.12)]"
            : "border-white/[0.06] bg-[#0A0B12]/55 hover:border-white/[0.11] hover:bg-[#0A0B12]/75 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
        }`}
      >
        {/* Soft purple edge on hover / open */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-3 left-0 w-px rounded-full transition-opacity duration-500 ${
            open
              ? "bg-[#A855F7]/70 opacity-100"
              : "bg-[#A855F7]/40 opacity-0 group-hover:opacity-70"
          }`}
        />

        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onSelect}
          className="relative w-full px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/50 focus-visible:ring-offset-0 md:px-7 md:py-6"
        >
          <div className="flex items-start justify-between gap-4 md:gap-6">
            <h3
              className={`max-w-2xl text-[17px] font-medium leading-[1.35] tracking-[-0.02em] transition-colors duration-400 md:text-[20px] lg:text-[22px] ${
                open ? "text-white" : "text-white/80 group-hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {exchange.question}
            </h3>
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[15px] transition-colors duration-400 ${
                open
                  ? "border-[#A855F7]/35 text-[#E9D5FF]"
                  : "border-white/10 text-white/35 group-hover:border-white/20 group-hover:text-white/55"
              }`}
            >
              +
            </motion.span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={
                reduced
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              animate={{ opacity: 1, height: "auto" }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.55, ease: easeOutExpo }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/[0.05] px-5 pb-6 pt-1 md:px-7 md:pb-8">
                <UnfoldingAnswer
                  lines={exchange.answer}
                  category={exchange.category}
                  reduced={reduced}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */

export function ConversationBeforeBegin() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.06,
    margin: "-6% 0px -8% 0px",
  });
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.45 });
  const inviteInView = useInView(inviteRef, { once: false, amount: 0.4 });
  const reduced = useReducedMotion();

  const [openId, setOpenId] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(() => new Set());

  const select = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    setExplored((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const closerExplored = explored.has("ready") || openId === "ready";

  return (
    <section
      ref={sectionRef}
      id="conversation"
      aria-label="A conversation before we begin"
      className="relative z-0 -mt-28 overflow-hidden pb-36 pt-6 md:-mt-36 md:pb-48 md:pt-10"
    >
      {/* Calmest atmosphere on the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030208]/30 via-[#030208]/55 to-[#030208]/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] z-[1] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#A855F7]/[0.035] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#030208]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-[920px] px-5 md:px-8">
        <ListeningArrival active={(inView || headlineInView) && !reduced} />

        <div ref={headlineRef} className="relative z-[6] mb-14 text-center md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.32em] text-[#A855F7]/70"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Before We Build Together
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={{ duration: 1, delay: 0.08, ease: easeEditorial }}
            className="mx-auto max-w-3xl text-[2.5rem] font-medium leading-[1.08] tracking-[-0.035em] text-white md:text-6xl lg:text-[4.25rem]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            A Conversation Before We Begin
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.85, delay: 0.18, ease: easeEditorial }}
            className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/38 md:mt-6 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            The questions founders ask when the decision finally becomes real.
          </motion.p>
        </div>

        {/* Full conversation — all questions visible from the start */}
        <div
          className="relative z-[6]"
          role="list"
          aria-label="Conversation"
        >
          {/* Soft canvas frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-3 -inset-y-4 rounded-[28px] border border-white/[0.03] bg-white/[0.015] md:-inset-x-6 md:-inset-y-6"
          />

          {EXCHANGES.map((exchange, i) => (
            <div key={exchange.id} role="listitem">
              <ConversationTurn
                exchange={exchange}
                index={i}
                open={openId === exchange.id}
                explored={explored.has(exchange.id)}
                onSelect={() => select(exchange.id)}
                isLastVisible={i === EXCHANGES.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Human invitation */}
        <div
          ref={inviteRef}
          className="relative z-[6] mt-20 text-center md:mt-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={
              inviteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.9, ease: easeEditorial }}
          >
            <p
              className="text-[13px] tracking-[0.04em] text-white/30"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Still curious?
            </p>
            <a
              href="#contact"
              className="mt-3 inline-flex items-center gap-2 text-[22px] font-medium tracking-[-0.025em] text-[#E9D5FF] transition-colors duration-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/50 md:text-[26px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Let&apos;s talk
              <motion.span
                aria-hidden
                className="inline-block text-[18px] text-[#A855F7]/80"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                →
              </motion.span>
            </a>
          </motion.div>

          <ConversationExit
            active={(inviteInView || closerExplored) && !reduced}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#030208]/65 via-[#030208]/25 to-transparent"
      />
    </section>
  );
}
