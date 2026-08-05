/**
 * Scale 12x booking configuration.
 * Set NEXT_PUBLIC_CALENDLY_URL to your Calendly event URL
 * (e.g. https://calendly.com/your-org/30-minute-strategy-call).
 */

export const BOOKING_PATH = "/book-a-call";
export const THANK_YOU_PATH = "/thank-you";

export const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";
export const CALENDLY_CSS_HREF =
  "https://assets.calendly.com/assets/external/widget.css";

/** Fallback when env is unset — replace in production via .env */
const FALLBACK_CALENDLY_URL =
  "https://calendly.com/scale12x/30-minute-strategy-call";

export function getCalendlyBaseUrl(): string {
  const fromEnv =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()
      : undefined;
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_CALENDLY_URL;
}

/** Brand-aligned Calendly embed params (Scale 12x stage) */
export function buildCalendlyEmbedUrl(opts?: {
  hideLandingPageDetails?: boolean;
  hideEventTypeDetails?: boolean;
}): string {
  const base = getCalendlyBaseUrl();
  const url = new URL(base);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("background_color", "050814");
  url.searchParams.set("text_color", "F4F7FC");
  url.searchParams.set("primary_color", "7C5CFF");
  if (opts?.hideLandingPageDetails !== false) {
    url.searchParams.set("hide_landing_page_details", "1");
  }
  if (opts?.hideEventTypeDetails) {
    url.searchParams.set("hide_event_type_details", "1");
  }
  return url.toString();
}

export const BOOKING_QUESTIONS = [
  "Name",
  "Email",
  "Company",
  "Website",
  "Industry",
  "Team Size",
  "What do you need help with?",
] as const;

export type BookingEventName =
  | "booking_cta_clicked"
  | "booking_modal_opened"
  | "booking_modal_closed"
  | "calendly_loaded"
  | "booking_started"
  | "booking_date_selected"
  | "booking_completed";

export type BookingAnalyticsPayload = {
  source?: string;
  path?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    __s12BookingTrack?: (
      event: BookingEventName,
      payload?: BookingAnalyticsPayload
    ) => void;
  }
}

/**
 * Extensible analytics bus. Connect GA4 / GTM / Meta / LinkedIn
 * by assigning window.__s12BookingTrack or listening to dataLayer.
 */
export function trackBooking(
  event: BookingEventName,
  payload: BookingAnalyticsPayload = {}
) {
  if (typeof window === "undefined") return;

  const detail = {
    event,
    ...payload,
    path: payload.path ?? window.location.pathname,
    timestamp: Date.now(),
  };

  try {
    window.__s12BookingTrack?.(event, detail);
  } catch {
    /* no-op */
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ...detail });
  } catch {
    /* no-op */
  }

  try {
    window.gtag?.("event", event, detail);
  } catch {
    /* no-op */
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[s12-booking]", event, detail);
  }
}
