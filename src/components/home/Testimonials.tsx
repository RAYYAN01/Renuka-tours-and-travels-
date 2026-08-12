import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";

const testimonials = [
  {
    quote:
      "Booked a Force Urbania for our family wedding — the driver arrived early, the van was spotless, and the whole three-day trip felt effortless.",
    name: "Ananya Rao",
    context: "Wedding Transport · Bengaluru to Coorg",
  },
  {
    quote:
      "Our office uses them for every airport run now. Punctual, professional, and the billing is exactly what was quoted — no last-minute surprises.",
    name: "Vikram Shetty",
    context: "Corporate Travel · Monthly Retainer",
  },
  {
    quote:
      "Took the Innova Crysta for a Tirupati pilgrimage with my parents. The driver was patient, courteous, and genuinely made the trip comfortable.",
    name: "Lakshmi Iyer",
    context: "Pilgrimage Tour · Bengaluru to Tirupati",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ivory-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Word of Mouth"
          align="center"
          title="What do our travellers say about us?"
          description="Real feedback from families, corporates and travel groups who've ridden with us."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={70 * i}>
              <Tilt max={4}>
                <figure className="surface-raised flex h-full flex-col gap-5 rounded-2xl p-8">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-terracotta-500 text-terracotta-500"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <blockquote className="font-serif-luxury text-lg leading-snug text-forest-950">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto text-sm">
                    <p className="font-semibold text-forest-950">{t.name}</p>
                    <p className="text-forest-900/75">{t.context}</p>
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
