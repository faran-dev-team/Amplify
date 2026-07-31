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
 */
export function AmplifyHome() {
  return (
    <main className="relative min-h-screen bg-[#030208]">
      <div className="relative z-10">
        <WovenLightHero />
        <SignalOutcomes />
        <GrowthCapabilities />
        <TrustEcosystem />
        <TransformationArchive />
        <VoicesBehindGrowth />
        <ConversationBeforeBegin />
        <ClosingChapter />
      </div>
      <AmplifyNav />
    </main>
  );
}
