"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { FormField, FormTextArea } from "@/components/ui/FormField";
import type { FleetVehicle } from "@/lib/fleet";
import type { Service } from "@/lib/services";
import { useWhatsAppSubmit } from "@/lib/useWhatsAppSubmit";

const tripLabels: Record<string, string> = {
  outstation: "Outstation",
  local: "Local Rental",
  airport: "Airport Transfer",
};

const emptyPrefill = { pickup: "", destination: "", date: "", passengers: "", trip: "" };

export default function BookingForm({
  fleet,
  services,
}: {
  fleet: FleetVehicle[];
  services: Service[];
}) {
  // Query-param prefill (from "/booking?vehicle=…", the QuickSearch bar,
  // etc.) is read client-side after mount rather than via
  // `useSearchParams()`, which would require wrapping this form in a
  // Suspense boundary — and a statically-rendered page ships that
  // boundary's fallback in its HTML, not the real content. That was
  // shipping this entire form (every field, every label) as empty to
  // anyone/anything reading the server-rendered HTML, including
  // crawlers. Reading `window.location.search` here instead keeps the
  // full form in the initial HTML; deep-link prefill just applies a
  // tick later, keyed onto the affected inputs so their `defaultValue`
  // picks up the real value once it's known.
  const [prefill, setPrefill] = useState(emptyPrefill);
  const [vehicleSlug, setVehicleSlug] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Syncing from window.location, a browser-only API with no SSR-safe
    // read; the one-render flash is the intentional tradeoff — see the
    // comment on the state declarations above.
    /* eslint-disable react-hooks/set-state-in-effect */
    setPrefill({
      pickup: params.get("pickup") ?? "",
      destination: params.get("destination") ?? "",
      date: params.get("date") ?? "",
      passengers: params.get("passengers") ?? "",
      trip: params.get("trip") ?? "",
    });
    setVehicleSlug(params.get("vehicle"));
    setServiceId(params.get("service"));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const vehicle = fleet.find((v) => v.slug === vehicleSlug);
  const service = services.find((s) => s.id === serviceId);
  const isLocal = prefill.trip === "local";

  const { sent: confirmed, handleSubmit } = useWhatsAppSubmit((form) => {
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
    return lines.join("\n");
  });

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
        <h2 className="font-serif-luxury text-lg text-forest-950">Your Trip Summary</h2>
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
            <p className="text-forest-900/75">
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
          <FormField
            label="Pickup Location"
            name="pickup"
            value={prefill.pickup}
            onChange={(v) => setPrefill((p) => ({ ...p, pickup: v }))}
          />
          <FormField
            label={isLocal ? "Package" : "Drop / Destination"}
            name="destination"
            value={prefill.destination}
            onChange={(v) => setPrefill((p) => ({ ...p, destination: v }))}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Date"
            name="date"
            type="date"
            value={prefill.date}
            onChange={(v) => setPrefill((p) => ({ ...p, date: v }))}
          />
          <FormField
            label="Passengers"
            name="passengers"
            type="number"
            value={prefill.passengers}
            onChange={(v) => setPrefill((p) => ({ ...p, passengers: v }))}
          />
        </div>
        <FormTextArea label="Additional Notes" name="notes" rows={3} />
        <Button
          type="submit"
          size="lg"
          className="self-start"
          icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        >
          Confirm Booking Request
        </Button>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-forest-950/8 pb-3">
      <dt className="text-forest-900/70">{label}</dt>
      <dd className="font-medium text-forest-950">{value}</dd>
    </div>
  );
}
