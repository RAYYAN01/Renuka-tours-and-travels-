import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, FileCheck, Stethoscope, BadgeCheck } from "lucide-react";
import { Libre_Caslon_Display, Public_Sans } from "next/font/google";
import PageFontScope from "@/components/PageFontScope";
import AboutHero from "@/components/about/AboutHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import StatBlock from "@/components/StatBlock";
import { site } from "@/lib/site";
import { coreStats } from "@/lib/stats";
import { timeline } from "@/lib/timeline";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

const aboutDescription = `Renuka Tours & Travels has been moving families, corporates and pilgrims across South India since ${site.founded} — verified drivers, insured fleet, honest pricing.`;

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: aboutDescription,
  path: "/about",
  keywords: [
    "about Renuka Tours & Travels",
    "car rental company Bengaluru",
    "trusted travel agency Bengaluru",
    "verified drivers Bengaluru",
    "car rental company since 2011 Bengaluru",
    "licensed travel agency Bengaluru",
    "insured car rental fleet Bengaluru",
    "background verified drivers Bengaluru",
    "reliable outstation taxi operator Bengaluru",
    "CV Raman Nagar travel agency",
  ],
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${site.name}`,
  description: aboutDescription,
  url: absoluteUrl("/about"),
  mainEntity: { "@id": `${absoluteUrl("/")}#organization` },
};

const stats = [...coreStats, { value: 60, suffix: "+", label: "Verified Drivers" }];

const safety = [
  { icon: ShieldCheck, title: "Driver Verification", text: "Background checks, licence validation and in-person interviews for every driver." },
  { icon: FileCheck, title: "Licensed Operator", text: "Fully licensed under state transport regulations, with permits renewed annually." },
  { icon: Stethoscope, title: "Sanitised Fleet", text: "Every vehicle is deep-cleaned and inspected before it goes out on a trip." },
  { icon: BadgeCheck, title: "Comprehensive Insurance", text: "All vehicles carry valid insurance covering passengers and third parties." },
];

// Font pairing 5/6: Libre Caslon Display + Public Sans — timeless heritage travel
const heading = Libre_Caslon_Display({ subsets: ["latin"], weight: ["400"] });
const body = Public_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function AboutPage() {
  return (
    <PageFontScope heading={heading.style.fontFamily} body={body.style.fontFamily}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(aboutJsonLd)} />
      <AboutHero />

      <section className="bg-ivory-50 pb-20 pt-14 sm:pt-16">
        <Container className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} delay={70 * i} />
          ))}
        </Container>
      </section>

      <section className="bg-ivory py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxury">
              <Image
                src="/fleet/innova-crysta-front-01.jpeg"
                alt="A Renuka Tours & Travels Toyota Innova Crysta"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Our Story"
              title="How did Renuka Tours & Travels get started?"
              description="What started as a small self-drive rental for Bengaluru's tech corridor has grown into a full-service travel partner for families, corporates and pilgrimage groups across South India — while keeping the same founder-led attention to every booking."
            />
            <Reveal delay={100}>
              <p className="text-forest-900/80">
                Our mission is simple: get people where they&apos;re going, safely
                and on time, without hidden costs or unpleasant surprises. Our
                vision is to be the most trusted name in South Indian road
                travel — one honest trip at a time.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-24 text-ivory sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Milestones"
            tone="light"
            title="How has Renuka Tours & Travels grown since 2011?"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={70 * i}>
                <div className="flex flex-col gap-2 border-l-2 border-terracotta-500 pl-4">
                  <span className="font-serif-luxury text-2xl text-terracotta-300">
                    {item.year}
                  </span>
                  <p className="text-base text-ivory/80">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Safety Standards"
            title="What safety standards does Renuka Tours & Travels follow?"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {safety.map((item, i) => (
              <Reveal key={item.title} delay={60 * i}>
                <div className="flex flex-col gap-3">
                  <item.icon className="h-7 w-7 text-terracotta-600" strokeWidth={1.5} />
                  <h3 className="font-serif-luxury text-lg text-forest-950">{item.title}</h3>
                  <p className="text-base leading-relaxed text-forest-900/75">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageFontScope>
  );
}
