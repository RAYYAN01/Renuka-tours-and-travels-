import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServices } from "@/lib/services-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Corporate Travel & Employee Transportation in Bengaluru",
  description:
    "Corporate cab, car and tempo traveller rental in Bengaluru with monthly billing and a dedicated account manager — for daily commutes, offsites and client transport.",
  path: "/corporate-travel",
  keywords: [
    "corporate travel Bangalore",
    "corporate cab Bangalore",
    "corporate car rental Bangalore",
    "corporate transportation Bangalore",
    "employee transportation Bangalore",
    "corporate tempo traveller Bangalore",
    "corporate bus rental Bangalore",
    "company outing transportation Bangalore",
    "corporate event transportation Bangalore",
    "corporate offsite transportation Bangalore",
  ],
});

export default async function CorporateTravelPage() {
  const services = await getServices();
  const service = services.find((s) => s.id === "corporate");
  if (!service) notFound();

  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Corporate Travel"
      title="Corporate Travel & Employee Transportation in Bengaluru"
      description="Monthly-billed corporate cab and vehicle rental — daily employee transport, client pickups, offsites and company events, with a dedicated account manager."
      breadcrumbLabel="Corporate Travel"
      path="/corporate-travel"
      whatsappMessage="Hi, I'd like to enquire about corporate travel arrangements for my company."
      intro={
        <>
          <p className="leading-relaxed">{service.description}</p>
          <p className="leading-relaxed">
            Corporate accounts get monthly retainer billing, a dedicated account manager and
            priority vehicle availability — useful for daily employee commutes, client pickups,
            interview candidate transport and recurring office runs.
          </p>
          <p className="leading-relaxed">
            For larger company events — offsites, team outings or annual day transport — a{" "}
            <Link href="/tempo-traveller-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">tempo traveller</Link>{" "}
            or <Link href="/bus-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">bus</Link> can
            move the whole group together; for individual travel, see{" "}
            <Link href="/car-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">car rental with driver</Link>.
          </p>
        </>
      }
      faqs={[
        {
          question: "Do you offer monthly billing for corporate accounts?",
          answer: "Yes, corporate accounts get monthly retainer billing and invoicing, plus a dedicated account manager.",
        },
        {
          question: "Can I book a vehicle for a corporate offsite or team outing?",
          answer:
            "Yes — tempo travellers and buses are commonly used for corporate offsites and team outings, sized to your group.",
        },
        {
          question: "Is priority vehicle availability offered for corporate clients?",
          answer: "Yes, corporate accounts get priority vehicle availability for recurring bookings.",
        },
        {
          question: "What kind of corporate transportation is available?",
          answer:
            "Daily employee commutes, client pickups, airport transfers for visiting staff, and event/offsite transport for larger groups.",
        },
      ]}
    />
  );
}
