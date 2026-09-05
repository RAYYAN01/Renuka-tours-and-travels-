import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Plane, Route, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageFaq from "@/components/PageFaq";
import PageCta from "@/components/PageCta";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { localities, nearbyLocalities, getLocalityBySlug } from "@/lib/locations";
import { site } from "@/lib/site";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localities.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);
  if (!locality) return {};
  return pageMetadata({
    title: `Tempo Traveller & Car Rental in ${locality.name}, Bengaluru`,
    description: `Chauffeur-driven cars, SUVs, tempo travellers and coaches serving ${locality.name} and nearby ${locality.zone} Bengaluru — outstation trips, airport transfers, weddings and pilgrimage tours.`,
    path: `/locations/${locality.slug}`,
    keywords: [
      `tempo traveller ${locality.name}`,
      `tempo traveller rental ${locality.name}`,
      `tempo traveller hire ${locality.name}`,
      `travel agency in ${locality.name}`,
      `car rental in ${locality.name}`,
      `9 seater tempo traveller in ${locality.name}`,
      `12 seater tempo traveller in ${locality.name}`,
      `17 seater tempo traveller in ${locality.name}`,
      `Force Urbania in ${locality.name}`,
      `bus rental in ${locality.name}`,
    ],
  });
}

export default async function LocalityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);
  if (!locality) notFound();
  const nearby = nearbyLocalities(locality);

  const faqs = [
    {
      question: `Do you provide tempo traveller rental in ${locality.name}?`,
      answer: `Yes — ${site.name} serves ${locality.name} and the wider ${locality.zone} Bengaluru area with 9, 12 and 17 seater tempo travellers, Force Urbania, cars, SUVs and buses, all chauffeur-driven.`,
    },
    {
      question: `Can I book a vehicle for airport transfer from ${locality.name}?`,
      answer: `Yes, airport pickup and drop from ${locality.name} to Kempegowda International Airport is available with live flight tracking and free waiting time for delays.`,
    },
    {
      question: `Is outstation travel available from ${locality.name}?`,
      answer: `Yes — outstation trips are billed per kilometre with tolls, driver allowance and any permit charges shown upfront before you confirm.`,
    },
    {
      question: `Which vehicle should I choose for a group trip from ${locality.name}?`,
      answer: `It depends on group size: a sedan or SUV suits up to 7 people, a 9 or 12 seater tempo traveller suits mid-size groups, and a 17 seater tempo traveller, Force Urbania or mini bus suits larger family, corporate or pilgrimage groups.`,
    },
    {
      question: `Do you serve areas near ${locality.name} as well?`,
      answer:
        nearby.length > 0
          ? `Yes, coverage extends to neighbouring areas including ${nearby.map((n) => n.name).join(", ")}.`
          : `Yes, coverage extends across Bengaluru and nearby outstation routes.`,
    },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Chauffeur-driven vehicle rental",
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: { "@type": "Place", name: `${locality.name}, Bengaluru` },
    url: absoluteUrl(`/locations/${locality.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(serviceJsonLd)} />
      <PageHeader
        eyebrow={`${locality.zone} Bengaluru`}
        title={`Tempo Traveller & Car Rental in ${locality.name}, Bengaluru`}
        description={`Chauffeur-driven cars, SUVs, tempo travellers, Force Urbania and buses serving ${locality.name} — for outstation trips, airport transfers, weddings, corporate travel and pilgrimage tours.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: locality.name },
        ]}
      />

      <section className="bg-ivory pb-16 pt-10 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="flex flex-col gap-6 text-forest-900/80">
              <p className="leading-relaxed">
                {site.name} provides chauffeur-driven vehicle rental for residents and businesses in{" "}
                {locality.name}, part of {locality.zone} Bengaluru. Whether it&apos;s a same-day
                airport run, a multi-day outstation trip, or transport for a wedding or corporate
                event, the full fleet is available with pickup and drop arranged at your home,
                office, apartment gate or a convenient nearby landmark in {locality.name}.
              </p>

              <div className="flex flex-col gap-3">
                <h2 className="font-serif-luxury text-2xl text-forest-950">
                  Tempo Traveller Options in {locality.name}
                </h2>
                <p className="leading-relaxed">
                  A <Link href="/fleet/tempo-traveller-9-seater" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">9 seater tempo traveller</Link> suits
                  small family or friend groups, a{" "}
                  <Link href="/fleet/force-traveller-yaksha" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">12 seater luxury tempo traveller</Link>{" "}
                  works well for executive or mid-size group travel, and a{" "}
                  <Link href="/fleet/force-traveller-b" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">17 seater tempo traveller</Link>{" "}
                  or the <Link href="/fleet/force-urbania" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">Force Urbania</Link> suits larger
                  family, corporate or pilgrimage groups travelling from {locality.name}.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-serif-luxury text-2xl text-forest-950">Cars, SUVs &amp; Buses</h2>
                <p className="leading-relaxed">
                  For smaller groups, sedans and SUVs — including the Innova, Innova Crysta and
                  Fortuner — are available with a driver. For larger groups, 21, 25 and 50 seater
                  buses cover corporate offsites, weddings and pilgrimage tours from {locality.name}.
                  See the <Link href="/fleet" className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">full fleet</Link>.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard icon={Plane} title="Airport Transfers" body={`Pickup and drop between ${locality.name} and Kempegowda International Airport, with flight tracking.`} />
                <InfoCard icon={Route} title="Outstation Travel" body="Per-kilometre billing with tolls, driver allowance and permits shown upfront." />
                <InfoCard icon={Users} title="Weddings, Corporate & Pilgrimage" body="Multi-vehicle coordination, corporate billing, and group pilgrimage circuits." />
                <InfoCard icon={MapPin} title={`Landmarks near ${locality.name}`} body={locality.landmarks.join(" · ")} />
              </div>
            </div>

            <aside className="flex flex-col gap-4 rounded-2xl border border-forest-950/8 bg-ivory-50 p-6 h-fit">
              <h3 className="font-serif-luxury text-lg text-forest-950">Areas Nearby</h3>
              {nearby.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {nearby.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/locations/${n.slug}`}
                      className="rounded-full border border-forest-950/12 px-3 py-1.5 text-sm font-medium text-forest-900/75 transition-colors hover:border-terracotta-500 hover:text-terracotta-600"
                    >
                      {n.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-forest-900/65">See all service areas on the locations page.</p>
              )}
              <Link href="/locations" className="text-sm font-medium text-terracotta-600 hover:underline">
                View all locations →
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <PageFaq title={`FAQ — Vehicle Rental in ${locality.name}`} faqs={faqs} />
      <PageCta whatsappMessage={`Hi, I'd like to enquire about a vehicle for pickup in ${locality.name}.`} />
    </>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: typeof MapPin; title: string; body: string }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-2 rounded-2xl border border-forest-950/8 bg-ivory-50 p-5">
        <Icon className="h-5 w-5 text-terracotta-600" strokeWidth={1.5} />
        <h3 className="font-serif-luxury text-base text-forest-950">{title}</h3>
        <p className="text-sm leading-relaxed text-forest-900/70">{body}</p>
      </div>
    </Reveal>
  );
}
