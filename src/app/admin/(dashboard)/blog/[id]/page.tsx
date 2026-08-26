import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import BlogForm from "../BlogForm";
import { updateBlogPost, deleteBlogPost } from "../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM blog_posts WHERE id = ${Number(id)}`;
  const post = rows[0];
  if (!post) notFound();

  const updateWithId = updateBlogPost.bind(null, post.id);
  const deleteWithId = deleteBlogPost.bind(null, post.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Edit {post.title}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Post
          </button>
        </form>
      </div>
      <BlogForm action={updateWithId} initial={post} submitLabel="Save Changes" />
    </div>
  );
}
