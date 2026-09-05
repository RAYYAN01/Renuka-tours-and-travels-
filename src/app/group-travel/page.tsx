import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServices } from "@/lib/services-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Group & Family Travel Rental in Bengaluru",
  description:
    "9 to 35 seater tempo travellers and buses for family trips and group outings from Bengaluru — chauffeur-driven, sized to your group.",
  path: "/group-travel",
  keywords: [
    "group travel Bangalore",
    "group transportation Bangalore",
    "family trip vehicle Bangalore",
    "family tempo traveller Bangalore",
    "group tempo traveller Bangalore",
    "family vehicle rental Bangalore",
    "group bus rental Bangalore",
    "family outstation vehicle Bangalore",
  ],
});

export default async function GroupTravelPage() {
  const services = await getServices();
  const service = services.find((s) => s.id === "pilgrimage");
  if (!service) notFound();

  return (
    <ServiceDetailPage
      service={service}
      eyebrow="Group Travel"
      title="Group & Family Travel Rental in Bengaluru"
      description="9 to 35 seater tempo travellers and buses for family trips, friend group outings and reunions from Bengaluru — chauffeur-driven and sized to your group."
      breadcrumbLabel="Group Travel"
      path="/group-travel"
      whatsappMessage="Hi, I'd like to enquire about a vehicle for a group trip."
      intro={
        <>
          <p className="leading-relaxed">
            For family trips, friend group getaways and reunions, the same fleet used for
            pilgrimage tours works well for group travel too — from a{" "}
            <Link href="/fleet/tempo-traveller-9-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">9 seater tempo traveller</Link> for
            a small family, up to a{" "}
            <Link href="/bus-rental-bangalore" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">bus</Link> for
            a larger reunion or friend group.
          </p>
          <p className="leading-relaxed">{service.description}</p>
          <p className="leading-relaxed">
            Popular group trip destinations from Bengaluru include Coorg, Ooty, Wayanad and
            Chikmagalur — see{" "}
            <Link href="/destinations" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">destinations</Link>{" "}
            for estimated cost and recommended vehicle per route. Travelling for a temple visit
            instead? See{" "}
            <Link href="/pilgrimage-travel" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">pilgrimage travel</Link>.
          </p>
        </>
      }
      faqs={[
        {
          question: "What vehicle suits a family group trip?",
          answer:
            "A 9 to 12 seater tempo traveller suits most family groups; a 17 seater, Force Urbania or bus suits a larger reunion or friend group.",
        },
        {
          question: "Can I book a vehicle for a weekend getaway with friends?",
          answer:
            "Yes — tempo travellers are commonly booked for weekend getaways to destinations like Coorg, Ooty and Wayanad.",
        },
        {
          question: "Is a driver included for group trips?",
          answer: "Yes, every vehicle is chauffeur-driven by a verified, background-checked driver.",
        },
        {
          question: "How is pricing calculated for a group outstation trip?",
          answer:
            "Group outstation trips are billed per kilometre, with tolls, driver allowance and any permit charges shown upfront.",
        },
      ]}
    />
  );
}
