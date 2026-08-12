import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import QuickSearch from "@/components/home/QuickSearch";
import FeaturedFleet from "@/components/home/FeaturedFleet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Destinations from "@/components/home/Destinations";
import Stats from "@/components/home/Stats";
import Timeline from "@/components/home/Timeline";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/FAQSection";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Car, SUV & Tempo Traveller Rentals in Bengaluru",
  description:
    "Book cars, SUVs, tempo travellers, luxury vans and coaches in Bengaluru with verified drivers and transparent per-km pricing. Outstation trips, airport transfers, weddings, corporate travel and pilgrimages — confirmed within the hour.",
  keywords: [
    "car rental Bengaluru",
    "tempo traveller rental Bengaluru",
    "SUV rental Bengaluru",
    "outstation cab Bengaluru",
    "airport taxi Bengaluru",
    "luxury van rental Bengaluru",
    "coach rental Bengaluru",
    "self drive cars Bengaluru",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <TrustBar />
      <FeaturedFleet />
      <WhyChooseUs />
      <Destinations />
      <Stats />
      <Timeline />
      <Testimonials />
      <FAQSection />
      <CtaBanner />
    </>
  );
}
