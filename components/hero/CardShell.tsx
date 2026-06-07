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
          "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(29,158,117,0.20) 100%)",
        boxShadow:
          "0 16px 48px -16px rgba(124,58,237,0.25), 0 6px 24px -6px rgba(0,0,0,0.5)",
      }}
    >
      <div className="relative h-full rounded-2xl bg-[#0F1419] p-4 md:p-5 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
