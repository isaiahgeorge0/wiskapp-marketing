import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-wisk-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Wordmark />
        <p className="text-sm text-wisk-muted">Built by Isaiah George Creative</p>
      </div>
    </footer>
  );
}
