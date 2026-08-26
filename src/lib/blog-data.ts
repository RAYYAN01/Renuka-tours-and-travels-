import "server-only";
import { sql } from "@/lib/db";
import { sortBlogPostsByDate, type BlogPost } from "@/lib/blog";

function rowToPost(row: Record<string, unknown>): BlogPost {
  return {
    slug: row.slug as string,
    title: row.title as string,
    metaTitle: (row.meta_title as string | null) ?? undefined,
    excerpt: row.excerpt as string,
    category: row.category as string,
    publishedDate:
      row.published_date instanceof Date
        ? row.published_date.toISOString().slice(0, 10)
        : (row.published_date as string),
    readingTime: row.reading_time as string,
    coverImage: row.cover_image as string,
    coverImageAlt: row.cover_image_alt as string,
    keywords: row.keywords as string[],
    sections: row.sections as BlogPost["sections"],
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await sql`SELECT * FROM blog_posts`;
  return sortBlogPostsByDate(rows.map(rowToPost));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug}`;
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function getBlogSlugs(): Promise<string[]> {
  const rows = await sql`SELECT slug FROM blog_posts`;
  return rows.map((r) => r.slug as string);
}
