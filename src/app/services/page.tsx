import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import ServicesHero from "@/components/services/ServicesHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import FAQSection from "@/components/FAQSection";
import { getServices } from "@/lib/services-data";
import { ICON_REGISTRY } from "@/lib/icon-registry";
import { site, whatsappHref } from "@/lib/site";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Airport transfers, outstation trips, corporate travel, weddings, pilgrimage tours and hourly local rentals — explore all Renuka Tours & Travels services.",
  path: "/services",
  keywords: [
    "airport transfer Bengaluru",
    "outstation cab booking Bengaluru",
    "corporate travel Bengaluru",
    "wedding car rental Bengaluru",
    "pilgrimage tour Bengaluru",
    "Bengaluru airport pickup drop service",
    "flight tracked airport taxi Bengaluru",
    "corporate cab service monthly billing Bengaluru",
    "wedding car decoration rental Bengaluru",
    "group pilgrimage tour cab Bengaluru",
    "hourly local car rental Bengaluru",
    "corporate cab service Whitefield",
    "wedding car rental Indiranagar",
    "airport transfer from Electronic City",
    "outstation cab Hosur road",
    "tempo traveller for airport pickup",
    "local sightseeing tempo traveller",
    "premium outstation cab booking",
  ],
});

// Maps a DB service id to its dedicated standalone page, where one exists —
// used to cross-link from this shared page's anchor sections.
const SERVICE_DETAIL_PAGES: Record<string, string> = {
  outstation: "/outstation-car-rental-bangalore",
  corporate: "/corporate-travel",
  wedding: "/wedding-transport",
  pilgrimage: "/pilgrimage-travel",
};

export default async function ServicesPage() {
  const services = await getServices();

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "Service",
      position: i + 1,
      name: service.title,
      description: service.description,
      provider: { "@type": "TravelAgency", name: site.name },
      url: absoluteUrl(`/services#${service.id}`),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(servicesJsonLd)} />
      <ServicesHero count={services.length} />
      <section className="bg-ivory pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Container>
          <div className="flex flex-col gap-10">
            {services.map((service, i) => {
              const ServiceIcon = ICON_REGISTRY[service.icon];
              return (
              <div key={service.id} id={service.id} className="scroll-mt-28">
                <Reveal delay={i % 2 === 0 ? 0 : 40}>
                  <div className="grid overflow-hidden rounded-3xl border border-forest-950/8 bg-ivory-50 shadow-luxury lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative flex min-h-[420px] flex-col justify-end gap-4 p-8">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/92 via-forest-950/45 to-forest-950/10" />

                      <div className="relative flex flex-col gap-4">
                        {ServiceIcon && <ServiceIcon className="h-9 w-9 text-terracotta-300" strokeWidth={1.5} />}
                        <h2 className="font-serif-luxury text-3xl text-ivory">{service.title}</h2>
                        <p className="text-ivory/75">{service.description}</p>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Button
                            href={`/booking?service=${service.id}`}
                            variant="shine"
                            icon={<ArrowRight className="h-4 w-4" />}
                          >
                            Book This Service
                          </Button>
                          <Button
                            href={whatsappHref(`Hi, I'd like to enquire about ${service.title}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="whatsapp"
                            icon={<MessageCircle className="h-4 w-4" />}
                          >
                            Ask on WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-8 lg:p-10">
                      <ul className="flex flex-col gap-3">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-base text-forest-900/75">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-600" strokeWidth={2} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 border-t border-forest-950/8 pt-5 text-sm font-medium text-forest-950">
                        {service.pricingNote}
                      </p>
                      {SERVICE_DETAIL_PAGES[service.id] && (
                        <Link
                          href={SERVICE_DETAIL_PAGES[service.id]}
                          className="mt-3 text-sm font-medium text-terracotta-600 hover:underline"
                        >
                          Full details on {service.title} →
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>
              );
            })}
          </div>
        </Container>
      </section>
      <FAQSection includeJsonLd={false} />
    </>
  );
}
