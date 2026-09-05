import type { Metadata } from "next";
import Link from "next/link";
import MasterVehiclePage from "@/components/MasterVehiclePage";
import { getFleet } from "@/lib/fleet-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bus & Mini Bus Rental in Bengaluru",
  description:
    "21, 25 and 50 seater buses on rent in Bengaluru with a driver — for corporate offsites, weddings, pilgrimage tours and large group travel.",
  path: "/bus-rental-bangalore",
  keywords: [
    "bus rental Bangalore",
    "bus hire Bangalore",
    "tourist bus rental Bangalore",
    "tourist bus hire Bangalore",
    "mini bus rental Bangalore",
    "mini bus hire Bangalore",
    "AC bus rental Bangalore",
    "21 seater bus Bangalore",
    "25 seater mini bus Bangalore",
    "50 seater bus Bangalore",
    "coach rental Bangalore",
    "bus rental with driver Bangalore",
  ],
});

export default async function BusMasterPage() {
  const fleet = await getFleet();

  return (
    <MasterVehiclePage
      eyebrow="Bengaluru's Coach Fleet"
      title="Bus & Mini Bus Rental in Bengaluru"
      description="21, 25 and 50 seater buses with a driver — for corporate offsites, weddings, pilgrimage tours and large group outstation trips."
      breadcrumbLabel="Bus & Mini Bus Rental"
      categories={["coach"]}
      fleet={fleet}
      whatsappMessage="Hi, I'd like to enquire about bus rental in Bengaluru."
      intro={
        <>
          <p className="leading-relaxed">
            For groups larger than a tempo traveller can seat, Renuka Tours &amp; Travels runs a{" "}
            <Link href="/fleet/bus-21-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">21 seater bus</Link>,{" "}
            <Link href="/fleet/mini-bus-25-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">25 seater mini bus</Link> and{" "}
            <Link href="/fleet/bus-50-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">50 seater bus</Link>, each
            chauffeur-driven and air-conditioned.
          </p>
          <p className="mt-4 leading-relaxed">
            Buses are commonly booked for{" "}
            <Link href="/corporate-travel" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">corporate offsites</Link>,{" "}
            <Link href="/wedding-transport" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">wedding guest transport</Link>, and{" "}
            <Link href="/pilgrimage-travel" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">group pilgrimage tours</Link>. Pricing for
            buses is on request since it depends on route, duration and group size — reach out
            for an exact quote.
          </p>
        </>
      }
      faqs={[
        {
          question: "What bus sizes are available in Bengaluru?",
          answer:
            "21, 25 and 50 seater buses are available, all chauffeur-driven and air-conditioned, suited to corporate offsites, weddings and pilgrimage groups.",
        },
        {
          question: "Can I hire a bus for a wedding in Bengaluru?",
          answer:
            "Yes — buses are commonly used for wedding guest transport, especially for multi-day functions with several vehicles coordinated together.",
        },
        {
          question: "How much does bus rental cost in Bengaluru?",
          answer:
            "Bus pricing is provided on request since it depends on route, duration and group size — WhatsApp your requirement for an exact quote.",
        },
        {
          question: "Are buses available for outstation pilgrimage trips?",
          answer:
            "Yes, buses are regularly booked for multi-day group pilgrimage circuits alongside tempo travellers, depending on group size.",
        },
      ]}
    />
  );
}
