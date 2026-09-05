import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { site, telHref, whatsappHref } from "@/lib/site";

/** Shared Call / WhatsApp / Request-a-Quote block for every service, master
 * vehicle, and locality page — every commercial page needs the same three
 * conversion paths. */
export default function PageCta({
  heading = "Ready to book?",
  whatsappMessage,
}: {
  heading?: string;
  whatsappMessage: string;
}) {
  return (
    <section className="bg-forest-950 py-20 text-ivory sm:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="font-serif-luxury text-3xl text-balance sm:text-4xl">{heading}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-md text-balance text-ivory/70">
            Call, message us on WhatsApp, or request a quote — we usually confirm within the hour.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={telHref} variant="outlined" size="lg" icon={<Phone className="h-4 w-4" />}>
              Call {site.phone}
            </Button>
            <Button
              href={whatsappHref(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              WhatsApp Us
            </Button>
            <Button href="/booking" variant="shine" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
