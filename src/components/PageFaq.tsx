import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { jsonLdScriptProps } from "@/lib/seo";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Page-specific FAQ block (locality/service/master-vehicle pages) — distinct
 * from FAQSection, which renders the sitewide FAQ list from the DB. Emits
 * its own FAQPage JSON-LD scoped to just this page's questions. */
export default function PageFaq({ title = "Frequently asked questions", faqs }: { title?: string; faqs: FaqItem[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="bg-ivory-50 py-20 sm:py-28">
      <Container className="flex flex-col items-center">
        <SectionHeading align="center" eyebrow="FAQ" title={title} />
        <div className="mt-12 flex w-full max-w-3xl flex-col divide-y divide-forest-950/8">
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
                <p className="mt-3 max-w-2xl text-forest-900/65 leading-relaxed">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(faqJsonLd)} />
    </section>
  );
}
