"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { AiSolutionsHero } from "@/components/ui/ai-solutions-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const AiSolutionsProblem = dynamic(
  () =>
    import("@/components/ui/ai-solutions-problem").then(
      (m) => m.AiSolutionsProblem
    ),
  { ssr: true }
);
const AiSolutionsSystem = dynamic(
  () =>
    import("@/components/ui/ai-solutions-system").then(
      (m) => m.AiSolutionsSystem
    ),
  { ssr: true }
);
const AiSolutionsEngine = dynamic(
  () =>
    import("@/components/ui/ai-solutions-engine").then(
      (m) => m.AiSolutionsEngine
    ),
  { ssr: true }
);
const AiSolutionsCapabilities = dynamic(
  () =>
    import("@/components/ui/ai-solutions-capabilities").then(
      (m) => m.AiSolutionsCapabilities
    ),
  { ssr: true }
);
const AiSolutionsOutcomes = dynamic(
  () =>
    import("@/components/ui/ai-solutions-outcomes").then(
      (m) => m.AiSolutionsOutcomes
    ),
  { ssr: true }
);
const AiSolutionsRelated = dynamic(
  () =>
    import("@/components/ui/ai-solutions-related").then(
      (m) => m.AiSolutionsRelated
    ),
  { ssr: true }
);
const AiSolutionsFinale = dynamic(
  () =>
    import("@/components/ui/ai-solutions-finale").then(
      (m) => m.AiSolutionsFinale
    ),
  { ssr: true }
);

export function AiSolutionsPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <AiSolutionsHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <AiSolutionsProblem />
        </div>
        <div className="s12-atm-cool relative">
          <AiSolutionsSystem />
        </div>
        <div className="s12-atm-cloud relative">
          <AiSolutionsEngine />
        </div>
        <div className="s12-atm-editorial relative">
          <AiSolutionsCapabilities />
        </div>
        <div className="s12-atm-balanced relative">
          <AiSolutionsOutcomes />
        </div>
        <div className="s12-atm-editorial relative">
          <AiSolutionsRelated />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <AiSolutionsFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
