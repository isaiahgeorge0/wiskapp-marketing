export function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a22] border-b border-white/5">
      {/* Traffic light dots */}
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      {/* URL bar */}
      <div className="mx-auto w-full max-w-xs rounded-md border border-white/5 bg-[#0a0a0f] px-3 py-1.5 text-center text-xs text-white/40">
        app.wiskapp.com
      </div>

      {/* Balance spacer */}
      <div className="w-[60px] shrink-0" />
    </div>
  );
}
