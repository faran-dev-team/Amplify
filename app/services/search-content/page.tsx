import type { Metadata } from "next";
import { SearchContentPage } from "@/components/ui/search-content-page";

export const metadata: Metadata = {
  title: "Search & Content",
  description:
    "Scale 12x Organic Growth Intelligence — search ecosystems that continuously generate qualified business opportunities. We don't chase rankings. We engineer sustainable organic growth.",
  alternates: {
    canonical: "https://scale12x.com/services/search-content",
  },
  openGraph: {
    title: "Search & Content | Scale 12x",
    description:
      "Search intelligence, content systems, and authority engineered for long-term organic growth — not ranking vanity.",
    url: "https://scale12x.com/services/search-content",
  },
};

export default function SearchContent() {
  return <SearchContentPage />;
}
