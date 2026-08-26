import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getFaqs } from "@/lib/faq-data";
import { jsonLdScriptProps } from "@/lib/seo";

export default async function FAQSection({ includeJsonLd = true }: { includeJsonLd?: boolean }) {
  const faqs = await getFaqs();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-ivory-50 py-24 sm:py-32">
      <Container className="flex flex-col items-center">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Common questions, answered"
          description="Everything travellers usually ask before booking — if yours isn't here, reach out and we'll answer directly."
        />

        <div className="mt-14 flex w-full max-w-3xl flex-col divide-y divide-forest-950/8">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={40 * (i % 4)}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif-luxury text-lg text-forest-950 marker:content-none">
                  {faq.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-forest-900/40 transition-transform duration-300 group-open:rotate-180"
                    strokeWidth={1.75}
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-forest-900/65 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>

      {includeJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(faqJsonLd)} />
      )}
    </section>
  );
}
