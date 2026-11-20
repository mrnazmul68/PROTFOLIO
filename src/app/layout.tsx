import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GSAPProvider } from "@/components/animations/GSAPProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ThemeScript } from "@/components/ui/ThemeToggle";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const socialUrls = Object.values(siteConfig.socials);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.displayName} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [
    "Nazmul Islam",
    "Nazmul Islam Mazumdar",
    "Full Stack Developer",
    "Web Developer Bangladesh",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Computer Science student",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${siteConfig.displayName} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: ["/images/og/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "light dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.name,
      alternateName: siteConfig.displayName,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.profileImage),
      jobTitle: siteConfig.title,
      description: siteConfig.description,
      email: `mailto:${siteConfig.email}`,
      sameAs: socialUrls,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: siteConfig.university,
      },
      knowsAbout: [
        "Web Development",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "BD",
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.url,
      name: `${siteConfig.displayName} — Portfolio`,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {
        "@id": absoluteUrl("/#person"),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="relative min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeScript />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <GSAPProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </GSAPProvider>
        <Analytics />
      </body>
    </html>
  );
}
