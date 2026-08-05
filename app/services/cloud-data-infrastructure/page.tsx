import type { Metadata } from "next";
import { CloudInfrastructurePage } from "@/components/ui/cloud-infrastructure-page";

export const metadata: Metadata = {
  title: "Cloud, Data & Intelligent Infrastructure",
  description:
    "Scale 12x Mission Control — intelligent infrastructure that powers modern businesses. Cloud architecture, data platforms, APIs, DevOps, security, and AI infrastructure engineered as one system.",
  alternates: {
    canonical: "https://scale12x.com/services/cloud-data-infrastructure",
  },
  openGraph: {
    title: "Cloud, Data & Intelligent Infrastructure | Scale 12x",
    description:
      "We don't simply host applications. We engineer the intelligent infrastructure that powers modern businesses.",
    url: "https://scale12x.com/services/cloud-data-infrastructure",
  },
};

export default function CloudDataInfrastructure() {
  return <CloudInfrastructurePage />;
}
