"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseSections } from "@/lib/sections-format";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function revalidatePublicPages() {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/", "layout");
}

export async function createBlogPost(formData: FormData) {
  await requireSession();

  const keywords = str(formData, "keywords")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const sections = parseSections(str(formData, "sections"));

  await sql`
    INSERT INTO blog_posts
      (slug, title, meta_title, excerpt, category, published_date, reading_time,
       cover_image, cover_image_alt, keywords, sections)
    VALUES
      (${str(formData, "slug")}, ${str(formData, "title")}, ${str(formData, "metaTitle") || null},
       ${str(formData, "excerpt")}, ${str(formData, "category")}, ${str(formData, "publishedDate")},
       ${str(formData, "readingTime")}, ${str(formData, "coverImage")}, ${str(formData, "coverImageAlt")},
       ${JSON.stringify(keywords)}, ${JSON.stringify(sections)})
  `;

  revalidatePublicPages();
  redirect("/admin/blog");
}

export async function updateBlogPost(id: number, formData: FormData) {
  await requireSession();

  const keywords = str(formData, "keywords")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const sections = parseSections(str(formData, "sections"));

  await sql`
    UPDATE blog_posts SET
      slug = ${str(formData, "slug")},
      title = ${str(formData, "title")},
      meta_title = ${str(formData, "metaTitle") || null},
      excerpt = ${str(formData, "excerpt")},
      category = ${str(formData, "category")},
      published_date = ${str(formData, "publishedDate")},
      reading_time = ${str(formData, "readingTime")},
      cover_image = ${str(formData, "coverImage")},
      cover_image_alt = ${str(formData, "coverImageAlt")},
      keywords = ${JSON.stringify(keywords)},
      sections = ${JSON.stringify(sections)},
      updated_at = now()
    WHERE id = ${id}
  `;

  revalidatePublicPages();
  revalidatePath(`/blog/${str(formData, "slug")}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: number) {
  await requireSession();
  await sql`DELETE FROM blog_posts WHERE id = ${id}`;
  revalidatePublicPages();
  redirect("/admin/blog");
}
