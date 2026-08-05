import type { Metadata } from "next";
import { DigitalProductEngineeringPage } from "@/components/ui/digital-product-engineering-page";

export const metadata: Metadata = {
  title: "Digital Product Engineering",
  description:
    "Scale 12x Product Engineering Lab — digital products engineered to scale businesses. We don't build websites. We engineer software businesses rely on.",
  alternates: {
    canonical: "https://scale12x.com/services/digital-product-engineering",
  },
  openGraph: {
    title: "Digital Product Engineering | Scale 12x",
    description:
      "Product strategy, UX, engineering, and cloud — built as one system so digital products scale with the business.",
    url: "https://scale12x.com/services/digital-product-engineering",
  },
};

export default function DigitalProductEngineering() {
  return <DigitalProductEngineeringPage />;
}
