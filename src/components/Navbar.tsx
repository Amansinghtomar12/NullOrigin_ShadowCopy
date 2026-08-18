import { useState, useEffect } from "react";
import { ArrowRight, Volume2, VolumeX, Layers } from "lucide-react";
import { NAV, REGISTER_URL } from "../constants";
import { sound } from "../hooks/utils/audio";

interface NavbarProps {
  audioEnabled: boolean;
  onToggleSound: () => void;
  onRegister: () => void;
}

export default function Navbar({ audioEnabled, onToggleSound, onRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3 sm:py-4"
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-300 glass`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => sound.playClick()}
          >
            <img
              src="/mask.png"
              alt="Null Origin"
              className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(255, 51, 85,0.45)] group-hover:scale-110 transition-transform"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <span className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[13px] tracking-[0.14em] text-white">
                NULL ORIGIN
              </span>
              <span className="font-mono text-[9px] tracking-[0.28em] text-[var(--faint)] mt-1">
                CTF · 2026
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--muted)] hover:text-white transition-colors"
                onMouseEnter={() => sound.playHover()}
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              aria-label={audioEnabled ? "Mute sound" : "Unmute sound"}
              onClick={() => {
                onToggleSound();
                sound.playClick();
              }}
              className="grid place-items-center h-9 w-9 rounded-xl border border-[var(--line)] bg-white/[0.02] text-[var(--muted)] hover:text-white hover:border-red-700/40 transition-all cursor-pointer"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <a
              href="#sponsors"
              className="hidden sm:inline-flex btn btn-ghost !py-2.5 !px-4 !text-[11px]"
              onMouseEnter={() => sound.playHover()}
            >
              Partner with us
            </a>
            <button
              onClick={onRegister}
              onMouseEnter={() => sound.playHover()}
              className="hidden sm:inline-flex btn btn-primary !py-2.5 !px-4 !text-[11px] cursor-pointer"
            >
              Register <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label="Open menu"
              className="lg:hidden grid place-items-center h-9 w-9 rounded-xl border border-[var(--line)] text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <Layers className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden glass rounded-2xl mt-2 p-4 space-y-1">
            {NAV.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block font-mono text-[12px] tracking-[0.14em] uppercase text-[var(--muted)] hover:text-white py-2"
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <a
                href="#sponsors"
                className="btn btn-ghost flex-1 !py-2.5"
                onClick={() => setOpen(false)}
              >
                Partner
              </a>
              <button
                onClick={() => { setOpen(false); onRegister(); }}
                className="btn btn-primary flex-1 !py-2.5 cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}