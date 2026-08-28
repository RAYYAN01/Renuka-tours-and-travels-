import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { fleetCategories } from "@/lib/fleet";
import { getServices } from "@/lib/services-data";
import { site, telHref } from "@/lib/site";

const featuredServiceIds = ["airport", "outstation", "corporate", "wedding", "pilgrimage"];

export default async function Footer() {
  const services = await getServices();

  const columns = [
    {
      title: "Fleet",
      links: fleetCategories.map((c) => ({
        label: c.label,
        href: `/fleet?category=${c.id}`,
      })),
    },
    {
      title: "Services",
      links: featuredServiceIds
        .map((id) => services.find((s) => s.id === id))
        .filter((s): s is (typeof services)[number] => Boolean(s))
        .map((s) => ({ label: s.title, href: `/services#${s.id}` })),
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Destinations", href: "/destinations" },
        { label: "Blog", href: "/blog" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[var(--md-surface-container)] text-forest-900">
      <div className="md-divider-strong absolute inset-x-0 top-0 h-px" />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="font-serif-luxury text-3xl text-forest-950">
              Renuka
              <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-700">
                Tours &amp; Travels
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-forest-900/65">
              {site.description}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href={telHref} className="flex items-center gap-3 hover:text-terracotta-700">
                <Phone className="h-4 w-4 text-terracotta-700" strokeWidth={1.75} />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 hover:text-terracotta-700"
              >
                <Mail className="h-4 w-4 text-terracotta-700" strokeWidth={1.75} />
                {site.email}
              </a>
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-700" strokeWidth={1.75} />
                {site.address.line1}, {site.address.city}, {site.address.state}{" "}
                {site.address.pin}
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-950/70">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-forest-900/70 transition-colors hover:text-terracotta-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-forest-950/10 pt-6 text-xs text-forest-900/70 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-terracotta-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-terracotta-700">
              Terms of Service
            </Link>
            <p>Licensed &amp; Insured · {site.hours}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}