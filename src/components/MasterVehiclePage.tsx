import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageFaq, { type FaqItem } from "@/components/PageFaq";
import PageCta from "@/components/PageCta";
import Container from "@/components/ui/Container";
import VehicleCard from "@/components/fleet/VehicleCard";
import { sortFleetByName, type FleetCategory, type FleetVehicle } from "@/lib/fleet";
import { localities } from "@/lib/locations";
import { absoluteUrl, jsonLdScriptProps, type BreadcrumbItem } from "@/lib/seo";

/** Shared layout for the three Bengaluru-wide "master" vehicle pages
 * (tempo traveller, bus, car rental) — same shape (hero, filtered vehicle
 * grid, body content, FAQ, CTA, locality links), different category filter
 * and copy per page. */
export default function MasterVehiclePage({
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  categories,
  fleet,
  intro,
  faqs,
  whatsappMessage,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  categories: FleetCategory[];
  fleet: FleetVehicle[];
  intro: React.ReactNode;
  faqs: FaqItem[];
  whatsappMessage: string;
}) {
  const vehicles = sortFleetByName(fleet.filter((v) => categories.includes(v.category)));
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: breadcrumbLabel }];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/fleet/${v.slug}`),
      name: v.name,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(itemListJsonLd)} />
      <PageHeader eyebrow={eyebrow} title={title} description={description} breadcrumbs={breadcrumbs} />

      <section className="bg-ivory pb-16 pt-10 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-forest-900/80">{intro}</div>
        </Container>
      </section>

      {vehicles.length > 0 && (
        <section className="bg-ivory pb-16 sm:pb-20">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-ivory-50 pb-16 pt-10 sm:pb-20">
        <Container>
          <div className="flex flex-col gap-4">
            <h2 className="font-serif-luxury text-2xl text-forest-950">Available Across Bengaluru</h2>
            <p className="max-w-2xl leading-relaxed text-forest-900/75">
              Pickup and drop can be arranged anywhere in the city — from{" "}
              {localities.slice(0, 6).map((l, i) => (
                <span key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="underline decoration-terracotta-400 underline-offset-4 hover:text-terracotta-600">
                    {l.name}
                  </Link>
                  {i < 5 ? ", " : " "}
                </span>
              ))}
              and beyond.{" "}
              <Link href="/locations" className="font-medium text-terracotta-600 hover:underline">
                See all service areas →
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <PageFaq faqs={faqs} />
      <PageCta whatsappMessage={whatsappMessage} />
    </>
  );
}
