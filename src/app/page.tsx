import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import QuickSearch from "@/components/home/QuickSearch";
import FeaturedFleet from "@/components/home/FeaturedFleet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Destinations from "@/components/home/Destinations";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/FAQSection";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
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
      <Testimonials />
      <FAQSection />
      <CtaBanner />
    </>
  );
}
