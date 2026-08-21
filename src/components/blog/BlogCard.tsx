import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Tilt from "@/components/ui/Tilt";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Tilt max={5}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-ivory-50 shadow-[var(--md-elevation-2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--md-elevation-3)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <span className="glass-chip absolute left-4 top-4 w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ivory">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <span className="text-xs text-forest-900/55">{post.readingTime}</span>
          <h3 className="font-serif-luxury text-xl leading-tight text-forest-950">
            {post.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-forest-900/70">
            {post.excerpt}
          </p>
          <span className="flex items-center gap-1 text-sm font-semibold text-terracotta-700">
            Read Article
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Tilt>
  );
}
