import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServices } from "@/lib/services-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Outstation Car & Tempo Traveller Rental in Bengaluru",
  description:
    "Outstation cabs, tempo travellers and buses from Bengaluru — round trip or one-way, per-kilometre billing with tolls and driver allowance shown upfront.",
  path: "/outstation-car-rental-bangalore",
  keywords: [
    "outstation taxi Bangalore",
    "outstation cab Bangalore",
    "outstation car rental Bangalore",
    "outstation tempo traveller Bangalore",
    "outstation vehicle rental Bangalore",
    "outstation travel Bangalore",
    "outstation taxi near me",
    "Bangalore outstation vehicle rental",
    "Bangalore outstation tempo traveller",
  ],
});

export default async function OutstationPage() {
  const services = await getServices();
  const service = services.find((s) => s.id === "outstation");
  if (!service) notFound();

  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Outstation Travel"
      title="Outstation Car & Tempo Traveller Rental in Bengaluru"
      description="Round trip or one-way outstation travel from Bengaluru — sedans, SUVs, tempo travellers and buses, billed per kilometre with everything shown upfront."
      breadcrumbLabel="Outstation Travel"
      path="/outstation-car-rental-bangalore"
      whatsappMessage="Hi, I'd like to enquire about an outstation trip from Bengaluru."
      intro={
        <>
          <p className="leading-relaxed">{service.description}</p>
          <p className="leading-relaxed">
            Outstation trips from Bengaluru are billed per kilometre, with tolls, driver
            allowance and any interstate permit charges shown before you confirm — there&apos;s
            no surge pricing. Choose a{" "}
            <Link href="/car-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">car or SUV</Link>{" "}
            for smaller groups, or a{" "}
            <Link href="/tempo-traveller-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">tempo traveller</Link>{" "}
            or <Link href="/bus-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">bus</Link> for
            larger groups.
          </p>
          <p className="leading-relaxed">
            Popular outstation routes from Bengaluru include Mysuru, Coorg, Ooty, Hampi,
            Tirupati, Wayanad, Goa, Munnar and Kodaikanal — see the{" "}
            <Link href="/destinations" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">full destinations list</Link>{" "}
            with estimated cost and recommended vehicle for each.
          </p>
        </>
      }
      relatedLinks={
        <Link href="/destinations" className="text-sm font-medium text-terracotta-600 hover:underline">
          Browse destinations →
        </Link>
      }
      faqs={[
        {
          question: "How is outstation pricing calculated?",
          answer:
            "Outstation trips are billed per kilometre. Tolls, driver allowance and any interstate permit charges are shown upfront before you confirm.",
        },
        {
          question: "Can I book a one-way outstation trip?",
          answer: "Yes, both round trip and one-way outstation options are available.",
        },
        {
          question: "Which vehicle suits an outstation group trip?",
          answer:
            "A sedan or SUV suits up to 7 people, a tempo traveller suits mid-size groups, and a bus suits larger groups — see the fleet page for exact seating and pricing.",
        },
        {
          question: "Are multi-day outstation itineraries supported?",
          answer: "Yes, multi-day itineraries with the same driver and vehicle are supported.",
        },
      ]}
    />
  );
}
