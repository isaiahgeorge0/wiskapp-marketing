import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Terms of Service | WISK",
  description:
    "The terms governing your access to and use of the WISK platform.",
};

export default function TermsPage() {
  const content = readFileSync(
    path.join(process.cwd(), "docs/terms-of-service.md"),
    "utf-8",
  );

  return (
    <main className="px-6 py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <div className="blog-prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
