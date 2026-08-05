"use client";

import React, { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendlyEmbed } from "@/components/booking/calendly-embed";
import { BOOKING_PATH } from "@/lib/booking";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  source?: string | null;
};

export function BookingModal({ open, onClose, source }: BookingModalProps) {
  const reduced = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      window.clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onFocus = (e: FocusEvent) => {
      if (!panelRef.current) return;
      if (e.target instanceof Node && !panelRef.current.contains(e.target)) {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-5 md:p-8">
          <motion.button
            type="button"
            aria-label="Close booking dialog"
            className="absolute inset-0 bg-[#02050e]/78 backdrop-blur-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.35 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-10 flex h-[min(94svh,920px)] w-full max-w-[920px] flex-col overflow-hidden rounded-t-[24px] border border-[rgba(168,196,240,0.16)] bg-[#050814] shadow-[0_-20px_80px_rgba(0,0,0,0.55)] sm:h-[min(88svh,860px)] sm:rounded-[28px] sm:shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.98 }
            }
            transition={{ duration: reduced ? 0.18 : 0.42, ease: easeOutExpo }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(124,92,255,0.22),transparent_70%)]"
            />

            <header className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-[rgba(168,196,240,0.1)] px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0 pr-2">
                <p
                  className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#A8C5F0]/90"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  30 Minute Strategy Call
                </p>
                <h2
                  id={titleId}
                  className="mt-1.5 text-[1.35rem] leading-tight tracking-[-0.03em] text-[#F4F7FC] sm:text-[1.55rem]"
                  style={{
                    fontFamily:
                      "var(--font-playfair), 'Playfair Display', serif",
                  }}
                >
                  Book a call with Scale 12x
                </h2>
                <p
                  id={descId}
                  className="mt-1.5 max-w-[36rem] text-[13px] leading-relaxed text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Choose a time. We&apos;ll send a calendar invite and Google
                  Meet link the moment you confirm.
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(168,196,240,0.18)] bg-[rgba(12,21,43,0.8)] text-[#F4F7FC] transition-[border-color,background] duration-300 hover:border-[rgba(168,197,240,0.4)] hover:bg-[rgba(16,26,50,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#050814]">
              <CalendlyEmbed
                source={source}
                minHeight={680}
                className="min-h-[640px] px-0 sm:px-1"
                onScheduled={onClose}
              />
            </div>

            <footer className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[rgba(168,196,240,0.1)] px-5 py-3 sm:px-7">
              <p
                className="text-[11px] tracking-[0.04em] text-[#6B7890]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Prefer a full page?{" "}
                <a
                  href={BOOKING_PATH}
                  className="text-[#A8C5F0] transition-colors hover:text-[#F4F7FC]"
                  onClick={onClose}
                >
                  Open booking page
                </a>
              </p>
              <p
                className="text-[11px] tracking-[0.06em] text-[#4A5568]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Esc to close
              </p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
