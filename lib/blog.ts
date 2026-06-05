import { createServerClient } from "@/lib/supabase/server";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_name: string;
  tags: string[];
};

const postFields =
  "id, title, slug, excerpt, content, cover_image_url, published, published_at, created_at, updated_at, author_name, tags";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postFields)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedPosts:", error);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postFields)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPostBySlug:", error);
    return null;
  }

  return data as BlogPost | null;
}
