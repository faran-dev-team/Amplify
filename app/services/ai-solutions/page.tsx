import type { Metadata } from "next";
import { AiSolutionsPage } from "@/components/ui/ai-solutions-page";

export const metadata: Metadata = {
  title: "AI Solutions & Automation",
  description:
    "Scale 12x AI Command Center — AI agents, workflow automation, and intelligence systems that run businesses. Not demos. Production AI infrastructure.",
  alternates: {
    canonical: "https://scale12x.com/services/ai-solutions",
  },
  openGraph: {
    title: "AI Solutions & Automation | Scale 12x",
    description:
      "We don't build AI demos. We build AI systems that run businesses — agents, automation, knowledge, and continuous learning as one operating layer.",
    url: "https://scale12x.com/services/ai-solutions",
  },
};

export default function AiSolutions() {
  return <AiSolutionsPage />;
}
