import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Instrument_Serif, Inter } from "next/font/google";
import PageFontScope from "@/components/PageFontScope";
import ContactHero from "@/components/contact/ContactHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ContactForm";
import { site, telHref, whatsappHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Renuka Tours & Travels for bookings and enquiries — phone, WhatsApp, email or our quick contact form. Available 24×7.",
  path: "/contact",
  keywords: [
    "contact Renuka Tours & Travels",
    "car rental enquiry Bengaluru",
    "book a cab Bengaluru",
  ],
});

const details = [
  { icon: Phone, label: "Phone", value: site.phone, href: telHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappHref() },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: MapPin,
    label: "Office",
    value: `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.pin}`,
  },
  { icon: Clock, label: "Hours", value: site.hours },
];

// Font pairing 6/6: Instrument Serif + Inter — contemporary, distinctive
const heading = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"] });

export default function ContactPage() {
  return (
    <PageFontScope heading={heading.style.fontFamily} body={body.style.fontFamily}>
      <ContactHero />

      <section className="bg-ivory pb-24 pt-10 sm:pb-32 sm:pt-14">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="sr-only">Contact Details &amp; Enquiry Form</h2>
          <Reveal>
            <div className="flex flex-col gap-6">
              {details.map((d) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-2xl border border-forest-950/8 bg-ivory-50 p-5">
                    <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" strokeWidth={1.75} />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-forest-900/70">
                        {d.label}
                      </p>
                      <p className="text-sm font-medium text-forest-950">{d.value}</p>
                    </div>
                  </div>
                );
                return d.href ? (
                  <a
                    key={d.label}
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-transform hover:-translate-y-0.5"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={d.label}>{content}</div>
                );
              })}

              <div className="h-52 overflow-hidden rounded-2xl border border-forest-950/8">
                <iframe
                  title="Office location map"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.pin}`
                  )}&output=embed`}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </PageFontScope>
  );
}
