import Link from "next/link";

import { formatDate } from "@/lib/format-date";
import type { BlogPost } from "@/lib/blog";

type BlogPostCardProps = {
  post: Pick<
    BlogPost,
    "slug" | "title" | "excerpt" | "cover_image_url" | "published_at" | "tags"
  >;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-wisk-border bg-wisk-card">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="aspect-[16/9] w-full object-cover transition-opacity group-hover:opacity-90"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-wisk-lime/40 to-wisk-turquoise/30" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <time
          dateTime={post.published_at ?? undefined}
          className="text-xs text-wisk-muted"
        >
          {formatDate(post.published_at)}
        </time>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-wisk-lime">
            {post.title}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-wisk-muted">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-wisk-border px-2.5 py-0.5 text-xs text-wisk-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 text-sm font-medium text-wisk-lime transition-colors hover:text-wisk-turquoise"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
