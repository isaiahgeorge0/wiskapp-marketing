import Link from "next/link";

import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-wisk-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Wordmark />
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-wisk-muted">
          <Link href="/privacy" className="transition-colors hover:text-wisk-lime">
            Privacy Policy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="transition-colors hover:text-wisk-lime">
            Terms of Service
          </Link>
          <span aria-hidden>·</span>
          <span>Built by IGC</span>
        </p>
      </div>
    </footer>
  );
}
