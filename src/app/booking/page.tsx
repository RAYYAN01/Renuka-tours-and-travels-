import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/BookingForm";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

const bookingDescription =
  "Book your car, SUV, tempo traveller or coach with Renuka Tours & Travels — transparent pricing, verified drivers, confirmed within the hour.";

export const metadata: Metadata = pageMetadata({
  title: "Book a Ride",
  description: bookingDescription,
  path: "/booking",
  keywords: [
    "book a cab online Bengaluru",
    "car rental booking Bengaluru",
    "outstation trip booking",
    "tempo traveller booking",
    "instant cab booking Bengaluru",
    "book SUV online Bengaluru",
    "advance cab booking for trip Bengaluru",
    "wedding car booking Bengaluru",
    "corporate cab booking Bengaluru",
  ],
});

const bookingJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Book a Ride",
  description: bookingDescription,
  url: absoluteUrl("/booking"),
  provider: { "@id": `${absoluteUrl("/")}#organization` },
  potentialAction: {
    "@type": "ReserveAction",
    target: absoluteUrl("/booking"),
  },
};

export default function BookingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(bookingJsonLd)} />
      <PageHeader
        eyebrow="Book a Ride"
        title="Let's get you moving"
        description="Share a few details and our team will confirm your vehicle, price and pickup time — usually within the hour."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a Ride" }]}
      />
      <section className="bg-ivory pb-24 sm:pb-32">
        <Container>
          <BookingForm />
        </Container>
      </section>
    </>
  );
}
