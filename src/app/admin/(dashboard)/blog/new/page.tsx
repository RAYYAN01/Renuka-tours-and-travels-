import BlogForm from "../BlogForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif-luxury text-3xl text-forest-950">Add Blog Post</h1>
      <BlogForm action={createBlogPost} submitLabel="Create Post" />
    </div>
  );
}
