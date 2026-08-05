import type { Metadata } from "next";
import { BookACallPage } from "@/components/booking/book-a-call-page";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a 30-minute strategy call with Scale 12x. Choose a time, receive a calendar invite and Google Meet link instantly.",
  alternates: {
    canonical: "https://scale12x.com/book-a-call",
  },
  openGraph: {
    title: "Book a Strategy Call | Scale 12x",
    description:
      "Thirty focused minutes on growth — calendar invite and Google Meet included.",
    url: "https://scale12x.com/book-a-call",
  },
};

export default function BookACall() {
  return <BookACallPage />;
}
