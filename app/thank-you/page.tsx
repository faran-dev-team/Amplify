import type { Metadata } from "next";
import { ThankYouPage } from "@/components/booking/thank-you-page";

export const metadata: Metadata = {
  title: "You're Booked",
  description:
    "Your Scale 12x strategy call is confirmed. Check your email for the calendar invite and Google Meet link.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://scale12x.com/thank-you",
  },
};

export default function ThankYou() {
  return <ThankYouPage />;
}
