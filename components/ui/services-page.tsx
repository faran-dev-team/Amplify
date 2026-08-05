"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { ServicesHero } from "@/components/ui/services-hero";
import {
  ServicesBridge,
  ServicesSignalVein,
} from "@/components/ui/services-bridge";

const ServicesOperatingSystem = dynamic(
  () =>
    import("@/components/ui/services-operating-system").then(
      (m) => m.ServicesOperatingSystem
    ),
  { ssr: true }
);
const ServicesGateways = dynamic(
  () =>
    import("@/components/ui/services-gateways").then((m) => m.ServicesGateways),
  { ssr: true }
);
const ServicesStickyShowcase = dynamic(
  () =>
    import("@/components/ui/services-sticky-showcase").then(
      (m) => m.ServicesStickyShowcase
    ),
  { ssr: true }
);
const ServicesWorkflow = dynamic(
  () =>
    import("@/components/ui/services-workflow").then((m) => m.ServicesWorkflow),
  { ssr: true }
);
const ServicesStack = dynamic(
  () =>
    import("@/components/ui/services-stack").then((m) => m.ServicesStack),
  { ssr: true }
);
const ServicesIndustries = dynamic(
  () =>
    import("@/components/ui/services-industries").then(
      (m) => m.ServicesIndustries
    ),
  { ssr: true }
);
const ServicesCases = dynamic(
  () =>
    import("@/components/ui/services-cases").then((m) => m.ServicesCases),
  { ssr: true }
);
const ClosingChapter = dynamic(
  () =>
    import("@/components/ui/closing-chapter").then((m) => m.ClosingChapter),
  { ssr: true }
);

/**
 * Services hub — Growth OS narrative with AI-featured flagship gateways.
 */
export function ServicesPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <ServicesHero />
        </div>

        <ServicesSignalVein />

        <div className="s12-atm-cool relative">
          <ServicesOperatingSystem />
        </div>

        <ServicesBridge
          chapter="02"
          from="Architecture"
          to="Flagship services"
          line="Six gateways into the OS — start with AI, the intelligence that makes every capability compound."
        />

        <div className="s12-atm-editorial relative">
          <ServicesGateways />
        </div>

        <ServicesBridge
          chapter="03"
          from="Capabilities"
          to="Compound loop"
          line="Watch the operating layers lock together — signal, demand, intelligence, infrastructure, scale."
        />

        <div className="s12-atm-cloud relative">
          <ServicesStickyShowcase />
        </div>

        <ServicesBridge
          chapter="04"
          from="System"
          to="Engagement"
          line="Understanding the OS is one thing. Knowing how Scale 12x installs it is another."
        />

        <div className="s12-atm-calm relative">
          <ServicesWorkflow />
        </div>

        <ServicesBridge
          chapter="05"
          from="Process"
          to="Instrumentation"
          line="The stack is curated for leverage — each layer exists to make the OS faster, clearer, safer."
        />

        <div className="s12-atm-editorial relative">
          <ServicesStack />
        </div>

        <ServicesBridge
          chapter="06"
          from="Capability"
          to="Context"
          line="The same OS adapts to how ambitious operators actually buy and grow."
        />

        <div className="s12-atm-cool relative">
          <ServicesIndustries />
        </div>

        <ServicesBridge
          chapter="07"
          from="Context"
          to="Proof"
          line="Theory becomes trust when you see how the OS replaces agency sprawl in the wild."
        />

        <div className="s12-atm-balanced relative">
          <ServicesCases />
        </div>

        <ServicesSignalVein />

        <div className="s12-atm-finale relative">
          <ClosingChapter />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
