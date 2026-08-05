import type { Metadata } from "next";
import { PerformanceMarketingPage } from "@/components/ui/performance-marketing-page";

export const metadata: Metadata = {
  title: "Performance Marketing",
  description:
    "Scale 12x Revenue Growth Engine — customer acquisition systems engineered for predictable revenue. We don't buy traffic. We engineer measurable growth.",
  alternates: {
    canonical: "https://scale12x.com/services/performance-marketing",
  },
  openGraph: {
    title: "Performance Marketing | Scale 12x",
    description:
      "Every marketing dollar becomes measurable business growth — acquisition, attribution, AI optimization, and scaling as one revenue system.",
    url: "https://scale12x.com/services/performance-marketing",
  },
};

export default function PerformanceMarketing() {
  return <PerformanceMarketingPage />;
}
