import Link from "next/link";
import { sql } from "@/lib/db";

export default async function AdminBlogPage() {
  const posts = await sql`
    SELECT id, slug, title, category, published_date FROM blog_posts ORDER BY published_date DESC
  `;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Blog Posts ({posts.length})</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-forest-950 px-4 py-2 text-sm font-semibold text-ivory hover:opacity-90"
        >
          + Add Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-forest-950/10 bg-ivory-50">
        <table className="w-full text-sm">
          <thead className="bg-forest-950/5 text-left text-xs uppercase tracking-wide text-forest-900/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-950/5">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-forest-950">{p.title}</td>
                <td className="px-4 py-3 text-forest-900/70">{p.category}</td>
                <td className="px-4 py-3 text-forest-900/70">
                  {new Date(p.published_date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="text-sm font-medium text-terracotta-700 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
