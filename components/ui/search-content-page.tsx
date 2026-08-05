"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { SearchContentHero } from "@/components/ui/search-content-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const SearchContentProblem = dynamic(
  () =>
    import("@/components/ui/search-content-problem").then(
      (m) => m.SearchContentProblem
    ),
  { ssr: true }
);
const SearchContentSystem = dynamic(
  () =>
    import("@/components/ui/search-content-system").then(
      (m) => m.SearchContentSystem
    ),
  { ssr: true }
);
const SearchContentEngine = dynamic(
  () =>
    import("@/components/ui/search-content-engine").then(
      (m) => m.SearchContentEngine
    ),
  { ssr: true }
);
const SearchContentCapabilities = dynamic(
  () =>
    import("@/components/ui/search-content-capabilities").then(
      (m) => m.SearchContentCapabilities
    ),
  { ssr: true }
);
const SearchContentAi = dynamic(
  () =>
    import("@/components/ui/search-content-ai").then((m) => m.SearchContentAi),
  { ssr: true }
);
const SearchContentStack = dynamic(
  () =>
    import("@/components/ui/search-content-stack").then(
      (m) => m.SearchContentStack
    ),
  { ssr: true }
);
const SearchContentOutcomes = dynamic(
  () =>
    import("@/components/ui/search-content-outcomes").then(
      (m) => m.SearchContentOutcomes
    ),
  { ssr: true }
);
const SearchContentStory = dynamic(
  () =>
    import("@/components/ui/search-content-story").then(
      (m) => m.SearchContentStory
    ),
  { ssr: true }
);
const SearchContentRelated = dynamic(
  () =>
    import("@/components/ui/search-content-related").then(
      (m) => m.SearchContentRelated
    ),
  { ssr: true }
);
const SearchContentFinale = dynamic(
  () =>
    import("@/components/ui/search-content-finale").then(
      (m) => m.SearchContentFinale
    ),
  { ssr: true }
);

export function SearchContentPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <SearchContentHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <SearchContentProblem />
        </div>
        <div className="s12-atm-cool relative">
          <SearchContentSystem />
        </div>
        <div className="s12-atm-cloud relative">
          <SearchContentEngine />
        </div>
        <div className="s12-atm-editorial relative">
          <SearchContentCapabilities />
        </div>
        <div className="s12-atm-balanced relative">
          <SearchContentAi />
        </div>
        <div className="s12-atm-editorial relative">
          <SearchContentStack />
        </div>
        <div className="s12-atm-calm relative">
          <SearchContentOutcomes />
        </div>
        <div className="s12-atm-balanced relative">
          <SearchContentStory />
        </div>
        <div className="s12-atm-editorial relative">
          <SearchContentRelated />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <SearchContentFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
