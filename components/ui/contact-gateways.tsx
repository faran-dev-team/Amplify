"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Gateway = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
  primary?: boolean;
  book?: boolean;
};

const GATEWAYS: Gateway[] = [
  {
    id: "strategy",
    title: "Book a Strategy Call",
    description:
      "Thirty focused minutes. Calendar invite and Google Meet — confirmed the moment you choose a time.",
    cta: "Open scheduler",
    href: "/book-a-call",
    accent: "#7C5CFF",
    primary: true,
    book: true,
  },
  {
    id: "project",
    title: "Start a Project",
    description:
      "Share goals, timeline, and scope. We respond with clarity — not a generic auto-reply.",
    cta: "Open brief",
    href: "#project",
    accent: "#A8C5F0",
  },
  {
    id: "inquiry",
    title: "General Inquiry",
    description:
      "Partnerships, press, or a simple hello. Reach the team at hello@scale12x.com.",
    cta: "Email Scale 12x",
    href: "mailto:hello@scale12x.com",
    accent: "#6EB8E8",
  },
];

function GatewayIcon({
  id,
  accent,
  hot,
}: {
  id: string;
  accent: string;
  hot: boolean;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 56 56" className="h-11 w-11 shrink-0" aria-hidden>
      <defs>
        <filter id={`cgi-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={hot ? 2 : 1.1} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.circle
        cx="28"
        cy="28"
        r="22"
        fill="rgba(12,21,43,0.94)"
        stroke={accent}
        strokeWidth={hot ? 1.3 : 1}
        filter={`url(#cgi-${uid})`}
        animate={{ opacity: hot ? 1 : 0.7 }}
        transition={{ duration: 0.4, ease: easeEditorial }}
      />
      {id === "strategy" && (
        <>
          <circle
            cx="28"
            cy="28"
            r="6"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          />
          <circle cx="28" cy="28" r="2" fill="#F5E9FF" />
          <path
            d="M28 14v4M28 38v4M14 28h4M38 28h4"
            stroke={accent}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity={0.7}
          />
        </>
      )}
      {id === "project" && (
        <>
          <rect
            x="18"
            y="18"
            width="20"
            height="20"
            rx="3"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          />
          <path
            d="M22 26h12M22 32h8"
            stroke={accent}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity={0.75}
          />
        </>
      )}
      {id === "inquiry" && (
        <>
          <path
            d="M16 22l12 9 12-9"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="16"
            y="20"
            width="24"
            height="16"
            rx="2.5"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          />
        </>
      )}
    </svg>
  );
}

/**
 * Continuous 1px path through the vertical center of the card row.
 * Sits behind cards; visible in gutters with nodes between each card.
 */
function ConnectorPath({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] hidden h-10 -translate-y-1/2 md:block"
    >
      {/* Full-bleed line — continues behind every card; clear in the gaps */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(124,92,255,0.0) 0%, rgba(124,92,255,0.45) 10%, rgba(184,164,255,0.65) 35%, rgba(168,197,240,0.7) 50%, rgba(110,184,232,0.55) 75%, rgba(110,184,232,0.0) 100%)",
          boxShadow: "0 0 12px rgba(124,92,255,0.35), 0 0 24px rgba(168,197,240,0.15)",
        }}
        initial={{ opacity: 0, scaleX: 0.9 }}
        animate={
          active ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.9 }
        }
        transition={{ duration: 1, delay: 0.3, ease: easeOutExpo }}
      />

      {/* Traveling pulse — clearly readable in the gaps */}
      {active && !reduced && (
        <motion.div
          className="absolute top-1/2 h-[4px] w-20 -translate-y-1/2 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245,233,255,0.15), rgba(184,164,255,0.85), rgba(168,197,240,0.7), transparent)",
            boxShadow: "0 0 14px rgba(184,164,255,0.55)",
          }}
          initial={{ left: "0%", opacity: 0 }}
          animate={{
            left: ["0%", "100%"],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
        />
      )}

      {/* Nodes at gap centers — gap-x-16 = 4rem, two gaps = 8rem */}
      {(
        [
          "calc((100% - 8rem) / 3 + 2rem)",
          "calc(2 * ((100% - 8rem) / 3) + 6rem)",
        ] as const
      ).map((left, i) => (
        <motion.span
          key={left}
          className="absolute top-1/2 z-[2] flex h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
          }
          transition={{
            duration: 0.45,
            delay: 0.55 + i * 0.1,
            ease: easeOutExpo,
          }}
        >
          <span className="absolute inset-0 rounded-full border border-[rgba(184,164,255,0.65)] bg-[rgba(12,21,43,0.98)] shadow-[0_0_14px_rgba(124,92,255,0.45)]" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#D4C8FF]" />
        </motion.span>
      ))}
    </div>
  );
}

