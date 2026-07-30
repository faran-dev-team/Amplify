"use client";

import { useEffect, useState } from "react";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { WovenCanvas } from "@/components/ui/woven-canvas";
import { WovenLightHero } from "@/components/ui/woven-light-hero";
import { SignalOutcomes } from "@/components/ui/signal-outcomes";
import { GrowthCapabilities } from "@/components/ui/growth-capabilities";
import { TrustEcosystem } from "@/components/ui/trust-ecosystem";
import { TransformationArchive } from "@/components/ui/transformation-archive";
import { VoicesBehindGrowth } from "@/components/ui/voices-behind-growth";
import { ConversationBeforeBegin } from "@/components/ui/conversation-before-begin";
import { ClosingChapter } from "@/components/ui/closing-chapter";

/** Barely-there atmosphere softener past the hero — keeps particles readable */
const ATMOSPHERE_BLUR_PX = 2.5;
const FINALE_BLUR_PX = 4.5;

/**
 * Continuous experience shell —
 * Hero → Outcomes → Capabilities → Trust → Transformation → Voices → Conversation → Closing.
 */
export function AmplifyHome() {
  const [pastHero, setPastHero] = useState(false);
  const [inFinale, setInFinale] = useState(false);

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.62;
      setPastHero(window.scrollY > threshold);

      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / maxScroll;
      setInFinale(progress > 0.82);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const blurPx = inFinale
    ? FINALE_BLUR_PX
    : pastHero
      ? ATMOSPHERE_BLUR_PX
      : 0;
  const canvasOpacity = inFinale ? 0.55 : pastHero ? 0.92 : 1;

  return (
    <main className="relative min-h-screen bg-[#030208]">
      <div
        className="pointer-events-none fixed inset-0 z-0 will-change-[filter] transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          filter: `blur(${blurPx}px)`,
          opacity: canvasOpacity,
        }}
        aria-hidden
      >
        <WovenCanvas />
      </div>

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
