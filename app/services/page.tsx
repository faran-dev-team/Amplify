import type { Metadata } from "next";
import { ServicesPage } from "@/components/ui/services-page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The Growth Operating System — one partner across marketing, technology, and transformation. AI-native capability, founder-led execution, enterprise trust.",
  alternates: {
    canonical: "https://scale12x.com/services",
  },
  openGraph: {
    title: "Services | Scale 12x",
    description:
      "Explore the Scale 12x Growth Operating System — marketing, technology, and transformation as one connected capability.",
    url: "https://scale12x.com/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
