import type { Metadata } from "next";
import Link from "next/link";
import MasterVehiclePage from "@/components/MasterVehiclePage";
import { getFleet } from "@/lib/fleet-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Car Rental with Driver in Bengaluru",
  description:
    "Chauffeur-driven sedans and SUVs on rent in Bengaluru — Dzire, Ertiga, Innova, Innova Crysta, Innova HyCross and Fortuner, for local, outstation and airport travel.",
  path: "/car-rental-bangalore",
  keywords: [
    "car rental Bangalore with driver",
    "chauffeur driven car Bangalore",
    "sedan rental Bangalore",
    "Dzire rental Bangalore",
    "Ertiga rental Bangalore",
    "Innova rental Bangalore",
    "Innova Crysta rental Bangalore",
    "Innova HyCross rental Bangalore",
    "Fortuner rental Bangalore",
    "SUV rental Bangalore",
  ],
});

export default async function CarMasterPage() {
  const fleet = await getFleet();

  return (
    <MasterVehiclePage
      eyebrow="Bengaluru's Car & SUV Fleet"
      title="Car Rental with Driver in Bengaluru"
      description="Chauffeur-driven sedans and SUVs — Dzire, Ertiga, Innova, Innova Crysta, Innova HyCross and Fortuner — for local trips, airport runs and outstation travel."
      breadcrumbLabel="Car Rental"
      categories={["sedan", "suv"]}
      fleet={fleet}
      whatsappMessage="Hi, I'd like to enquire about car rental with driver in Bengaluru."
      intro={
        <>
          <p className="leading-relaxed">
            For solo travel, small families or quick city runs, Renuka Tours &amp; Travels offers
            a chauffeur-driven{" "}
            <Link href="/fleet/maruti-dzire" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Maruti Suzuki Dzire</Link> or{" "}
            <Link href="/fleet/maruti-ertiga" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Maruti Ertiga</Link>, and for more
            room, the{" "}
            <Link href="/fleet/toyota-innova-crysta" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Toyota Innova Crysta</Link>,{" "}
            <Link href="/fleet/toyota-innova-hycross" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Innova HyCross</Link> or{" "}
            <Link href="/fleet/toyota-fortuner" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Fortuner</Link>. Every car comes
            with a verified, background-checked driver.
          </p>
          <p className="mt-4 leading-relaxed">
            Cars are commonly booked for airport transfers, local hourly rentals, and outstation
            trips to destinations like Mysuru, Coorg and Ooty — see the{" "}
            <Link href="/services" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">full range of services</Link>.
          </p>
        </>
      }
      faqs={[
        {
          question: "Which car should I book for a family trip?",
          answer:
            "The Ertiga or Innova Crysta suit families of up to 6-7 with luggage; the Dzire suits smaller groups or solo airport runs; the Fortuner and Innova HyCross suit those wanting a more premium ride.",
        },
        {
          question: "Are the cars available with a driver?",
          answer:
            "Yes, every car is chauffeur-driven by a verified, background-checked driver — self-drive rental isn't offered.",
        },
        {
          question: "Can I book a car for an outstation trip from Bengaluru?",
          answer:
            "Yes — outstation car rental is billed per kilometre, with tolls, driver allowance and any permit charges shown upfront before you confirm.",
        },
        {
          question: "Is car rental available near me in Bengaluru?",
          answer:
            "Pickup and drop can be arranged across Bengaluru — see the areas served on the locations page for coverage by zone.",
        },
      ]}
    />
  );
}
