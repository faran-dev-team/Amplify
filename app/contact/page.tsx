import type { Metadata } from "next";
import { ContactPage } from "@/components/ui/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin a conversation with Scale 12x. Book a strategy call, start a project, or reach the team — premium, founder-led growth partnerships.",
  alternates: {
    canonical: "https://scale12x.com/contact",
  },
  openGraph: {
    title: "Contact | Scale 12x",
    description:
      "We're ready when you are. Book a strategy call or start your project with Scale 12x.",
    url: "https://scale12x.com/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}
