import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Anton, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import ConversionTracking from "@/components/ConversionTracking";
import SiteChromeGate from "@/components/SiteChromeGate";
import CookieConsent from "@/components/CookieConsent";
import LeadPopup from "@/components/LeadPopup";
import { site } from "@/lib/site";
import { siteUrl, organizationJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { getFleet } from "@/lib/fleet-data";
import { sortFleetForDisplay } from "@/lib/fleet";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const defaultTitle = `${site.name} | Premium Car & Tempo Traveller Rentals`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "tempo traveller rental Bengaluru",
    "outstation cab booking",
    "airport transfer Bengaluru",
    "wedding car rental",
    "corporate travel Bengaluru",
    "luxury car rental",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: siteUrl,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const fleet = sortFleetForDisplay(await getFleet());
  const vehicleNames = fleet.map((v) => v.name);
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScriptProps(organizationJsonLd())}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5VLBDC2QJF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5VLBDC2QJF');
          `}
        </Script>
        <SiteChromeGate>
          <SmoothScroll />
          <ConversionTracking />
          <Navbar />
        </SiteChromeGate>
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <SiteChromeGate>
          <Footer />
          <MobileCtaBar />
          <WhatsAppButton />
          <CookieConsent />
          <LeadPopup vehicleNames={vehicleNames} />
        </SiteChromeGate>
      </body>
    </html>
  );
}
