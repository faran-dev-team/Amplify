import type { Metadata } from "next";
import { Geist, Space_Grotesk, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Amplify IT & Media | AI-Native Growth Studio",
  description:
    "Growth, amplified. One partner. Every channel. Built on AI. The AI-native growth studio for US businesses tired of juggling five agencies — ads, content, SEO, brand, websites, cloud, generative AI, cybersecurity, and digital transformation.",
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
      <body className="flex min-h-full flex-col bg-[#030208] text-white">
        {children}
      </body>
    </html>
  );
}
