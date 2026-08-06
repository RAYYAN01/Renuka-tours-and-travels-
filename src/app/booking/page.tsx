import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Ride",
  description:
    "Book your car, SUV, tempo traveller or coach with Renuka Tours & Travels — transparent pricing, verified drivers, confirmed within the hour.",
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a Ride"
        title="Let's get you moving"
        description="Share a few details and our team will confirm your vehicle, price and pickup time — usually within the hour."
      />
      <section className="bg-ivory pb-24 sm:pb-32">
        <Container>
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
