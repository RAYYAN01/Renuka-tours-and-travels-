import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { galleryImages } from "@/lib/gallery";
import { site } from "@/lib/site";
import { absoluteUrl, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of our fleet, past trips and destinations across South India — Renuka Tours & Travels.",
  alternates: {
    canonical: "/gallery",
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `${site.name} Photo Gallery`,
  url: absoluteUrl("/gallery"),
  image: galleryImages.map((img) => absoluteUrl(img.src)),
};

export default function GalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(galleryJsonLd)} />
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the road"
        description="Our fleet, our trips and the destinations we've taken travellers to across South India."
      />
      <section className="bg-ivory pb-24 pt-4 sm:pb-32">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
