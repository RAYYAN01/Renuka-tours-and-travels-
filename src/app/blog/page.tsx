import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/blog-data";
import { absoluteUrl, jsonLdScriptProps, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Travel Guides & Tips",
  description:
    "Road trip guides, destination tips and pilgrimage planning advice for South India — from the team at Renuka Tours & Travels.",
  path: "/blog",
  keywords: [
    "Bangalore road trip guides",
    "South India travel blog",
    "Coorg travel guide",
    "Mysuru road trip guide",
    "Tirupati pilgrimage guide",
    "Ooty vs Coorg",
    "outstation trip tips Bangalore",
  ],
});

export default async function BlogIndexPage() {
  const sortedPosts = await getBlogPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Renuka Tours & Travels — Travel Guides & Tips",
    url: absoluteUrl("/blog"),
    blogPost: sortedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedDate,
      image: absoluteUrl(post.coverImage),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(blogJsonLd)} />
      <PageHeader
        eyebrow="Travel Guides"
        title="Road trip guides & travel tips"
        description="Practical, specific guides for planning trips from Bengaluru — written from the routes we drive every week."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="bg-ivory pb-24 pt-4 sm:pb-32">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post, i) => (
              <Reveal key={post.slug} delay={60 * (i % 3)}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
