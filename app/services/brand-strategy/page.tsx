import type { Metadata } from "next";
import { BrandStrategyPage } from "@/components/ui/brand-strategy-page";

export const metadata: Metadata = {
  title: "Brand Strategy",
  description:
    "Scale 12x Brand Intelligence System — positioning, differentiation, and market authority engineered for category leadership. Great brands are engineered, not decorated.",
  alternates: {
    canonical: "https://scale12x.com/services/brand-strategy",
  },
  openGraph: {
    title: "Brand Strategy | Scale 12x",
    description:
      "We don't design brands. We build businesses that become brands — positioning, perception, and long-term market authority as one system.",
    url: "https://scale12x.com/services/brand-strategy",
  },
};

export default function BrandStrategy() {
  return <BrandStrategyPage />;
}
