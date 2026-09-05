import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageFaq, { type FaqItem } from "@/components/PageFaq";
import PageCta from "@/components/PageCta";
import Container from "@/components/ui/Container";
import { absoluteUrl, jsonLdScriptProps, type BreadcrumbItem } from "@/lib/seo";
import type { Service } from "@/lib/services";

/** Shared layout for the dedicated service landing pages (outstation,
 * corporate, wedding, pilgrimage, group travel) — pulls real feature/pricing
 * data from the matching `services` DB row so on-page facts never drift
 * from what /services already states, while giving each intent its own
 * full page instead of a shared-page anchor. */
export default function ServiceDetailPage({
  service,
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  path,
  intro,
  faqs,
  whatsappMessage,
  relatedLinks,
}: {
  service: Service;
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  path: string;
  intro: React.ReactNode;
  faqs: FaqItem[];
  whatsappMessage: string;
  relatedLinks?: React.ReactNode;
}) {
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: breadcrumbLabel }];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: { "@type": "City", name: "Bengaluru" },
    url: absoluteUrl(path),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(serviceJsonLd)} />
      <PageHeader eyebrow={eyebrow} title={title} description={description} breadcrumbs={breadcrumbs} />

      <section className="bg-ivory pb-16 pt-10 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="flex flex-col gap-6 text-forest-900/80">{intro}</div>

            <aside className="flex flex-col gap-5 rounded-2xl border border-forest-950/8 bg-ivory-50 p-6 h-fit">
              <h3 className="font-serif-luxury text-lg text-forest-950">What&apos;s Included</h3>
              <ul className="flex flex-col gap-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-forest-900/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-600" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="border-t border-forest-950/8 pt-4 text-sm font-medium text-forest-950">
                {service.pricingNote}
              </p>
              {relatedLinks}
            </aside>
          </div>
        </Container>
      </section>

      <PageFaq title={`FAQ — ${title}`} faqs={faqs} />
      <PageCta heading={`Book ${service.title}`} whatsappMessage={whatsappMessage} />
    </>
  );
}
