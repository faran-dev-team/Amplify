"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BookingModal } from "@/components/booking/booking-modal";
import { trackBooking } from "@/lib/booking";

type BookingContextValue = {
  isOpen: boolean;
  source: string | null;
  openBooking: (source?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);

  const openBooking = useCallback((src = "unknown") => {
    setSource(src);
    setIsOpen(true);
    trackBooking("booking_cta_clicked", { source: src });
    trackBooking("booking_modal_opened", { source: src });
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    trackBooking("booking_modal_closed", { source: source ?? undefined });
  }, [source]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeBooking]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ isOpen, source, openBooking, closeBooking }),
    [isOpen, source, openBooking, closeBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal
        open={isOpen}
        source={source}
        onClose={closeBooking}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

/** Safe hook for optional usage — returns null outside provider */
export function useBookingOptional() {
  return useContext(BookingContext);
}
