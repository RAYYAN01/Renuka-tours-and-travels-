export interface BlogSection {
  heading?: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Shorter title for the <title> tag / SERP display — the full `title`
   * is used for the on-page H1 and card display, but at 84-94 characters
   * it was well past Google's ~60-char truncation point once the site
   * name is appended. Falls back to `title` if not set. */
  metaTitle?: string;
  excerpt: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  coverImage: string;
  coverImageAlt: string;
  keywords: string[];
  sections: BlogSection[];
}

/** Newest first — every post has a real publishedDate, so this is a plain
 * chronological sort rather than array source order. */
export function sortBlogPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}
