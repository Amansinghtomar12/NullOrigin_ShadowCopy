import { sound } from "../../hooks/utils/audio";

interface HeaderProps { onBack: () => void; }

export function RegistrationHeader({ onBack }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-[500] border-b-[3px] border-[#000]"
      style={{ background: "#0a0a12" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between py-[14px]">
        {/* Left: icon + title */}
        <div className="flex items-center gap-[14px]">
          <div
            className="w-[38px] h-[38px] bg-[#000] border-[3px] border-[#000] flex items-center justify-center overflow-hidden"
            style={{ boxShadow: "4px 4px 0 #000" }}
          >
            <img src="/mask.png" alt="Null Origin"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                if (t.src.endsWith("/mask.png")) t.src = "/logo.png";
                else t.style.display = "none";
              }}
            />
          </div>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "13px", letterSpacing: "1px" }}>
              NULL ORIGIN
            </div>
            <div className="text-[14px] text-[#7c8389] tracking-[1px]" style={{ fontFamily: "'VT323', monospace" }}>
              CTF · 2026
            </div>
          </div>
        </div>

        {/* Right: buttons */}
        <div className="flex gap-[10px]">
          <button
            onClick={() => { sound.playClick?.(); onBack(); }}
            onMouseEnter={() => sound.playHover?.()}
            className="cursor-pointer"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "11px",
              padding: "11px 16px",
              border: "3px solid #000",
              background: "#f4f6f5",
              color: "#000",
              boxShadow: "4px 4px 0 #000",
              transition: "transform .08s, box-shadow .08s",
            }}
            onMouseDown={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px,2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #000";
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #000";
            }}
          >
            ← BACK
          </button>
          <a
            href="#registerForm"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "11px",
              padding: "11px 16px",
              border: "3px solid #000",
              background: "#ff3355",
              color: "#000",
              boxShadow: "4px 4px 0 #000",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            REGISTER
          </a>
        </div>
      </div>
    </header>
  );
}

export function RegistrationFooter() {
  return (
    <footer
      className="text-center border-t-[3px] border-[#000] mt-[60px]"
      style={{ padding: "50px 0 30px", background: "#101018" }}
    >
      <p className="text-[14px] text-[#7c8389]" style={{ fontFamily: "'VT323', monospace" }}>
        © {new Date().getFullYear()} NULL ORIGIN CTF · Built by Team CyberXoX · Powered by CyberHX
      </p>
    </footer>
  );
}
