import { Volume2, VolumeX, Share2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sound } from "../hooks/utils/audio";

interface HomeHeaderProps {
  audioEnabled: boolean;
  copiedLink: boolean;
  onToggleSound: () => void;
  onCopyLink: () => void;
  onStatusClick: () => void;
}

export default function HomeHeader({
  audioEnabled,
  copiedLink,
  onToggleSound,
  onCopyLink,
  onStatusClick,
}: HomeHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="relative z-20 w-full px-5 md:px-8 py-3 md:py-4 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-red-600/25 transition-all duration-300">
      <div className="flex items-center space-x-3 md:space-x-4">
        <img
          src="/mask.png"
          alt="Null Origin Icon"
          className="h-9 md:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(255, 51, 85,0.7)] hover:scale-105 transition-all duration-300"
          onMouseEnter={() => sound.playHover()}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith("/mask.png")) target.src = "/logo.png";
            else target.style.display = "none";
          }}
        />
        <button
          onClick={onStatusClick}
          onMouseEnter={() => sound.playHover()}
          title="PORTAL ACCESS INDICATOR"
          aria-label="Null Origin Portal Status"
          className="flex items-center space-x-2.5 cursor-pointer group select-none bg-transparent border-0 p-0"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(255, 51, 85,0.8)] group-hover:bg-red-400 flex-shrink-0" aria-hidden="true" />
          <span className="text-[12px] md:text-[14px] tracking-widest text-zinc-100 uppercase font-black font-sans group-hover:text-red-400 transition-colors">
            NULL ORIGIN <span className="hidden sm:inline text-red-500 font-mono">// SECURED PORTAL</span>
          </span>
        </button>
      </div>

      <nav className="flex items-center space-x-2 md:space-x-3" aria-label="Primary navigation">
        <button
          onClick={onToggleSound}
          onMouseEnter={() => sound.playHover()}
          aria-label={audioEnabled ? "Mute sounds" : "Unmute sounds"}
          className="p-2.5 border border-zinc-800 rounded-md bg-zinc-900/50 hover:bg-red-950/20 hover:border-red-700/40 transition-all text-zinc-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
        >
          {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>

        <button
          onClick={onCopyLink}
          onMouseEnter={() => sound.playHover()}
          aria-label="Copy share link"
          className="flex items-center space-x-2 px-3 md:px-4 py-2 border border-zinc-800 rounded-md bg-zinc-900/50 hover:text-red-400 text-zinc-500 hover:bg-red-950/20 hover:border-red-700/40 transition-all text-[11px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">{copiedLink ? "COPIED ✓" : "SHARE"}</span>
        </button>

        <button
          onClick={() => navigate("/registration")}
          onMouseEnter={() => sound.playHover()}
          aria-label="Register for Null Origin CTF"
          className="flex items-center space-x-2 px-4 md:px-5 py-2 bg-red-700 hover:bg-red-600 active:bg-red-800 border border-red-500/80 text-white text-[11px] font-black tracking-widest uppercase rounded-md transition-all shadow-[0_0_18px_rgba(255, 51, 85,0.25)] hover:shadow-[0_0_24px_rgba(255, 51, 85,0.4)] focus:outline-none focus:ring-2 focus:ring-red-400/70 focus:ring-offset-1 focus:ring-offset-black cursor-pointer"
        >
          <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
          <span>REGISTER</span>
        </button>
      </nav>
    </header>
  );
}