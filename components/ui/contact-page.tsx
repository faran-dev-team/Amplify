"use client";

import dynamic from "next/dynamic";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { ContactHero } from "@/components/ui/contact-hero";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const ContactGateways = dynamic(
  () =>
    import("@/components/ui/contact-gateways").then((m) => m.ContactGateways),
  { ssr: true }
);
const ContactForm = dynamic(
  () => import("@/components/ui/contact-form").then((m) => m.ContactForm),
  { ssr: true }
);
const ContactPresence = dynamic(
  () =>
    import("@/components/ui/contact-presence").then((m) => m.ContactPresence),
  { ssr: true }
);
const ContactSocial = dynamic(
  () => import("@/components/ui/contact-social").then((m) => m.ContactSocial),
  { ssr: true }
);
const ContactFinale = dynamic(
  () => import("@/components/ui/contact-finale").then((m) => m.ContactFinale),
  { ssr: true }
);

export function ContactPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <ContactHero />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-calm relative">
          <ContactGateways />
        </div>
        <div className="s12-atm-editorial relative">
          <ContactForm />
        </div>
        <div className="s12-atm-cloud relative">
          <ContactPresence />
        </div>
        <div className="s12-atm-balanced relative">
          <ContactSocial />
        </div>
        <ServicesSignalVein />
        <div className="s12-atm-finale relative">
          <ContactFinale />
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
