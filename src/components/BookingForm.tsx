"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { FormField, FormTextArea } from "@/components/ui/FormField";
import { fleet } from "@/lib/fleet";
import { services } from "@/lib/services";
import { whatsappHref } from "@/lib/site";

const tripLabels: Record<string, string> = {
  outstation: "Outstation",
  local: "Local Rental",
  airport: "Airport Transfer",
};

export default function BookingForm() {
  const params = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);

  const vehicleSlug = params.get("vehicle");
  const serviceId = params.get("service");
  const vehicle = fleet.find((v) => v.slug === vehicleSlug);
  const service = services.find((s) => s.id === serviceId);
  const isLocal = params.get("trip") === "local";

  const prefill = {
    pickup: params.get("pickup") ?? "",
    destination: params.get("destination") ?? "",
    date: params.get("date") ?? "",
    passengers: params.get("passengers") ?? "",
    trip: params.get("trip") ?? "",
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      "Hi, I'd like to request a booking.",
      vehicle && `Vehicle: ${vehicle.name}`,
      service && `Service: ${service.title}`,
      prefill.trip && `Trip Type: ${tripLabels[prefill.trip] ?? prefill.trip}`,
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      form.get("pickup") && `Pickup: ${form.get("pickup")}`,
      form.get("destination") && `${isLocal ? "Package" : "Destination"}: ${form.get("destination")}`,
      form.get("date") && `Date: ${form.get("date")}`,
      form.get("passengers") && `Passengers: ${form.get("passengers")}`,
      form.get("notes") && `Notes: ${form.get("notes")}`,
    ].filter(Boolean);

    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-forest-950/8 bg-ivory-50 p-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-terracotta-600" strokeWidth={1.5} />
        <h2 className="font-serif-luxury text-3xl text-forest-950">Request sent</h2>
        <p className="max-w-md text-forest-900/65">
          We&apos;ve opened WhatsApp with your booking details pre-filled — just
          hit send and our team will confirm the vehicle, price and pickup
          details shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col gap-4 rounded-2xl border border-forest-950/8 bg-ivory-50 p-6">
        <h3 className="font-serif-luxury text-lg text-forest-950">Your Trip Summary</h3>
        <dl className="flex flex-col gap-3 text-sm">
          {vehicle && (
            <Row label="Vehicle" value={vehicle.name} />
          )}
          {service && <Row label="Service" value={service.title} />}
          {prefill.trip && <Row label="Trip Type" value={tripLabels[prefill.trip] ?? prefill.trip} />}
          {prefill.pickup && <Row label="Pickup" value={prefill.pickup} />}
          {prefill.destination && (
            <Row label={isLocal ? "Package" : "Destination"} value={prefill.destination} />
          )}
          {prefill.date && <Row label="Date" value={prefill.date} />}
          {prefill.passengers && <Row label="Passengers" value={prefill.passengers} />}
          {!vehicle && !service && !prefill.pickup && (
            <p className="text-forest-900/50">
              Fill in the form and we&apos;ll match you with the right vehicle.
            </p>
          )}
        </dl>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border border-forest-950/8 bg-ivory-50 p-7 sm:p-9"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Full Name" name="name" required />
          <FormField label="Phone Number" name="phone" type="tel" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Pickup Location" name="pickup" defaultValue={prefill.pickup} />
          <FormField
            label={isLocal ? "Package" : "Drop / Destination"}
            name="destination"
            defaultValue={prefill.destination}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Date" name="date" type="date" defaultValue={prefill.date} />
          <FormField label="Passengers" name="passengers" type="number" defaultValue={prefill.passengers} />
        </div>
        <FormTextArea label="Additional Notes" name="notes" rows={3} />
        <Magnetic strength={0.2} className="self-start">
          <button
            type="submit"
            className="group flex items-center gap-2 rounded-full bg-terracotta-600 px-6 py-3 text-sm font-semibold text-ivory-50 shadow-terracotta transition-colors hover:bg-terracotta-700"
          >
            Confirm Booking Request
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Magnetic>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-forest-950/8 pb-3">
      <dt className="text-forest-900/50">{label}</dt>
      <dd className="font-medium text-forest-950">{value}</dd>
    </div>
  );
}
