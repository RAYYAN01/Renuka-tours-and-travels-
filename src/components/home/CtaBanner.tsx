import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-ivory sm:py-28">
      <div className="absolute inset-0">
        <Image
          src="/fleet/force-traveller-yaksha-front-04.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 saturate-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/60" />
      </div>

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-300">
            Ready When You Are
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif-luxury text-balance max-w-2xl text-4xl leading-tight sm:text-5xl">
            Your next journey is one message away
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="max-w-lg text-balance text-ivory/65">
            Tell us your route and headcount — we&apos;ll match you with the
            right vehicle and a fair, upfront price in minutes.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/booking" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Book Your Ride
            </Button>
            <Button
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
