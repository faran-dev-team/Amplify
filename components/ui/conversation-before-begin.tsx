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
import { BookCTA } from "@/components/booking/book-cta";

/* ─────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────── */

const PURPLE = "#7C5CFF";
const PURPLE_SOFT = "#B8A4FF";
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
    id: "different",
    opening: true,
    category: "Strategy",
    question: "What makes Scale 12x different from a traditional agency?",
    answer: [
      "We're AI-native. Not AI-adopted. Not AI-augmented. Native. Built in.",
      "One partner. Every channel. Unlike shops that specialize in one channel or dilute quality as generic full-service.",
      "Sister product Foreman proves we build real technology. Verifiable track record: $700K+ delivered, $150K+ US government project ongoing, $100K+ verified Upwork earnings.",
    ],
  },
  {
    id: "after-launch",
    category: "Process",
    question: "What does collaboration look like after launch?",
    answer: [
      "Launch is a milestone, not a farewell, and Launch is also our $5K/month entry retainer.",
      "Every tier includes reporting. Scale and Dominate add weekly strategy. Dominate adds weekly founder calls and Slack for daily ops.",
      "90-day money-back guarantee on setup fees with KPI triggers. 30-day cancellation notice after the first 90 days. No lock-in beyond that.",
    ],
  },
  {
    id: "involvement",
    category: "Partnership",
    question: "How involved will our team need to be — and what does pricing look like?",
    answer: [
      "Present for the decisions that matter. Protected from the noise that doesn't.",
      "Discovery call (30 min) → custom proposal (48 hours) → founder demo (45 min) → signed contract → kickoff (48 hours).",
      "Typical close: 14–21 days. Typical first-year contract: $60K–$240K across Launch, Scale, and Dominate.",
    ],
  },
  {
    id: "results",
    category: "Timeline",
    question: "How quickly can we expect measurable results?",
    answer: [
      "We set expectations against your reality (Launch, Scale, or Dominate), not a generic timeline slide.",
      "Setup fees split 50% signing, 50% delivery milestone. Outcomes we stand behind with our own money.",
      "If we can't see a path to meaningful measurement, we shouldn't begin.",
    ],
  },
  {
    id: "ready",
    closer: true,
    category: "Partnership",
    question: "What happens when we're ready to start?",
    answer: [
      "We begin with a conversation.",
      "No pitch theater. A careful look at where you are, where you intend to go, and whether Scale 12x is the right partner.",
      "The next move is yours.",
    ],
  },
];

/* ─────────────────────────────────────────────
   Soft arrival — signal settles into a listening node
───────────────────────────────────────────── */

function ListeningArrival({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-none relative mx-auto mb-4 h-24 w-full max-w-sm md:mb-5 md:h-28">
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
          fill="#D4C8FF"
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
    <div className="pointer-events-none relative mx-auto mt-6 h-20 w-full max-w-xs md:mt-8 md:h-24">
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
          fill="#D4C8FF"
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
        className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#7C5CFF]/55"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {category}
      </motion.p>

      <div className="space-y-3 md:space-y-4">
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
      className="relative mb-4 pl-10 md:mb-5 md:pl-12"
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
                ? "bg-gradient-to-b from-[#7C5CFF]/45 via-white/12 to-white/[0.04]"
                : "bg-gradient-to-b from-white/18 via-white/10 to-white/[0.04]"
            }`}
          />
        )}
      </div>

      <motion.div
        layout
        className={`group relative overflow-hidden rounded-[22px] border transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "border-[#7C5CFF]/25 bg-[linear-gradient(165deg,rgba(16,26,50,0.94),rgba(10,18,36,0.9))] shadow-[inset_0_1px_0_rgba(232,240,255,0.06),0_0_48px_rgba(124,92,255,0.14)]"
            : "border-[rgba(168,196,240,0.11)] bg-[linear-gradient(165deg,rgba(12,21,43,0.72),rgba(10,18,36,0.62))] hover:border-[rgba(184,164,255,0.22)] hover:bg-[linear-gradient(165deg,rgba(16,26,50,0.9),rgba(10,18,36,0.86))] hover:shadow-[inset_0_1px_0_rgba(232,240,255,0.05),0_12px_40px_rgba(2,4,10,0.35)]"
        }`}
      >
        {/* Soft purple edge on hover / open */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-3 left-0 w-px rounded-full transition-opacity duration-500 ${
            open
              ? "bg-[#7C5CFF]/70 opacity-100"
              : "bg-[#7C5CFF]/40 opacity-0 group-hover:opacity-70"
          }`}
        />

        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onSelect}
          className="relative w-full px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/50 focus-visible:ring-offset-0 md:px-6 md:py-5"
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
                  ? "border-[#7C5CFF]/35 text-[#D4C8FF]"
                  : "border-[rgba(168,196,240,0.14)] text-[#9AA8C0]/85 group-hover:border-white/20 group-hover:text-white/55"
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
              <div className="border-t border-[rgba(168,196,240,0.09)] px-5 pb-5 pt-1 md:px-6 md:pb-6">
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
      className="relative z-0 -mt-28 overflow-hidden pb-12 pt-2 md:-mt-36 md:pb-14 md:pt-4"
    >
      {/* Calmest atmosphere on the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050814]/30 via-[#050814]/55 to-[#050814]/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[12%] z-[1] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/[0.035] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-[#050814]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-[920px] px-5 md:px-8">
        <ListeningArrival active={(inView || headlineInView) && !reduced} />

        <div ref={headlineRef} className="relative z-[6] mb-10 text-center md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.32em] text-[#7C5CFF]/70"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Launch · Scale · Dominate
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
            className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#9AA8C0]/90 md:mt-6 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Pricing, process, and partnership, answered straight.
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
            className="pointer-events-none absolute -inset-x-3 -inset-y-4 rounded-[28px] border border-[rgba(168,196,240,0.07)] bg-white/[0.015] md:-inset-x-6 md:-inset-y-6"
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
          className="relative z-[6] mt-14 text-center md:mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={
              inviteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.9, ease: easeEditorial }}
          >
            <p
              className="text-[13px] tracking-[0.04em] text-[#6B7890]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              The next move is yours.
            </p>
            <BookCTA
              source="home-conversation-lets-scale"
              className="mt-3 inline-flex items-center gap-2 text-[22px] font-medium tracking-[-0.025em] text-[#D4C8FF] transition-colors duration-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/50 md:text-[26px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Let&apos;s Scale.
              <motion.span
                aria-hidden
                className="inline-block text-[18px] text-[#7C5CFF]/80"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                →
              </motion.span>
            </BookCTA>
          </motion.div>

          <ConversationExit
            active={(inviteInView || closerExplored) && !reduced}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-[#050814]/65 via-[#050814]/25 to-transparent"
      />
    </section>
  );
}
