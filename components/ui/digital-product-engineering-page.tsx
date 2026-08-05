"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { DigitalProductEngineeringHero } from "@/components/ui/digital-product-engineering-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const DigitalProductEngineeringProblem = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-problem").then(
      (m) => m.DigitalProductEngineeringProblem
    ),
  { ssr: true }
);
const DigitalProductEngineeringSystem = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-system").then(
      (m) => m.DigitalProductEngineeringSystem
    ),
  { ssr: true }
);
const DigitalProductEngineeringJourney = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-journey").then(
      (m) => m.DigitalProductEngineeringJourney
    ),
  { ssr: true }
);
const DigitalProductEngineeringCapabilities = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-capabilities").then(
      (m) => m.DigitalProductEngineeringCapabilities
    ),
  { ssr: true }
);
const DigitalProductEngineeringStack = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-stack").then(
      (m) => m.DigitalProductEngineeringStack
    ),
  { ssr: true }
);
const DigitalProductEngineeringOutcomes = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-outcomes").then(
      (m) => m.DigitalProductEngineeringOutcomes
    ),
  { ssr: true }
);
const DigitalProductEngineeringStory = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-story").then(
      (m) => m.DigitalProductEngineeringStory
    ),
  { ssr: true }
);
const DigitalProductEngineeringRelated = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-related").then(
      (m) => m.DigitalProductEngineeringRelated
    ),
  { ssr: true }
);
const DigitalProductEngineeringFinale = dynamic(
  () =>
    import("@/components/ui/digital-product-engineering-finale").then(
      (m) => m.DigitalProductEngineeringFinale
    ),
  { ssr: true }
);

export function DigitalProductEngineeringPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <DigitalProductEngineeringHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <DigitalProductEngineeringProblem />
        </div>
        <div className="s12-atm-cool relative">
          <DigitalProductEngineeringSystem />
        </div>
        <div className="s12-atm-cloud relative">
          <DigitalProductEngineeringJourney />
        </div>
        <div className="s12-atm-editorial relative">
          <DigitalProductEngineeringCapabilities />
        </div>
        <div className="s12-atm-balanced relative">
          <DigitalProductEngineeringStack />
        </div>
        <div className="s12-atm-editorial relative">
          <DigitalProductEngineeringOutcomes />
        </div>
        <div className="s12-atm-calm relative">
          <DigitalProductEngineeringStory />
        </div>
        <div className="s12-atm-editorial relative">
          <DigitalProductEngineeringRelated />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <DigitalProductEngineeringFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
