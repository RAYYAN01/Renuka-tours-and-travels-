import type { Metadata } from "next";
import Link from "next/link";
import MasterVehiclePage from "@/components/MasterVehiclePage";
import { getFleet } from "@/lib/fleet-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tempo Traveller Rental in Bengaluru",
  description:
    "9, 12 and 17 seater tempo travellers and Force Urbania on rent in Bengaluru — chauffeur-driven, AC, for outstation trips, weddings, corporate travel and pilgrimage tours.",
  path: "/tempo-traveller-rental-bangalore",
  keywords: [
    "tempo traveller Bangalore",
    "tempo traveller Bengaluru",
    "tempo traveller rental Bangalore",
    "tempo traveller hire Bangalore",
    "tempo traveller booking Bangalore",
    "tempo traveller near me",
    "tempo traveller with driver Bangalore",
    "AC tempo traveller Bangalore",
    "luxury tempo traveller Bangalore",
    "tempo traveller for outstation Bangalore",
    "9 seater tempo traveller Bangalore",
    "12 seater tempo traveller Bangalore",
    "17 seater tempo traveller Bangalore",
  ],
});

export default async function TempoTravellerMasterPage() {
  const fleet = await getFleet();

  return (
    <MasterVehiclePage
      eyebrow="Bengaluru's Tempo Traveller Fleet"
      title="Tempo Traveller Rental in Bengaluru"
      description="9, 12 and 17 seater tempo travellers and Force Urbania, all chauffeur-driven — for family trips, outstation journeys, weddings, corporate travel and pilgrimage tours."
      breadcrumbLabel="Tempo Traveller Rental"
      categories={["traveller", "luxury-van"]}
      fleet={fleet}
      whatsappMessage="Hi, I'd like to enquire about tempo traveller rental in Bengaluru."
      intro={
        <>
          <p className="leading-relaxed">
            Renuka Tours &amp; Travels runs a full tempo traveller fleet in Bengaluru — from a
            compact <Link href="/fleet/tempo-traveller-9-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">9 seater</Link> for
            small groups, to a{" "}
            <Link href="/fleet/force-traveller-yaksha" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">12 seater luxury tempo traveller</Link>{" "}
            for executive travel, a{" "}
            <Link href="/fleet/force-traveller-b" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">17 seater</Link>{" "}
            for larger family or pilgrimage groups, and the{" "}
            <Link href="/fleet/force-urbania" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Force Urbania</Link>{" "}
            for a plusher ride. Every vehicle comes with a verified, background-checked driver —
            self-drive isn&apos;t offered.
          </p>
          <p className="mt-4 leading-relaxed">
            Tempo travellers from Bengaluru are commonly booked for outstation trips to Coorg,
            Mysuru, Ooty and Tirupati, for corporate offsites, wedding guest transport, and
            group pilgrimage tours — see the{" "}
            <Link href="/destinations" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">full list of destinations</Link>{" "}
            or the <Link href="/pilgrimage-travel" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">pilgrimage travel</Link> page for group-size guidance.
          </p>
        </>
      }
      faqs={[
        {
          question: "Which tempo traveller size should I book?",
          answer:
            "A 9 seater suits small family or friend groups, a 12 seater luxury tempo traveller suits executive or mid-size groups, and a 17 seater or Force Urbania suits larger family, corporate or pilgrimage groups.",
        },
        {
          question: "Do tempo travellers come with a driver?",
          answer:
            "Yes, every tempo traveller is chauffeur-driven by a verified, background-checked driver. Self-drive rental isn't offered.",
        },
        {
          question: "Can I book a tempo traveller for an outstation trip from Bengaluru?",
          answer:
            "Yes — outstation tempo traveller trips are billed per kilometre, with tolls, driver allowance and any interstate permit charges shown upfront.",
        },
        {
          question: "Is a tempo traveller available near me in Bengaluru?",
          answer:
            "Pickup and drop can be arranged across Bengaluru — see the areas served on the locations page, or WhatsApp your pickup point for confirmation.",
        },
        {
          question: "How much does a tempo traveller cost in Bengaluru?",
          answer:
            "Pricing starts per kilometre and varies by vehicle size — see the fleet page for the current starting rate for each tempo traveller, or request a quote for your exact route.",
        },
      ]}
    />
  );
}
