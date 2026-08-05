"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { WovenLightHero } from "@/components/ui/woven-light-hero";

const SignalOutcomes = dynamic(
  () =>
    import("@/components/ui/signal-outcomes").then((m) => m.SignalOutcomes),
  { ssr: true }
);
const GrowthCapabilities = dynamic(
  () =>
    import("@/components/ui/growth-capabilities").then(
      (m) => m.GrowthCapabilities
    ),
  { ssr: true }
);
const TrustEcosystem = dynamic(
  () =>
    import("@/components/ui/trust-ecosystem").then((m) => m.TrustEcosystem),
  { ssr: true }
);
const TransformationArchive = dynamic(
  () =>
    import("@/components/ui/transformation-archive").then(
      (m) => m.TransformationArchive
    ),
  { ssr: true }
);
const VoicesBehindGrowth = dynamic(
  () =>
    import("@/components/ui/voices-behind-growth").then(
      (m) => m.VoicesBehindGrowth
    ),
  { ssr: true }
);
const ConversationBeforeBegin = dynamic(
  () =>
    import("@/components/ui/conversation-before-begin").then(
      (m) => m.ConversationBeforeBegin
    ),
  { ssr: true }
);
const ClosingChapter = dynamic(
  () =>
    import("@/components/ui/closing-chapter").then((m) => m.ClosingChapter),
  { ssr: true }
);

/**
 * Experience shell — WebGL atmosphere lives only inside the Hero.
 * Below-fold sections are code-split for smooth scrolling on low-memory devices.
 * Visual stage: layered midnight / cloud-blue / violet design system.
 */
export function AmplifyHome() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <WovenLightHero />
        </div>
        <div className="s12-atm-calm relative">
          <SignalOutcomes />
        </div>
        <div className="s12-atm-editorial relative">
          <GrowthCapabilities />
        </div>
        <div className="s12-atm-cool relative">
          <TrustEcosystem />
        </div>
        <div className="s12-atm-editorial relative">
          <TransformationArchive />
        </div>
        <div className="s12-atm-balanced relative">
          <VoicesBehindGrowth />
        </div>
        <div className="s12-atm-cloud relative">
          <ConversationBeforeBegin />
        </div>
        <div className="s12-atm-finale relative">
          <ClosingChapter />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
