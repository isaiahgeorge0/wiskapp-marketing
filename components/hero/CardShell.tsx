import type { ReactNode } from "react";

type CardShellProps = {
  children: ReactNode;
  className?: string;
};

export function CardShell({ children, className = "" }: CardShellProps) {
  return (
    <div
      className={`relative w-full shrink-0 rounded-2xl p-px h-[280px] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(195,255,50,0.35) 0%, rgba(1,108,129,0.20) 100%)",
        boxShadow:
          "0 16px 48px -16px rgba(195,255,50,0.20), 0 6px 24px -6px rgba(0,0,0,0.5)",
      }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-wisk-card p-4 md:p-5">
        {children}
      </div>
    </div>
  );
}
