import { CardShell } from "@/components/hero/CardShell";

const ACCENT = "#00c4b4";

const DAYS = ["M","T","W","T","F","S","S"];

const events: { day: number; color: string; label: string }[] = [
  { day: 0, color: "#aca0ff", label: "Call" },
  { day: 1, color: "#ff5d00", label: "Post" },
  { day: 2, color: "#016c81", label: "Review" },
  { day: 3, color: "#baf7e1", label: "Goal" },
  { day: 4, color: "#0066ff", label: "Ship" },
];

export function CalendarCard() {
  return (
    <CardShell>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-md" style={{ background: ACCENT }} />
        <div>
          <p className="text-sm font-semibold text-white">June</p>
          <p className="text-xs text-wisk-muted">This week</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-1">
        {DAYS.map((day, i) => {
          const ev = events.find((e) => e.day === i);
          return (
            <div key={`${day}-${i}`} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-wisk-muted">{day}</span>
              {ev ? (
                <span
                  className="w-full rounded px-0.5 py-0.5 text-center text-[9px] font-medium leading-tight text-white"
                  style={{ background: ev.color + "CC" }}
                >
                  {ev.label}
                </span>
              ) : (
                <span className="h-4 w-full rounded bg-white/5" />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-wisk-muted">12 events tracked</p>

      <div className="mt-auto border-t border-white/8 pt-3">
        <p className="text-xs text-wisk-muted/70">Everything in one timeline.</p>
      </div>
    </CardShell>
  );
}
