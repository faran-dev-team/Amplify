"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { BrandStrategyHero } from "@/components/ui/brand-strategy-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const BrandStrategyProblem = dynamic(
  () =>
    import("@/components/ui/brand-strategy-problem").then(
      (m) => m.BrandStrategyProblem
    ),
  { ssr: true }
);
const BrandStrategySystem = dynamic(
  () =>
    import("@/components/ui/brand-strategy-system").then(
      (m) => m.BrandStrategySystem
    ),
  { ssr: true }
);
const BrandStrategyArchitecture = dynamic(
  () =>
    import("@/components/ui/brand-strategy-architecture").then(
      (m) => m.BrandStrategyArchitecture
    ),
  { ssr: true }
);
const BrandStrategyCapabilities = dynamic(
  () =>
    import("@/components/ui/brand-strategy-capabilities").then(
      (m) => m.BrandStrategyCapabilities
    ),
  { ssr: true }
);
const BrandStrategyFramework = dynamic(
  () =>
    import("@/components/ui/brand-strategy-framework").then(
      (m) => m.BrandStrategyFramework
    ),
  { ssr: true }
);
const BrandStrategyOutcomes = dynamic(
  () =>
    import("@/components/ui/brand-strategy-outcomes").then(
      (m) => m.BrandStrategyOutcomes
    ),
  { ssr: true }
);
const BrandStrategyStory = dynamic(
  () =>
    import("@/components/ui/brand-strategy-story").then(
      (m) => m.BrandStrategyStory
    ),
  { ssr: true }
);
const BrandStrategyRelated = dynamic(
  () =>
    import("@/components/ui/brand-strategy-related").then(
      (m) => m.BrandStrategyRelated
    ),
  { ssr: true }
);
const BrandStrategyFinale = dynamic(
  () =>
    import("@/components/ui/brand-strategy-finale").then(
      (m) => m.BrandStrategyFinale
    ),
  { ssr: true }
);

export function BrandStrategyPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <BrandStrategyHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <BrandStrategyProblem />
        </div>
        <div className="s12-atm-cool relative">
          <BrandStrategySystem />
        </div>
        <div className="s12-atm-cloud relative">
          <BrandStrategyArchitecture />
        </div>
        <div className="s12-atm-editorial relative">
          <BrandStrategyCapabilities />
        </div>
        <div className="s12-atm-balanced relative">
          <BrandStrategyFramework />
        </div>
        <div className="s12-atm-editorial relative">
          <BrandStrategyOutcomes />
        </div>
        <div className="s12-atm-calm relative">
          <BrandStrategyStory />
        </div>
        <div className="s12-atm-editorial relative">
          <BrandStrategyRelated />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <BrandStrategyFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
