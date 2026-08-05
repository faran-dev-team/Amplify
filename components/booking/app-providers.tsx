"use client";

import React from "react";
import { BookingProvider } from "@/components/booking/booking-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
