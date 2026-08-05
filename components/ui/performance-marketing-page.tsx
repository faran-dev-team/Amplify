"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { PerformanceMarketingHero } from "@/components/ui/performance-marketing-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const PerformanceMarketingProblem = dynamic(
  () =>
    import("@/components/ui/performance-marketing-problem").then(
      (m) => m.PerformanceMarketingProblem
    ),
  { ssr: true }
);
const PerformanceMarketingEngine = dynamic(
  () =>
    import("@/components/ui/performance-marketing-engine").then(
      (m) => m.PerformanceMarketingEngine
    ),
  { ssr: true }
);
const PerformanceMarketingFlow = dynamic(
  () =>
    import("@/components/ui/performance-marketing-flow").then(
      (m) => m.PerformanceMarketingFlow
    ),
  { ssr: true }
);
const PerformanceMarketingCapabilities = dynamic(
  () =>
    import("@/components/ui/performance-marketing-capabilities").then(
      (m) => m.PerformanceMarketingCapabilities
    ),
  { ssr: true }
);
const PerformanceMarketingAi = dynamic(
  () =>
    import("@/components/ui/performance-marketing-ai").then(
      (m) => m.PerformanceMarketingAi
    ),
  { ssr: true }
);
const PerformanceMarketingStack = dynamic(
  () =>
    import("@/components/ui/performance-marketing-stack").then(
      (m) => m.PerformanceMarketingStack
    ),
  { ssr: true }
);
const PerformanceMarketingOutcomes = dynamic(
  () =>
    import("@/components/ui/performance-marketing-outcomes").then(
      (m) => m.PerformanceMarketingOutcomes
    ),
  { ssr: true }
);
const PerformanceMarketingStory = dynamic(
  () =>
    import("@/components/ui/performance-marketing-story").then(
      (m) => m.PerformanceMarketingStory
    ),
  { ssr: true }
);
const PerformanceMarketingRelated = dynamic(
  () =>
    import("@/components/ui/performance-marketing-related").then(
      (m) => m.PerformanceMarketingRelated
    ),
  { ssr: true }
);
const PerformanceMarketingFinale = dynamic(
  () =>
    import("@/components/ui/performance-marketing-finale").then(
      (m) => m.PerformanceMarketingFinale
    ),
  { ssr: true }
);

export function PerformanceMarketingPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <PerformanceMarketingHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <PerformanceMarketingProblem />
        </div>
        <div className="s12-atm-cool relative">
          <PerformanceMarketingEngine />
        </div>
        <div className="s12-atm-cloud relative">
          <PerformanceMarketingFlow />
        </div>
        <div className="s12-atm-editorial relative">
          <PerformanceMarketingCapabilities />
        </div>
        <div className="s12-atm-balanced relative">
          <PerformanceMarketingAi />
        </div>
        <div className="s12-atm-editorial relative">
          <PerformanceMarketingStack />
        </div>
        <div className="s12-atm-calm relative">
          <PerformanceMarketingOutcomes />
        </div>
        <div className="s12-atm-balanced relative">
          <PerformanceMarketingStory />
        </div>
        <div className="s12-atm-editorial relative">
          <PerformanceMarketingRelated />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <PerformanceMarketingFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
