-- Blog posts for the WISK marketing site (/blog)
-- Run against the wisk-command-centre Supabase project.

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image_url text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  author_name text NOT NULL DEFAULT 'Isaiah George',
  tags text[] DEFAULT '{}'
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- No INSERT/UPDATE/DELETE policies — admin writes via service role in wisk-command-centre.
