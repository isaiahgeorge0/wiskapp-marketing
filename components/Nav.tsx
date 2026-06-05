"use client";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wisk-border bg-wisk-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Wordmark />
        <Button href="#request-access">Request access</Button>
      </div>
    </header>
  );
}
