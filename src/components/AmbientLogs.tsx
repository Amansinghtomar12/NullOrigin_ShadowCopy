interface AmbientLogsProps {
  logs: string[];
}

export default function AmbientLogs({ logs }: AmbientLogsProps) {
  return (
    <div className="border-t border-zinc-900/80 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold">AMBIENT_LOGS_STREAM</span>
        </div>
        <span className="text-[9px] text-zinc-700 uppercase font-mono hidden sm:block">CHANNEL PORTAL ACTIVE // SECURE CONTEXT</span>
      </div>
      <div
        className="bg-[#040406] border border-zinc-900 rounded-md p-3 h-24 overflow-y-auto font-mono text-[9px] md:text-[10px] text-zinc-500 space-y-1 scrollbar-thin select-none"
        aria-label="Ambient system logs"
        role="log"
        aria-live="polite"
      >
        {logs.map((log, index) => (
          <div key={index} className="flex space-x-2 border-l border-zinc-800/70 pl-2">
            <span className="text-red-900 shrink-0" aria-hidden="true">&raquo;</span>
            <span className="break-all">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}