import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that apply when you book with ${site.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated August 2026."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <section className="bg-ivory pb-24 pt-4 sm:pb-32">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-8 text-forest-900/85">
            <p className="text-lg leading-relaxed">
              These terms apply whenever you book a vehicle or service through this website,
              phone, or WhatsApp with {site.name}. By making a booking, you agree to them.
            </p>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Bookings</h2>
              <p className="leading-relaxed">
                Submitting our booking form or a WhatsApp enquiry is a request, not a confirmed
                booking. A booking is confirmed only once our team verifies the vehicle, price,
                and pickup details with you directly by phone or WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Pricing</h2>
              <p className="leading-relaxed">
                Per-km rates shown on this site are starting prices for the listed vehicle
                category. Final fare depends on actual distance travelled, tolls, state permit
                charges (for interstate trips), and driver allowance, all of which are confirmed
                with you before the trip begins. Vehicles marked &ldquo;Price on Request&rdquo;
                require a custom quote based on your specific trip.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">
                Cancellations & changes
              </h2>
              <p className="leading-relaxed">
                Cancellation or rescheduling terms are confirmed at the time of booking and may
                vary by trip type (local, outstation, or multi-day). Please contact our team
                directly for the terms that apply to your specific booking.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Vehicles and drivers</h2>
              <p className="leading-relaxed">
                Every vehicle in our fleet is chauffeur-driven — we do not offer self-drive or
                unchauffeured rentals. All vehicles carry valid insurance and all drivers are
                background-checked and licence-verified before joining the fleet.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Website use</h2>
              <p className="leading-relaxed">
                Vehicle photos, pricing, and destination details on this site are kept as accurate
                and current as possible, but exact vehicle availability is confirmed at the time
                of booking. Some vehicle listings use a representative photo of the same model
                pending real photography of that specific unit.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Contact</h2>
              <p className="leading-relaxed">
                Questions about these terms? Reach us at{" "}
                <a href={`mailto:${site.email}`} className="underline hover:text-terracotta-700">
                  {site.email}
                </a>{" "}
                or {site.phone}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
