import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Wallet, Car, ArrowRight, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { recommendedVehicleCategories, OFFICIAL_TOURISM_LINKS } from "@/lib/destinations";
import { getDestinationSlugs, getDestinationBySlug } from "@/lib/destinations-data";
import { absoluteUrl, jsonLdScriptProps, pageMetadata, parseLowerBoundPrice } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  return pageMetadata({
    title: destination.name,
    description: destination.description,
    path: `/destinations/${destination.slug}`,
    keywords: [
      `Bengaluru to ${destination.name} taxi`,
      `Bengaluru to ${destination.name} cab`,
      `${destination.name} trip from Bengaluru`,
      `${destination.name} tour package`,
      `Bengaluru to ${destination.name} distance by road`,
      `Bengaluru to ${destination.name} one way cab fare`,
      `${destination.name} cab price from Bengaluru`,
      `best vehicle for ${destination.name} trip`,
      `Bengaluru to ${destination.name} outstation cab booking`,
    ],
  });
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${destination.name} trip from Bengaluru`,
    description: destination.description,
    touristType: destination.kind,
    url: absoluteUrl(`/destinations/${destination.slug}`),
    image: absoluteUrl(destination.image),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: parseLowerBoundPrice(destination.estimatedCost),
    },
  };

  const facts = [
    { icon: MapPin, label: "Distance", value: destination.distance },
    { icon: Clock, label: "Duration", value: destination.duration },
    { icon: Wallet, label: "Estimated Cost", value: destination.estimatedCost },
  ];

  const recommendedVehicles = recommendedVehicleCategories(destination.recommendedVehicle);

  return (
    <section className="relative overflow-hidden pb-24 pt-36 text-ivory sm:pt-44">
      <Image
        src={destination.image}
        alt={`${destination.name}, ${destination.kind}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/30" />
      <Container className="relative flex flex-col gap-8">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Destinations", href: "/destinations" },
              { label: destination.name },
            ]}
          />
        </Reveal>
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ivory/70">
            {destination.kind}
          </span>
        </Reveal>
        <SplitReveal
          as="h1"
          delay={100}
          className="font-serif-luxury text-balance text-5xl sm:text-6xl"
        >
          {destination.name}
        </SplitReveal>
        <Reveal delay={220}>
          <p className="max-w-xl text-balance text-lg text-ivory/75">
            {destination.description}
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-ivory/10 p-6 backdrop-blur-sm sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <fact.icon className="h-5 w-5 text-ivory/80" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-wide text-ivory/55">
                  {fact.label}
                </span>
                <span className="text-sm font-medium">{fact.value}</span>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <Car className="h-5 w-5 text-ivory/80" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-wide text-ivory/55">
                Recommended Vehicle
              </span>
              <span className="flex flex-wrap gap-x-1.5 text-sm font-medium">
                {recommendedVehicles.map((v, i) => (
                  <span key={v.category}>
                    <Link
                      href={`/fleet?category=${v.category}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {v.label}
                    </Link>
                    {i < recommendedVehicles.length - 1 && " or"}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="flex flex-wrap gap-4">
            <Button
              href={`/booking?destination=${encodeURIComponent(destination.name)}`}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Plan This Trip
            </Button>
            <Button href="/destinations" variant="outlined" size="lg" className="!border-ivory/30 !text-ivory hover:!border-ivory">
              All Destinations
            </Button>
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/destinations" className="text-sm text-ivory/60 hover:text-ivory">
              ← Back to destinations
            </Link>
            <a
              href={OFFICIAL_TOURISM_LINKS[destination.officialTourismBoard].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-ivory/60 hover:text-ivory"
            >
              {OFFICIAL_TOURISM_LINKS[destination.officialTourismBoard].label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(tripJsonLd)} />
    </section>
  );
}
