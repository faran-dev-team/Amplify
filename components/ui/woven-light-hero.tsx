"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HEADLINES = [
  ["Scale,", "Amplified."],
  ["Growth,", "Engineered."],
  ["Built to", "Compound."],
  ["Intelligence", "at Work."],
  ["Systems", "That Scale."],
  ["Precision", "at Scale."],
  ["Make Scale", "Inevitable."],
  ["The Growth", "OS."],
] as const;

const HOLD_MS = 3800;
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

function RotatingHeadline({ ready }: { ready: boolean }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setVisible(true);
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HEADLINES.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [ready]);

  const lines = HEADLINES[index];

  return (
    <h1
      className="relative min-h-[2.2em] w-full text-left text-[2.65rem] leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl md:min-h-[2.3em] md:text-6xl lg:text-[4.25rem] xl:text-7xl"
      style={{
        fontFamily: "'Playfair Display', serif",
        textShadow:
          "0 0 40px rgba(0,0,0,0.55), 0 0 50px rgba(255, 255, 255, 0.22)",
      }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={index}
            className="block text-left"
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: easeEditorial }}
          >
            {lines.map((line, lineIndex) => (
              <span
                key={`${index}-${lineIndex}`}
                className={`block ${
                  lineIndex === 1 ? "text-[#C4B5FD]" : "text-white"
                }`}
                style={
                  lineIndex === 1
                    ? {
                        textShadow:
                          "0 0 40px rgba(168, 85, 247, 0.45), 0 0 80px rgba(168, 85, 247, 0.2)",
                      }
                    : undefined
                }
              >
                {line.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${index}-${lineIndex}-${charIndex}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: lineIndex * 0.12 + charIndex * 0.028,
                      duration: 0.55,
                      ease: easeEditorial,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
}

function SweepButton({
  children,
  fillClassName,
  className = "",
}: {
  children: React.ReactNode;
  fillClassName: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`group relative overflow-hidden rounded-full border-2 border-white/25 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition-[border-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 ${fillClassName}`}
      />
      <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {children}
      </span>
    </button>
  );
}

export const WovenLightHero = () => {
  const [headlineReady, setHeadlineReady] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const readyTimer = window.setTimeout(() => setHeadlineReady(true), 900);

    return () => {
      window.clearTimeout(readyTimer);
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-start justify-start overflow-hidden bg-transparent">
      {/* Left readability veil — follows the lowered copy stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(100%,680px)] bg-[radial-gradient(85%_65%_at_8%_42%,rgba(3,2,8,0.9)_0%,rgba(3,2,8,0.5)_45%,transparent_74%)] md:w-[46%] lg:w-[42%]"
      />

      <div className="relative z-10 flex w-full justify-start pl-5 pr-5 pt-[26vh] sm:pl-7 md:pl-10 md:pt-[28vh] lg:pl-14 xl:pl-16">
        <motion.div
          className="w-full max-w-[320px] text-left sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px]"
          initial={{ opacity: 0, x: -48, y: 28 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: easeEditorial }}
        >
          <motion.p
            initial={{ opacity: 0, y: 18, x: -18 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{
              delay: 1.05,
              duration: 0.95,
              ease: easeEditorial,
            }}
            className="mb-3 text-left text-[12px] font-medium uppercase tracking-[0.32em] text-[#C4B5FD]/85 md:mb-4 md:text-[13px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            AI Native Growth Studio
          </motion.p>

          <RotatingHeadline ready={headlineReady} />

          <motion.div
            initial={{ opacity: 0, y: 24, x: -12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{
              delay: 1.95,
              duration: 0.85,
              ease: easeEditorial,
            }}
            className="relative z-20 mt-7 flex w-full max-w-[calc(100vw-2.5rem)] flex-col items-stretch gap-3 sm:mt-8 sm:w-max sm:flex-row sm:flex-nowrap sm:items-center sm:justify-start sm:gap-4 md:gap-5"
          >
            <SweepButton
              fillClassName="bg-[#A855F7]"
              className="w-full whitespace-nowrap sm:w-auto sm:shrink-0 hover:border-[#C084FC] hover:shadow-[0_0_36px_rgba(168,85,247,0.45)]"
            >
              Start Your Growth Strategy
            </SweepButton>
            <SweepButton
              fillClassName="bg-[#DB2777]"
              className="w-full whitespace-nowrap sm:w-auto sm:shrink-0 hover:border-[#F0ABFC] hover:shadow-[0_0_36px_rgba(236,72,153,0.4)]"
            >
              View Our Work
            </SweepButton>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[22vh] bg-gradient-to-b from-transparent via-transparent to-[#030208]/40"
      />
    </div>
  );
};
