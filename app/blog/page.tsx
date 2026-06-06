import type { Metadata } from "next";

import { BlogPostCard } from "@/components/BlogPostCard";
import { getPublishedPosts } from "@/lib/blog";
import { blogDescription, blogTitle } from "@/lib/metadata";
import { getDefaultOgImageUrl } from "@/lib/site-url";

export const revalidate = 3600;

const ogImage = getDefaultOgImageUrl();

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  openGraph: {
    type: "website",
    siteName: "WISK",
    title: blogTitle,
    description: blogDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: blogTitle,
    description: blogDescription,
    images: [ogImage],
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-wisk-muted">
            Updates, insights, and thoughts on building WISK
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-wisk-muted">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
