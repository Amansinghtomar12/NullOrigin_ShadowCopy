import React, { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
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
  // The form is noValidate (we run our own validators), which also turns
  // off the browser's enforcement of `required` on the checkbox — so the
  // agreement is tracked as real state and gated here.
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    if (!agreed) {
      e.preventDefault();
      setAgreeError(true);
      sound.playError?.();
      return;
    }
    onSubmit(e);
  };

  return (
    <main className="flex-1 w-full max-w-[880px] mx-auto px-4 sm:px-6 relative z-10">
      {/* ── page intro ── */}
      <div className="pt-10 pb-8">
        {/* terminal line, in the same voice as the About section's intel panel */}
        <div className="glass rounded-2xl px-5 py-4 font-mono text-[13px] overflow-x-auto whitespace-nowrap">
          <span className="text-[var(--accent)]">operator@nullorigin</span>
          <span className="text-[var(--faint)]">:~$ </span>
          <span className="text-[var(--text)]">./register --mode=team --portal=nullorigin.ctf</span>
          <span className="term-caret ml-2" aria-hidden="true" />
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <span className="status inline-flex">
            <span className="dot" />
            Registration live
          </span>
          <span className="status inline-flex !text-[var(--amber)] !border-[rgba(255,194,60,.4)] !bg-[rgba(255,194,60,.07)]">
            Closes 17 Sep 2026
          </span>
          <span className="status inline-flex">1–4 members</span>
        </div>

        <div className="mt-9">
          <span className="eyebrow inline-flex">Enrollment</span>
          <h1 tabIndex={-1} className="h-display outline-none text-[clamp(1.8rem,4.5vw,2.8rem)] mt-4">
            Team Registration
          </h1>
          <p className="lead mt-3 max-w-[52ch]">
            One form per team. Only the team info and leader are required — you can
            add up to three more operators.
          </p>
        </div>
      </div>

      {/* ── form card ── */}
      <div id="registerForm" className="glass-strong rounded-[var(--radius-lg)] px-5 sm:px-8 py-8 mb-4">
        <form onSubmit={handleSubmit} noValidate>
          <TeamLeaderFields form={form} errors={errors} onChange={onChange} onBlur={onBlur} />

          {/* members */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--accent)] pb-3 border-b-2 border-[var(--line-soft)] mb-5">
              <span className="inline-block w-1.5 h-3.5 rounded-full bg-[var(--accent)] shrink-0" />
              Team members
            </div>
            {[1, 2, 3, 4].map((n) => (
              <MemberField
                key={n} n={n} required={false}
                expanded={expandedMembers.includes(n)}
                form={form} errors={errors} onToggle={onToggleMember} onChange={onChange} onBlur={onBlur}
              />
            ))}
          </div>

          {/* error banner */}
          {status === "error" && (
            <div
              className="flex items-center gap-2.5 rounded-xl border-2 border-red-500/50 bg-red-950/25 px-4 py-3 mb-5 text-[15px] text-red-400"
              role="alert"
              aria-live="assertive"
            >
              ✗ {errorMsg}
            </div>
          )}

          {/* ethics agreement */}
          <label className="flex items-start gap-3 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setAgreeError(false);
              }}
              aria-invalid={agreeError}
              aria-describedby={agreeError ? "agree-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 rounded"
              style={{ accentColor: "var(--red)" }}
            />
            <span className="text-[15px] text-[var(--muted)] leading-relaxed">
              I confirm my team will participate ethically and follow the Null Origin
              rules of engagement. <span className="text-red-400">*</span>
            </span>
          </label>
          {agreeError && (
            <p id="agree-error" className="text-[13px] text-red-400 mb-4 ml-7" role="alert">
              Please confirm the rules of engagement before registering.
            </p>
          )}
          <div className="mb-4" />

          <button
            type="submit"
            disabled={status === "loading"}
            onMouseEnter={() => sound.playHover?.()}
            aria-label="Submit team registration"
            className="btn btn-primary w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
            ) : (
              <><ShieldCheck className="h-4.5 w-4.5" /> Register team</>
            )}
          </button>

          <p className="text-center mt-4 text-[13px] text-[var(--faint)]">
            By registering you agree to participate ethically · Null Origin CTF 2026
          </p>
        </form>
      </div>
    </main>
  );
}
