import { useEffect } from "react";
import { Check } from "lucide-react";
import { sound } from "../../hooks/utils/audio";
import CosmicBackground from "../CosmicBackground";
import { FormData, initialForm } from "./types";
import { RegistrationHeader, RegistrationFooter } from "./RegLayout";

interface Props { form: FormData; onBack: () => void; onReset: (form: FormData) => void; }

export default function SuccessScreen({ form, onBack, onReset }: Props) {
  // The submit button sits deep in the form — start the confirmation at
  // the top so the header and the whole card are in view.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <CosmicBackground />
      <div className="above-cosmos flex min-h-screen flex-col">
        <RegistrationHeader onBack={onBack} />

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="glass-strong rounded-[var(--radius-lg)] max-w-md w-full px-7 sm:px-9 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-[3px] border-[var(--amber)] bg-[rgba(255,194,60,0.1)] mb-6 mx-auto">
              <Check className="h-8 w-8 text-[var(--amber)]" />
            </div>

            <h1 className="h-display text-[clamp(1.5rem,3.5vw,2rem)] mb-3">
              Registration confirmed
            </h1>

            <p className="text-[15px] text-[var(--muted)] leading-relaxed mb-7">
              Team <span className="text-[var(--amber)] font-semibold">{form.teamName}</span> is
              registered for Null Origin CTF. Check your inbox for confirmation details.
            </p>

            <div className="rounded-2xl border-2 border-[var(--line-soft)] bg-[rgba(10,3,7,0.42)] p-5 text-left mb-7">
              {[
                { label: "Team", value: form.teamName, accent: true },
                { label: "Leader", value: form.leaderName },
                { label: "Email", value: form.leaderEmail },
                { label: "Country", value: form.country },
              ].map(({ label, value, accent }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-2 border-b border-[var(--line-soft)] last:border-0"
                >
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--faint)] shrink-0">
                    {label}
                  </span>
                  <span
                    className={`text-[14px] truncate text-right ${
                      accent ? "text-[var(--amber)] font-semibold" : "text-white"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => { sound.playClick?.(); onReset(initialForm); }}
                onMouseEnter={() => sound.playHover?.()}
                className="btn btn-primary w-full cursor-pointer"
              >
                Register another team
              </button>
              <button
                type="button"
                onClick={() => { sound.playClick?.(); onBack(); }}
                className="w-full cursor-pointer bg-transparent border-0 text-[14px] text-[var(--muted)] hover:text-white transition-colors py-2"
              >
                ← Back to site
              </button>
            </div>
          </div>
        </main>

        <RegistrationFooter />
      </div>
    </div>
  );
}
