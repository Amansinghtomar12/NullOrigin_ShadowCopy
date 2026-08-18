import React from "react";
import { Loader2 } from "lucide-react";
import { sound } from "../../hooks/utils/audio";
import { FormData, SubmitStatus } from "./types";
import { FieldErrors } from "./validation";
import TeamLeaderFields from "./TeamLeaderFields";
import MemberField from "./MemberField";

interface Props {
  form: FormData; status: SubmitStatus; errorMsg: string; expandedMembers: number[];
  errors: FieldErrors;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
  onToggleMember: (n: number) => void;
}

export default function RegFormCard({ form, status, errorMsg, expandedMembers, errors, onSubmit, onChange, onBlur, onToggleMember }: Props) {
  return (
    <main
      className="flex-1 w-full max-w-[880px] mx-auto px-6 py-0 relative z-10"
      style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 1px, transparent 0),
          linear-gradient(rgba(57,255,106,.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,106,.035) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 96px 96px, 96px 96px",
      }}
    >
      {/* Terminal header */}
      <div className="pt-[54px] pb-[30px]">
        {/* Terminal line */}
        <div
          className="flex items-center gap-[10px] overflow-x-auto whitespace-nowrap border-[3px] border-[#000] px-[18px] py-[14px]"
          style={{ fontFamily: "'VT323', monospace", fontSize: "19px", color: "#39ff6a", background: "#000" }}
        >
          <span style={{ color: "#ff3355", flexShrink: 0 }}>operator@nullorigin:~$</span>
          <span style={{ color: "#39ff6a" }}>./register --mode=team --portal=nullorigin.ctf</span>
          <span
            className="inline-block w-[10px] h-[18px] bg-[#39ff6a] flex-shrink-0 animate-pulse"
            style={{ animation: "blink 1s steps(1) infinite" }}
          />
        </div>

        {/* Status chips */}
        <div className="flex flex-wrap gap-[14px] mt-[20px]">
          {[
            { label: "REGISTRATION LIVE", live: true },
            { label: "CLOSES 08 JULY 2026" },
            { label: "1–4 MEMBERS" },
          ].map(({ label, live }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 px-[14px] py-[10px] border-[3px] border-[#000]"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "10px",
                background: "#15151f",
              }}
            >
              {live && (
                <span
                  className="w-2 h-2 bg-[#39ff6a] border border-[#000] flex-shrink-0 animate-pulse"
                />
              )}
              {label}
            </div>
          ))}
        </div>

        {/* Page title */}
        <div className="flex items-center gap-[16px] mt-[40px]">
          <div
            className="w-[44px] h-[44px] bg-[#ff3355] border-[3px] border-[#000] flex items-center justify-center flex-shrink-0"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "16px",
              color: "#000",
            }}
          >
            &gt;_
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(16px, 3vw, 22px)",
                lineHeight: 1.5,
              }}
            >
              TEAM REGISTRATION FORM
            </h1>
            <p className="text-[15px] text-[#7c8389] mt-1" style={{ fontFamily: "'VT323', monospace" }}>
              NULL ORIGIN CTF · OFFICIAL OPERATOR ENROLLMENT
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div
        id="registerForm"
        className="border-[3px] border-[#000] px-[30px] py-[38px] mb-10"
        style={{ background: "#15151f", boxShadow: "8px 8px 0 #000" }}
      >
        <form onSubmit={onSubmit} noValidate className="space-y-0">
          <TeamLeaderFields form={form} errors={errors} onChange={onChange} onBlur={onBlur} />

          {/* Members section */}
          <div className="mb-[30px]">
            <div
              className="flex items-center gap-2.5 pb-2.5 border-b-[3px] border-[#000] mb-4"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", color: "#ff3355" }}
            >
              <span className="inline-block w-1 h-[14px] bg-[#ff3355] flex-shrink-0" />
              TEAM MEMBERS
            </div>
            {[1, 2, 3, 4].map((n) => (
              <MemberField
                key={n} n={n} required={false}
                expanded={expandedMembers.includes(n)}
                form={form} errors={errors} onToggle={onToggleMember} onChange={onChange} onBlur={onBlur}
              />
            ))}
          </div>

          {/* Error message */}
          {status === "error" && (
            <div
              className="border-[3px] border-[#ff3355] p-[14px] mb-4"
              style={{ background: "rgba(255,51,85,.12)", color: "#ff3355", fontFamily: "'VT323', monospace", fontSize: "15px" }}
              role="alert"
              aria-live="assertive"
            >
              ✗ SUBMISSION FAILED — {errorMsg}
            </div>
          )}

          {/* Ethics checkbox */}
          <label className="flex items-start gap-3 mt-2 mb-5 cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 flex-shrink-0"
              style={{ accentColor: "#39ff6a" }}
            />
            <span
              className="text-[15px] text-[#7c8389]"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              I confirm my team will participate ethically and follow the Null Origin rules of engagement.
            </span>
          </label>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            onMouseEnter={() => sound.playHover?.()}
            aria-label="Submit team registration"
            className="w-full flex items-center justify-center gap-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "13px",
              padding: "18px",
              border: "3px solid #000",
              background: "#ff3355",
              color: "#000",
              boxShadow: "4px 4px 0 #000",
              transition: "transform .08s, box-shadow .08s",
            }}
            onMouseDown={e => {
              if (status !== "loading") {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px,2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #000";
              }
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #000";
            }}
          >
            {status === "loading" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /><span>SUBMITTING...</span></>
            ) : (
              <><span>🛡</span><span>REGISTER TEAM →</span></>
            )}
          </button>

          <p
            className="text-center mt-[16px] text-[14px] text-[#7c8389]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            By registering you agree to participate ethically · Null Origin CTF 2026
          </p>
        </form>
      </div>
    </main>
  );
}