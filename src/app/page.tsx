import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import QuickSearch from "@/components/home/QuickSearch";
import FeaturedFleet from "@/components/home/FeaturedFleet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Destinations from "@/components/home/Destinations";
import Stats from "@/components/home/Stats";
import Timeline from "@/components/home/Timeline";
import FAQSection from "@/components/FAQSection";
import CtaBanner from "@/components/home/CtaBanner";
import { getFleet } from "@/lib/fleet-data";

export const metadata: Metadata = {
  title: "Car, SUV & Tempo Traveller Rentals in Bengaluru",
  description:
    "Book cars, SUVs, tempo travellers and coaches in Bengaluru with verified drivers and transparent per-km pricing — confirmed within the hour.",
  keywords: [
    "car rental Bengaluru",
    "tempo traveller rental Bengaluru",
    "SUV rental Bengaluru",
    "outstation cab Bengaluru",
    "airport taxi Bengaluru",
    "luxury van rental Bengaluru",
    "coach rental Bengaluru",
    "cab booking Bengaluru with driver",
    "one way cab Bengaluru",
    "round trip cab Bengaluru",
    "affordable outstation cab Bengaluru",
    "17 seater tempo traveller rental",
    "9 seater tempo traveller Bengaluru",
    "mini bus rental for group Bengaluru",
    "car rental for family trip Bengaluru",
    "Bengaluru airport pickup and drop service",
    "24 hour cab service Bengaluru",
    "monthly car rental Bengaluru",
    "chauffeur driven car rental Bengaluru",
    "cab service Whitefield Bengaluru",
    "car rental Electronic City Bengaluru",
    "outstation cab Koramangala",
    "tempo traveller rental Marathahalli",
    "car rental HSR Layout Bengaluru",
    "cab service near Kempegowda International Airport",
    "Bengaluru to Hosur cab",
    "Bengaluru to Tumkur taxi",
    "tempo traveller near me",
    "tempo traveller on rent near me",
  ],
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const fleet = await getFleet();
  return (
    <>
      <Hero />
      <QuickSearch />
      <TrustBar />
      <FeaturedFleet />
      <WhyChooseUs />
      <Destinations />
      <Stats />
      <Timeline fleetCount={fleet.length} />
      <FAQSection />
      <CtaBanner />
    </>
  );
}
