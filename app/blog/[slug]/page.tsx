import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found — WISK" };
  }

  return {
    title: `${post.title} — WISK`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.cover_image_url && { images: [post.cover_image_url] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="px-6 py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm text-wisk-muted transition-colors hover:text-white"
        >
          ← Back to blog
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-wisk-muted">
            {post.author_name} · {formatDate(post.published_at)}
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
        </header>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="mt-8 w-full rounded-xl object-cover"
          />
        )}

        <div className="blog-prose mt-10">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
