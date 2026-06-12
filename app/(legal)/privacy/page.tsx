import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Privacy Policy | WISK",
  description:
    "How WISK collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  const content = readFileSync(
    path.join(process.cwd(), "docs/privacy-policy.md"),
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
