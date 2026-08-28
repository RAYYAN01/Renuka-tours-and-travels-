import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Briefcase, Snowflake, Fuel, UserCheck, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { sortFleetByName, vehicleImageAlt } from "@/lib/fleet";
import { getFleet, getFleetSlugs, getVehicleBySlug } from "@/lib/fleet-data";
import PricingDetails from "@/components/fleet/PricingDetails";
import { getDestinations } from "@/lib/destinations-data";
import { recommendedVehicleCategories } from "@/lib/destinations";
import { whatsappHref } from "@/lib/site";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getFleetSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};

  // A few Ads-driven search themes are specific to a named model rather
  // than following the generic per-vehicle pattern below (e.g. the market
  // commonly searches "Force Urbania" by name, independent of trim/seats).
  const extraKeywordsBySlug: Record<string, string[]> = {
    "force-urbania": [
      "Force Urbania in Bengaluru",
      "force urbania rental near me",
      "17 seater force urbania price",
    ],
    "force-urbania-12-seater-maharaja": [
      "luxury 12 seater urbania van",
      "force urbania rental near me",
    ],
    "toyota-innova-2011": [
      "innova cab for Bengaluru airport",
      "7 seater innova on rent",
    ],
    "toyota-innova-crysta": [
      "innova cab for Bengaluru airport",
      "7 seater innova on rent",
    ],
    "toyota-innova-hycross": [
      "innova cab for Bengaluru airport",
      "7 seater innova on rent",
    ],
    "bus-21-seater": [
      "mini bus on rental",
      "mini bus in Bengaluru",
      "21 seater mini bus in Bengaluru",
    ],
    "mini-bus-25-seater": [
      "mini bus on rental",
      "mini bus in Bengaluru",
      "25 seater luxury mini bus in Bengaluru",
    ],
    "bus-50-seater": [
      "50 seater luxury bus in Bengaluru",
    ],
  };

  return pageMetadata({
    title: vehicle.name,
    description: vehicle.priceOnRequest
      ? `${vehicle.tagline} — ${vehicle.seats} seats. Price on request — contact us for a custom quote.`
      : `${vehicle.tagline} — ${vehicle.seats} seats, starting from ₹${vehicle.priceFrom} ${vehicle.priceUnit}.`,
    path: `/fleet/${vehicle.slug}`,
    keywords: [
      `${vehicle.name} rental Bengaluru`,
      `${vehicle.name} hire Bengaluru`,
      `${vehicle.categoryLabel} rental Bengaluru`,
      `${vehicle.name} with driver Bengaluru`,
      `${vehicle.name} price per km Bengaluru`,
      `${vehicle.name} for outstation trip`,
      `book ${vehicle.name} online Bengaluru`,
      `${vehicle.seats} seater ${vehicle.categoryLabel.toLowerCase()} rental Bengaluru`,
      `${vehicle.name} in Bengaluru`,
      `${vehicle.name} rental near me`,
      `outstation ${vehicle.name} hire Bengaluru`,
      `${vehicle.name} for family weekend trip`,
      ...(extraKeywordsBySlug[vehicle.slug] ?? []),
    ],
  });
}

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: vehicle.name,
    vehicleSeatingCapacity: vehicle.seats,
    fuelType: vehicle.fuel,
    image: absoluteUrl(vehicle.image),
    url: absoluteUrl(`/fleet/${vehicle.slug}`),
    // Price-on-request vehicles have no confirmed rate — omit `offers`
    // entirely rather than emit a fake or zero price.
    ...(vehicle.priceOnRequest
      ? {}
      : {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: vehicle.priceFrom,
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: vehicle.priceFrom,
              priceCurrency: "INR",
              unitText: vehicle.priceUnit,
            },
          },
        }),
  };

  const specs = [
    { icon: Users, label: "Seating", value: `${vehicle.seats} seats` },
    { icon: Briefcase, label: "Luggage", value: vehicle.luggage },
    { icon: Snowflake, label: "Climate", value: vehicle.ac ? "Air Conditioned" : "Non-AC" },
    { icon: Fuel, label: "Fuel", value: vehicle.fuel },
    {
      icon: UserCheck,
      label: "Driver",
      value: vehicle.driverIncluded ? "Included" : "Self Drive",
    },
  ];

  const destinations = await getDestinations();
  const suitedDestinations = destinations.filter((d) =>
    recommendedVehicleCategories(d.recommendedVehicle).some((v) => v.category === vehicle.category)
  );

  // Same-category cross-links (e.g. the 12 Seater Maharaja and 16 Seater
  // Force Urbania linking to each other) — keeps internal link equity
  // flowing between closely related vehicles instead of dead-ending on
  // each detail page.
  const allFleet = await getFleet();
  const relatedVehicles = sortFleetByName(
    allFleet.filter((v) => v.category === vehicle.category && v.slug !== vehicle.slug)
  );

  return (
    <section className="bg-ivory pb-24 pt-32 sm:pt-40">
      <Container>
        <Breadcrumbs
          tone="dark"
          items={[
            { label: "Home", href: "/" },
            { label: "Fleet", href: "/fleet" },
            { label: vehicle.name },
          ]}
        />
      </Container>
      <Container className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-luxury">
              <Image
                src={vehicle.heroImage ?? vehicle.image}
                alt={vehicleImageAlt(vehicle, vehicle.heroImage ?? vehicle.image)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          {vehicle.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {vehicle.gallery.slice(1, 6).map((img) => (
                <div
                  key={img}
                  className="relative aspect-square overflow-hidden rounded-xl border border-forest-950/8"
                >
                  <Image src={img} alt={vehicleImageAlt(vehicle, img)} fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-terracotta-600">
              {vehicle.categoryLabel}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif-luxury text-4xl text-forest-950 sm:text-5xl">
              {vehicle.name}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-lg text-forest-900/70">{vehicle.tagline}</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-forest-950/8 bg-ivory-50 p-6 sm:grid-cols-3">
              {specs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-1.5">
                  <spec.icon className="h-5 w-5 text-terracotta-600" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-wide text-forest-900/70">
                    {spec.label}
                  </span>
                  <span className="text-sm font-medium text-forest-950">{spec.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <PricingDetails vehicle={vehicle} />
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap gap-4">
              {vehicle.priceOnRequest ? (
                <>
                  <Button
                    href={whatsappHref(`Hi, I'd like a quote for the ${vehicle.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Get Quote on WhatsApp
                  </Button>
                  <Button href={`/booking?vehicle=${vehicle.slug}`} variant="outlined" size="lg">
                    Request a Quote
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    href={`/booking?vehicle=${vehicle.slug}`}
                    variant="shine"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Book This Vehicle
                  </Button>
                  <Button
                    href={whatsappHref(`Hi, I'd like to enquire about the ${vehicle.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    size="lg"
                  >
                    Ask on WhatsApp
                  </Button>
                </>
              )}
            </div>
          </Reveal>

          {suitedDestinations.length > 0 && (
            <Reveal delay={340}>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-900/70">
                  Well suited for
                </span>
                <div className="flex flex-wrap gap-2">
                  {suitedDestinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      className="rounded-full border border-forest-950/12 px-3 py-1.5 text-sm font-medium text-forest-900/75 transition-colors hover:border-terracotta-500 hover:text-terracotta-600"
                    >
                      {d.name} trips
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {relatedVehicles.length > 0 && (
            <Reveal delay={350}>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-900/70">
                  Also in {vehicle.categoryLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {relatedVehicles.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/fleet/${v.slug}`}
                      className="rounded-full border border-forest-950/12 px-3 py-1.5 text-sm font-medium text-forest-900/75 transition-colors hover:border-terracotta-500 hover:text-terracotta-600"
                    >
                      {v.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={360}>
            <Link
              href="/fleet"
              className="text-sm font-medium text-forest-900/75 underline-offset-4 hover:text-terracotta-600 hover:underline"
            >
              ← Back to full fleet
            </Link>
          </Reveal>
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(vehicleJsonLd)} />
    </section>
  );
}
