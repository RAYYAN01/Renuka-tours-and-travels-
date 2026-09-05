import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServices } from "@/lib/services-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wedding Transportation in Bengaluru",
  description:
    "Wedding car, tempo traveller and bus rental in Bengaluru — multi-vehicle coordination, fleet decoration on request, and a dedicated event-day coordinator.",
  path: "/wedding-transport",
  keywords: [
    "wedding car rental Bangalore",
    "wedding bus rental Bangalore",
    "wedding tempo traveller Bangalore",
    "wedding transportation Bangalore",
    "wedding guest transportation Bangalore",
    "wedding travel vehicle Bangalore",
    "wedding bus hire Bangalore",
    "wedding group transportation Bangalore",
    "luxury wedding car Bangalore",
    "wedding guest shuttle Bangalore",
  ],
});

export default async function WeddingTransportPage() {
  const services = await getServices();
  const service = services.find((s) => s.id === "wedding");
  if (!service) notFound();

  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Wedding Transport"
      title="Wedding Transportation in Bengaluru"
      description="Coordinated car, tempo traveller and bus transport for weddings — guest shuttles, family cars and multi-day function coverage, with one dedicated coordinator."
      breadcrumbLabel="Wedding Transport"
      path="/wedding-transport"
      whatsappMessage="Hi, I'd like to enquire about wedding transportation."
      intro={
        <>
          <p className="leading-relaxed">{service.description}</p>
          <p className="leading-relaxed">
            Weddings often need several vehicle types at once — a car for the family, a{" "}
            <Link href="/tempo-traveller-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">tempo traveller</Link>{" "}
            for close relatives, and a{" "}
            <Link href="/bus-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">bus</Link> for
            larger guest groups — all coordinated together for multi-day functions, with fleet
            decoration available on request.
          </p>
        </>
      }
      faqs={[
        {
          question: "Can you coordinate multiple vehicles for a wedding?",
          answer:
            "Yes — multi-vehicle coordination is available for weddings, including cars, tempo travellers and buses for different guest groups.",
        },
        {
          question: "Is vehicle decoration available for weddings?",
          answer: "Yes, fleet decoration is available on request.",
        },
        {
          question: "Do you provide transport for multi-day wedding functions?",
          answer:
            "Yes, a dedicated event-day coordinator helps manage transport across multiple functions and days.",
        },
        {
          question: "What vehicle suits wedding guest transport?",
          answer:
            "Tempo travellers and buses are commonly used for guest shuttles, while cars and SUVs suit the immediate family — sized to your guest count.",
        },
      ]}
    />
  );
}
