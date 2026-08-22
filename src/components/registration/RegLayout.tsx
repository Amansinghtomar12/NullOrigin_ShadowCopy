import { ArrowLeft } from "lucide-react";
import { sound } from "../../hooks/utils/audio";

interface HeaderProps { onBack: () => void; }

/**
 * Header and footer for the registration page — the same glass panel
 * language as the main site's navbar and footer, so crossing into the
 * form never feels like leaving the site.
 */
export function RegistrationHeader({ onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 py-3 sm:py-4">
      <div className="shell">
        <div className="flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 glass glass-nav">
          <button
            type="button"
            onClick={() => { sound.playClick?.(); onBack(); }}
            onMouseEnter={() => sound.playHover?.()}
            className="flex items-center gap-3 group shrink-0 cursor-pointer bg-transparent border-0 p-0 text-left"
          >
            <img
              src="/mask.webp"
              alt="Null Origin"
              width="36"
              height="36"
              className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(255,51,85,0.45)] group-hover:scale-110 transition-transform"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <span className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[15px] tracking-[0.14em] text-white">
                NULL ORIGIN
              </span>
              <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--faint)] mt-1">
                CTF · 2026
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => { sound.playClick?.(); onBack(); }}
            onMouseEnter={() => sound.playHover?.()}
            className="btn btn-ghost !py-2.5 !px-4 !text-[13px] cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </button>
        </div>
      </div>
    </header>
  );
}

export function RegistrationFooter() {
  return (
    <footer className="mt-14 border-t-2 border-[var(--line-soft)]">
      <div className="shell py-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--faint)]">
          © {new Date().getFullYear()} Null Origin CTF · Team CyberXoX · Powered by CyberHX
        </p>
      </div>
    </footer>
  );
}
