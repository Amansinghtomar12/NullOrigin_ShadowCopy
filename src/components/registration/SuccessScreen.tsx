import { sound } from "../../hooks/utils/audio";
import { FormData, initialForm } from "./types";
import { RegistrationHeader, RegistrationFooter } from "./RegLayout";

interface Props { form: FormData; onBack: () => void; onReset: (form: FormData) => void; }

export default function SuccessScreen({ form, onBack, onReset }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#0a0a12",
        color: "#f4f6f5",
        fontFamily: "'VT323', monospace",
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 1px, transparent 0),
          linear-gradient(rgba(57,255,106,.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,106,.035) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 96px 96px, 96px 96px",
      }}
    >
      <RegistrationHeader onBack={onBack} />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="max-w-md w-full border-[3px] border-[#000] px-[30px] py-[38px] text-center"
          style={{ background: "#15151f", boxShadow: "8px 8px 0 #000" }}
        >
          {/* Success icon */}
          <div
            className="inline-flex items-center justify-center w-[60px] h-[60px] border-[3px] border-[#000] mb-6 mx-auto"
            style={{ background: "#39ff6a", color: "#000", fontFamily: "'Press Start 2P', monospace", fontSize: "24px" }}
          >
            ✓
          </div>

          <h1
            className="mb-3"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", color: "#39ff6a", lineHeight: 1.5 }}
          >
            REGISTRATION CONFIRMED
          </h1>

          <p className="text-[18px] text-[#7c8389] mb-6">
            Team <span className="text-[#39ff6a]">{form.teamName}</span> is registered for Null Origin CTF.
            Check your inbox for confirmation details.
          </p>

          {/* Summary box */}
          <div
            className="border-[3px] border-[#000] p-4 text-left mb-6"
            style={{ background: "#101018" }}
          >
            {[
              { label: "TEAM",    value: form.teamName,    accent: true },
              { label: "LEADER",  value: form.leaderName },
              { label: "EMAIL",   value: form.leaderEmail },
              { label: "COUNTRY", value: form.country },
            ].map(({ label, value, accent }) => (
              <div key={label} className="flex items-center justify-between gap-4 py-1 border-b border-[#000] last:border-0">
                <span className="text-[15px] text-[#7c8389] flex-shrink-0">{label}</span>
                <span className={`text-[15px] truncate text-right ${accent ? "text-[#39ff6a]" : "text-[#f4f6f5]"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => { sound.playClick?.(); onReset(initialForm); }}
              onMouseEnter={() => sound.playHover?.()}
              className="w-full cursor-pointer"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "11px",
                padding: "14px",
                border: "3px solid #000",
                background: "#ff3355",
                color: "#000",
                boxShadow: "4px 4px 0 #000",
              }}
            >
              REGISTER ANOTHER TEAM →
            </button>
            <button
              onClick={() => { sound.playClick?.(); onBack(); }}
              className="w-full cursor-pointer text-[15px] text-[#7c8389] hover:text-[#f4f6f5] transition-colors py-2"
              style={{ background: "transparent", border: "none" }}
            >
              ← BACK TO PORTAL
            </button>
          </div>
        </div>
      </main>

      <RegistrationFooter />
    </div>
  );
}
