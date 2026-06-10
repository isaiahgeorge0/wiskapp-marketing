import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-wisk-bg px-6 text-center">
      <Link href="/" className="mb-12">
        <Wordmark />
      </Link>

      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        Lost in the mix.
      </h1>

      <p className="mt-4 text-base text-wisk-muted md:text-lg">
        This page doesn&apos;t exist — but your command centre does.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Button href="/">Go home</Button>
        <Link
          href="/#request-access"
          className="text-sm font-medium text-wisk-muted transition-colors hover:text-white"
        >
          Request access
        </Link>
      </div>
    </main>
  );
}
