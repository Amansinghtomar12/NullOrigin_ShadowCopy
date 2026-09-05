import { ArrowLeft, Compass } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import { sound } from "../hooks/utils/audio";

/**
 * A route that does not exist. The site has two pages; anything else typed
 * into the bar used to land on the home page as if nothing had happened,
 * which is a quiet kind of wrong. This says so, in the site's own voice,
 * and offers the way back. The decoy flag is for the players who will try.
 */
export default function LostPage({ path, onHome }: { path: string; onHome: () => void }) {
  const shown = path.length > 48 ? path.slice(0, 45) + "…" : path;
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <CosmicBackground />
      <div className="above-cosmos min-h-screen flex items-center justify-center px-4 py-16">
        <div className="shell">
          <div className="glass glass-strong rounded-[28px] p-8 sm:p-12 text-center relative overflow-hidden max-w-2xl mx-auto">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            <span className="status mx-auto"><span className="dot" /> Sector not found</span>
            <h1 className="h-display text-[clamp(1.9rem,5vw,3rem)] mt-5" tabIndex={-1}>
              Lost in the <span className="accent">void</span>.
            </h1>
            <p className="lead mt-4 max-w-xl mx-auto">
              <span className="font-mono text-white/80 break-all">{shown}</span> does not resolve to anything
              in Null Origin. The event, the schedule and registration all live at the origin.
            </p>
            <ol className="mt-6 text-left mx-auto max-w-md font-mono text-[13px] text-[var(--muted)] space-y-1.5" aria-hidden="true">
              <li><span className="text-red-500">&gt;</span> resolving route … no such sector</li>
              <li><span className="text-red-500">&gt;</span> scanning for flags … flag&#123;n0t_th4t_e4sy&#125;</li>
              <li><span className="text-red-500">&gt;</span> plotting course home<span className="term-caret" /></li>
            </ol>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => { sound.playClick?.(); onHome(); }}
                onMouseEnter={() => sound.playHover?.()}
                className="btn btn-primary cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back to origin
              </button>
              <a href="https://ctf.cyberhx.com/" className="btn btn-ghost" onMouseEnter={() => sound.playHover?.()}>
                <Compass className="h-4 w-4" /> Open the platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
