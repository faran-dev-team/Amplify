import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/components/booking/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const SITE_URL = "https://scale12x.com";
const SITE_NAME = "Scale 12x";
const SITE_TITLE = "Scale 12x | AI-Native Growth Studio";
const SITE_DESCRIPTION =
  "Scale Faster. Scale Smarter. Scale with AI. Scale 12x is an elite AI-native growth studio helping ambitious companies scale exponentially — one partner, every channel, founder-led execution across London, New York, Dubai, San Francisco, and Riyadh.";

export const viewport: Viewport = {
  themeColor: "#050814",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Scale 12x",
    "AI-native growth studio",
    "business growth",
    "growth strategy",
    "enterprise growth",
    "AI marketing",
    "digital transformation",
    "founder-led agency",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Scale 12x — AI-Native Growth Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scale 12x",
  legalName: "Scale 12x",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/scale-12x.png`,
  description: SITE_DESCRIPTION,
  email: "hello@scale12x.com",
  foundingDate: "2026",
  slogan: "Scale Faster. Scale Smarter. Scale with AI.",
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "City", name: "New York" },
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "San Francisco" },
    { "@type": "City", name: "Riyadh" },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${spaceGrotesk.variable} ${playfair.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#050814] text-[#F4F7FC]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
