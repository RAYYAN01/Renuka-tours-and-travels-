import type { Metadata } from "next";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import PageFontScope from "@/components/PageFontScope";
import ServicesHero from "@/components/services/ServicesHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import FAQSection from "@/components/FAQSection";
import { services } from "@/lib/services";
import { site, whatsappHref } from "@/lib/site";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Airport transfers, outstation trips, corporate travel, weddings, pilgrimage tours and self-drive rentals — explore all Renuka Tours & Travels services.",
  path: "/services",
  keywords: [
    "airport transfer Bengaluru",
    "outstation cab booking Bengaluru",
    "corporate travel Bengaluru",
    "wedding car rental Bengaluru",
    "pilgrimage tour Bengaluru",
    "self drive car rental Bengaluru",
    "Bengaluru airport pickup drop service",
    "flight tracked airport taxi Bengaluru",
    "corporate cab service monthly billing Bengaluru",
    "wedding car decoration rental Bengaluru",
    "school van rental Bengaluru",
    "college trip bus rental Bengaluru",
    "group pilgrimage tour cab Bengaluru",
    "hourly local car rental Bengaluru",
    "self drive car rental with security deposit",
  ],
});

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

// Font pairing 4/6: DM Serif Display + DM Sans — modern matched family, crisp
const heading = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function ServicesPage() {
  return (
    <PageFontScope heading={heading.style.fontFamily} body={body.style.fontFamily}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(servicesJsonLd)} />
      <ServicesHero />
      <section className="flex flex-col divide-y divide-forest-950/8 bg-ivory pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Container>
          <div className="flex flex-col divide-y divide-forest-950/8">
            {services.map((service, i) => (
              <div key={service.id} id={service.id} className="scroll-mt-28 py-12 first:pt-0">
                <Reveal delay={i % 2 === 0 ? 0 : 40}>
                  <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div className="flex flex-col gap-4">
                      <service.icon className="h-9 w-9 text-terracotta-600" strokeWidth={1.5} />
                      <h2 className="font-serif-luxury text-3xl text-forest-950">
                        {service.title}
                      </h2>
                      <p className="text-forest-900/65">{service.description}</p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button
                          href={`/booking?service=${service.id}`}
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

                    <div className="rounded-2xl border border-forest-950/8 bg-ivory-50 p-7">
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
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FAQSection includeJsonLd={false} />
    </PageFontScope>
  );
}
