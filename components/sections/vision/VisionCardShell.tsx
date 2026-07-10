import type { ReactNode } from "react";

type VisionCardShellProps = {
  children: ReactNode;
  badge?: { text: string; accent: string };
  footer?: { package: string; timing: string };
  accentColor?: string;
};

export function VisionCardShell({
  children,
  badge,
  footer,
  accentColor = "#aca0ff",
}: VisionCardShellProps) {
  return (
    <div
      className="relative flex aspect-auto flex-col rounded-2xl overflow-hidden border border-wisk-border bg-wisk-card md:aspect-[5/4]"
      style={{
        boxShadow: `0 30px 80px -25px ${accentColor}4D`,
      }}
    >
      {/* Diagonal stripe pattern — very subtle coming-soon texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 12px,
            rgba(255,255,255,0.5) 12px,
            rgba(255,255,255,0.5) 13px
          )`,
        }}
      />

      {/* Top-right badge */}
      {badge && (
        <div className="absolute right-4 top-4 z-10">
          <span
            className="inline-block rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {badge.text}
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="relative flex flex-1 flex-col p-7 md:p-8">
        <div className="flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-auto border-t border-white/5 pt-5">
            <p className="text-xs text-white/40">
              Available with{" "}
              <span className="font-medium text-white/60">{footer.package}</span>
              {" · "}
              {footer.timing}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
