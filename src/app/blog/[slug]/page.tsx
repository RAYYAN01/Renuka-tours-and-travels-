import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getBlogSlugs, getBlogPost } from "@/lib/blog-data";
import { absoluteUrl, jsonLdScriptProps, pageMetadata, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage),
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: site.name, url: siteUrl },
    publisher: { "@type": "Organization", name: site.name, url: siteUrl },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScriptProps(postJsonLd)} />
      <section className="relative overflow-hidden pb-16 pt-36 text-ivory sm:pt-44">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/30" />
        <Container className="relative flex flex-col gap-6">
          <Reveal>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </Reveal>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ivory/70">
              {post.category}
            </span>
          </Reveal>
          <SplitReveal
            as="h1"
            delay={100}
            className="font-serif-luxury text-balance max-w-3xl text-4xl leading-[1.05] sm:text-5xl"
          >
            {post.title}
          </SplitReveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap items-center gap-5 text-sm text-ivory/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" strokeWidth={1.75} />
                {new Date(post.publishedDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" strokeWidth={1.75} />
                {post.readingTime}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            {post.sections.map((section, i) => (
              <Reveal key={i} delay={40 * i}>
                <div className="flex flex-col gap-4">
                  {section.heading && (
                    <h2 className="font-serif-luxury text-2xl text-forest-950">
                      {section.heading}
                    </h2>
                  )}
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-lg leading-relaxed text-forest-900/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="flex flex-col gap-4 rounded-2xl bg-forest-950 p-8 text-ivory sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg font-medium">Ready to plan this trip?</p>
                <Button href="/booking" icon={<ArrowRight className="h-4 w-4" />}>
                  Book a Ride
                </Button>
              </div>
            </Reveal>

            <Reveal>
              <Link href="/blog" className="text-sm text-forest-900/60 hover:text-forest-950">
                ← Back to all guides
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
