"use client";

import React from "react";
import { BOOKING_PATH } from "@/lib/booking";
import { useBooking } from "@/components/booking/booking-provider";

type BookCTAProps = {
  children: React.ReactNode;
  className?: string;
  source: string;
  /** Progressive enhancement — defaults to /book-a-call */
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  "aria-label"?: string;
};

/**
 * Primary booking CTA. Opens the premium Calendly modal.
 * Falls back to /book-a-call if JS is unavailable.
 */
export function BookCTA({
  children,
  className = "",
  source,
  href = BOOKING_PATH,
  onClick,
  style,
  "aria-label": ariaLabel,
}: BookCTAProps) {
  const { openBooking } = useBooking();

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        openBooking(source);
      }}
    >
      {children}
    </a>
  );
}

type BookButtonProps = {
  children: React.ReactNode;
  className?: string;
  source: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  type?: "button" | "submit";
  "aria-label"?: string;
};

/** Button variant for existing button-styled CTAs */
export function BookButton({
  children,
  className = "",
  source,
  onClick,
  style,
  type = "button",
  "aria-label": ariaLabel,
}: BookButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        openBooking(source);
      }}
    >
      {children}
    </button>
  );
}