function cardClass(primary: boolean, isHovered: boolean) {
  const base =
    "group relative z-10 flex h-full min-h-[300px] flex-col items-start justify-center rounded-[22px] px-5 py-6 md:min-h-[320px] md:px-6 md:py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55";
  const lift =
    "transition-[border-color,background,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]";

  if (isHovered) {
    return `${base} ${lift} -translate-y-0.5 border border-[rgba(184,164,255,0.55)] bg-[rgba(16,26,50,0.9)] shadow-[0_20px_52px_rgba(124,92,255,0.16),0_0_44px_rgba(124,92,255,0.1)]`;
  }

  if (primary) {
    // Quiet primary resting state — distinct but not “stuck hover”
    return `${base} ${lift} border border-[rgba(184,164,255,0.28)] bg-[rgba(16,26,50,0.78)] shadow-[0_10px_32px_rgba(124,92,255,0.06)]`;
  }

  return `${base} ${lift} border border-[rgba(168,196,240,0.12)] bg-[rgba(10,18,36,0.72)]`;
}

export function ContactGateways() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="connect"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="contact-gateways-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[560px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Choose how you&apos;d like to connect
          </motion.p>
          <motion.h2
            id="contact-gateways-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.15rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.65rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Three clear paths.
            <span className="mt-1 block text-[#B8A4FF]/95">One partner.</span>
          </motion.h2>
        </div>

        {/* Card row — wider gaps so the path is clearly visible between cards */}
        <div className="relative mx-auto mt-12 w-full max-w-[1080px] md:mt-14">
          <ConnectorPath active={inView} />

          <ul className="relative z-10 grid gap-6 md:grid-cols-3 md:gap-x-16 md:gap-y-0">
            {GATEWAYS.map((g, i) => {
              const isHovered = hovered === g.id;
              const body = (
                <>
                  <GatewayIcon
                    id={g.id}
                    accent={g.accent}
                    hot={isHovered}
                  />
                  <h3
                    className="mt-4 min-h-[2.6em] text-[1.25rem] leading-[1.25] tracking-[-0.025em] text-[#F4F7FC] md:text-[1.3rem]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {g.title}
                  </h3>
                  <p
                    className="mt-2.5 min-h-[4.2em] text-[13px] leading-relaxed text-[#9AA8C0] md:text-[13.5px]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {g.description}
                  </p>
                  <span
                    className={`mt-5 inline-flex items-center gap-2 text-[12.5px] font-medium tracking-[0.04em] transition-colors duration-400 ${
                      isHovered || g.primary
                        ? "text-[#B8A4FF] group-hover:text-[#F4F7FC]"
                        : "group-hover:text-[#F4F7FC]"
                    }`}
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      color:
                        isHovered || g.primary ? undefined : g.accent,
                    }}
                  >
                    {g.cta}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </span>
                </>
              );

              return (
                <motion.li
                  key={g.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.55,
                    delay: 0.7 + i * 0.12,
                    ease: easeOutExpo,
                  }}
                  onMouseEnter={() => setHovered(g.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(g.id)}
                  onBlur={() => setHovered(null)}
                >
                  {g.book ? (
                    <BookCTA
                      source="contact-gateway-strategy"
                      className={cardClass(true, isHovered)}
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {body}
                    </BookCTA>
                  ) : (
                    <a
                      href={g.href}
                      className={cardClass(false, isHovered)}
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {body}
                    </a>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
