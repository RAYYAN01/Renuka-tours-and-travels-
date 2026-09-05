import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServices } from "@/lib/services-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pilgrimage Tour Vehicle Rental in Bengaluru",
  description:
    "Tempo travellers and buses for temple and pilgrimage tours from Bengaluru — early-morning darshan departures and multi-day pilgrimage circuits, 9 to 35 seater options.",
  path: "/pilgrimage-travel",
  keywords: [
    "pilgrimage tour vehicle Bangalore",
    "pilgrimage tempo traveller Bangalore",
    "pilgrimage bus rental Bangalore",
    "temple tour vehicle Bangalore",
    "temple tour tempo traveller Bangalore",
    "pilgrimage travel Bangalore",
    "family pilgrimage vehicle Bangalore",
    "group pilgrimage bus Bangalore",
  ],
});

export default async function PilgrimageTravelPage() {
  const services = await getServices();
  const service = services.find((s) => s.id === "pilgrimage");
  if (!service) notFound();

  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Pilgrimage Travel"
      title="Pilgrimage Tour Vehicle Rental in Bengaluru"
      description="Tempo travellers and buses for temple and pilgrimage tours — early-morning darshan departures and multi-day circuits, sized from 9 to 35 seats."
      breadcrumbLabel="Pilgrimage Travel"
      path="/pilgrimage-travel"
      whatsappMessage="Hi, I'd like to enquire about a pilgrimage tour vehicle."
      intro={
        <>
          <p className="leading-relaxed">{service.description}</p>
          <p className="leading-relaxed">
            Pilgrimage groups from Bengaluru commonly travel to Tirupati, Dharmasthala, Kukke
            Subramanya and Mantralaya — see the{" "}
            <Link href="/destinations" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">destinations page</Link>{" "}
            for estimated cost and recommended vehicle per route. Vehicles range from a{" "}
            <Link href="/fleet/tempo-traveller-9-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">9 seater tempo traveller</Link>{" "}
            for a small family group up to a{" "}
            <Link href="/bus-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">bus</Link> for
            a larger temple group.
          </p>
          <p className="leading-relaxed">
            Travelling as a larger family or friend group rather than a pilgrimage tour? See{" "}
            <Link href="/group-travel" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">group travel</Link> for
            the same fleet framed around family and corporate outings.
          </p>
        </>
      }
      faqs={[
        {
          question: "Can you arrange an early-morning departure for darshan?",
          answer: "Yes, early-morning darshan departures are supported for pilgrimage tours.",
        },
        {
          question: "What vehicle suits a temple tour group?",
          answer:
            "A 9 to 17 seater tempo traveller suits small to mid-size groups, while a bus suits larger temple groups — sized to your group.",
        },
        {
          question: "Are multi-day pilgrimage circuits supported?",
          answer: "Yes, multi-day pilgrimage circuits covering multiple temples are supported.",
        },
        {
          question: "Which pilgrimage destinations from Bengaluru are commonly served?",
          answer:
            "Tirupati, Dharmasthala, Kukke Subramanya and Mantralaya are commonly travelled pilgrimage routes — see the destinations page for details.",
        },
      ]}
    />
  );
}
