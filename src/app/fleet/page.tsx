import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Work_Sans } from "next/font/google";
import PageFontScope from "@/components/PageFontScope";
import FleetHero from "@/components/fleet/FleetHero";
import FleetGrid from "@/components/fleet/FleetGrid";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Browse our full fleet of sedans, SUVs, tempo travellers, luxury vans and coaches — all with verified drivers and transparent pricing.",
  alternates: {
    canonical: "/fleet",
  },
};

// Font pairing 2/6: Playfair Display + Work Sans — classic magazine luxury
const heading = Playfair_Display({ subsets: ["latin"], weight: ["500", "600"] });
const body = Work_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function FleetPage() {
  return (
    <PageFontScope heading={heading.style.fontFamily} body={body.style.fontFamily}>
      <FleetHero />
      <Suspense fallback={null}>
        <FleetGrid />
      </Suspense>
    </PageFontScope>
  );
}
