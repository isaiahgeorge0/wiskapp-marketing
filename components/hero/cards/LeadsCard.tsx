import { CardShell } from "@/components/hero/CardShell";

const ACCENT = "#ff5d00";

const stages = [
  { label: "New",       width: "45%" },
  { label: "Contacted", width: "70%" },
  { label: "Qualified", width: "55%" },
  { label: "Proposal",  width: "30%" },
  { label: "Won",       width: "80%" },
];

export function LeadsCard() {
  return (
    <CardShell>
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-md" style={{ background: ACCENT }} />
        <div>
          <p className="text-sm font-semibold text-white">Lead pipeline</p>
          <p className="text-xs text-wisk-muted">This month</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {stages.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] text-wisk-muted">{s.label}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-1.5">
              <div
                className="h-full rounded-full"
                style={{ width: s.width, background: ACCENT, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-wisk-muted">£14,200 active value</p>

      <div className="mt-auto border-t border-white/8 pt-3">
        <p className="text-xs text-wisk-muted/70">Capture and convert leads.</p>
      </div>
    </CardShell>
  );
}
