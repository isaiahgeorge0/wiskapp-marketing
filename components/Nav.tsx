"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export function Nav() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");
  const requestAccessHref = pathname === "/" ? "#request-access" : "/#request-access";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wisk-border bg-wisk-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Wordmark />
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${
              isBlog ? "text-wisk-purple" : "text-wisk-muted hover:text-white"
            }`}
          >
            Blog
          </Link>
        </div>
        <Button href={requestAccessHref}>Request access</Button>
      </div>
    </header>
  );
}
