"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { CloudInfrastructureHero } from "@/components/ui/cloud-infrastructure-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const CloudInfrastructureProblem = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-problem").then(
      (m) => m.CloudInfrastructureProblem
    ),
  { ssr: true }
);
const CloudInfrastructurePlatform = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-platform").then(
      (m) => m.CloudInfrastructurePlatform
    ),
  { ssr: true }
);
const CloudInfrastructureJourney = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-journey").then(
      (m) => m.CloudInfrastructureJourney
    ),
  { ssr: true }
);
const CloudInfrastructureCapabilities = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-capabilities").then(
      (m) => m.CloudInfrastructureCapabilities
    ),
  { ssr: true }
);
const CloudInfrastructureIntelligence = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-intelligence").then(
      (m) => m.CloudInfrastructureIntelligence
    ),
  { ssr: true }
);
const CloudInfrastructureEcosystem = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-ecosystem").then(
      (m) => m.CloudInfrastructureEcosystem
    ),
  { ssr: true }
);
const CloudInfrastructureOutcomes = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-outcomes").then(
      (m) => m.CloudInfrastructureOutcomes
    ),
  { ssr: true }
);
const CloudInfrastructureStory = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-story").then(
      (m) => m.CloudInfrastructureStory
    ),
  { ssr: true }
);
const CloudInfrastructureRelated = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-related").then(
      (m) => m.CloudInfrastructureRelated
    ),
  { ssr: true }
);
const CloudInfrastructureFinale = dynamic(
  () =>
    import("@/components/ui/cloud-infrastructure-finale").then(
      (m) => m.CloudInfrastructureFinale
    ),
  { ssr: true }
);

export function CloudInfrastructurePage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <CloudInfrastructureHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <CloudInfrastructureProblem />
        </div>
        <div className="s12-atm-cool relative">
          <CloudInfrastructurePlatform />
        </div>
        <div className="s12-atm-cloud relative">
          <CloudInfrastructureJourney />
        </div>
        <div className="s12-atm-editorial relative">
          <CloudInfrastructureCapabilities />
        </div>
        <div className="s12-atm-balanced relative">
          <CloudInfrastructureIntelligence />
        </div>
        <div className="s12-atm-cool relative">
          <CloudInfrastructureEcosystem />
        </div>
        <div className="s12-atm-editorial relative">
          <CloudInfrastructureOutcomes />
        </div>
        <div className="s12-atm-calm relative">
          <CloudInfrastructureStory />
        </div>
        <div className="s12-atm-editorial relative">
          <CloudInfrastructureRelated />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <CloudInfrastructureFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
