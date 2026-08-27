import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Briefcase, Snowflake, Fuel, UserCheck, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { vehicleImageAlt } from "@/lib/fleet";
import { getFleetSlugs, getVehicleBySlug } from "@/lib/fleet-data";
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
