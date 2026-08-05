"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  buildCalendlyEmbedUrl,
  CALENDLY_CSS_HREF,
  CALENDLY_SCRIPT_SRC,
  THANK_YOU_PATH,
  trackBooking,
} from "@/lib/booking";

type CalendlyAPI = {
  initInlineWidget: (opts: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, string>;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyAPI;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadCalendlyAssets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS_HREF;
      document.head.appendChild(link);
    }

    const existing = document.querySelector(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    ) as HTMLScriptElement | null;

    if (existing) {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Calendly script failed"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

type CalendlyEmbedProps = {
  className?: string;
  source?: string | null;
  minHeight?: number;
  onReady?: () => void;
  onScheduled?: () => void;
};

export function CalendlyEmbed({
  className = "",
  source,
  minHeight = 700,
  onReady,
  onScheduled,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const router = useRouter();
  const onReadyRef = useRef(onReady);
  const onScheduledRef = useRef(onScheduled);
  onReadyRef.current = onReady;
  onScheduledRef.current = onScheduled;

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      const eventName =
        typeof data === "object" && "event" in data
          ? String((data as { event?: string }).event)
          : "";

      if (eventName === "calendly.event_type_viewed") {
        trackBooking("booking_started", { source: source ?? undefined });
      }
      if (eventName === "calendly.date_and_time_selected") {
        trackBooking("booking_date_selected", {
          source: source ?? undefined,
        });
      }
      if (eventName === "calendly.event_scheduled") {
        trackBooking("booking_completed", { source: source ?? undefined });
        onScheduledRef.current?.();
        const payload = (
          data as {
            payload?: {
              event?: { uri?: string };
              invitee?: { uri?: string };
            };
          }
        ).payload;
        const params = new URLSearchParams();
        params.set("booked", "1");
        if (source) params.set("source", source);
        if (payload?.event?.uri) params.set("event", payload.event.uri);
        if (payload?.invitee?.uri) params.set("invitee", payload.invitee.uri);
        router.push(`${THANK_YOU_PATH}?${params.toString()}`);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router, source]);

  useEffect(() => {
    let cancelled = false;
    initialized.current = false;
    setStatus("loading");

    async function init() {
      try {
        await loadCalendlyAssets();
        if (cancelled || !containerRef.current || !window.Calendly) return;

        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: buildCalendlyEmbedUrl({ hideEventTypeDetails: false }),
          parentElement: containerRef.current,
          utm: source
            ? {
                utmCampaign: "scale12x",
                utmSource: source,
                utmMedium: "modal",
              }
            : { utmCampaign: "scale12x", utmMedium: "embed" },
        });

        if (!cancelled) {
          initialized.current = true;
          setStatus("ready");
          trackBooking("calendly_loaded", { source: source ?? undefined });
          onReadyRef.current?.();
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [source]);

  return (
    <div className={`relative w-full ${className}`}>
      {status === "loading" && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#050814]"
          aria-live="polite"
          aria-busy="true"
        >
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-[rgba(168,197,240,0.2)] border-t-[#7C5CFF]"
            aria-hidden
          />
          <p
            className="text-[13px] tracking-[0.06em] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Preparing your strategy call…
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 text-center">
          <p
            className="text-[15px] text-[#9AA8C0]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Scheduler couldn&apos;t load. Open the full booking page instead.
          </p>
          <a
            href="/book-a-call"
            className="s12-btn-primary inline-flex h-11 items-center rounded-full px-6 text-[14px] font-semibold text-[#F4F7FC]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Go to Book a Call
          </a>
        </div>
      )}

      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        style={{ minWidth: "320px", height: minHeight }}
        data-auto-load="false"
      />
    </div>
  );
}
