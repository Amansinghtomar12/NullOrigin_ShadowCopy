import React, { useEffect, useRef, useState } from "react";
import { sound } from "../hooks/utils/audio";
import CosmicBackground from "./CosmicBackground";
import { FormData, FIELD_MAX, initialForm, SubmitStatus, GOOGLE_SCRIPT_URL } from "./registration/types";
import { FieldErrors, validateForm, validateTeamName, validateCountry, validateLeaderName, validateEmail, validateDiscord, validateCTFtime, firstErrorMessage, clean } from "./registration/validation";
import { RegistrationHeader, RegistrationFooter } from "./registration/RegLayout";
import SuccessScreen from "./registration/SuccessScreen";
import RegFormCard from "./registration/RegFormCard";

interface Props { onBack: () => void; }

// Validates a single field in isolation — used for live (onBlur) feedback.
function validateSingleField(field: keyof FormData, form: FormData): string {
  if (field === "teamName") return validateTeamName(form.teamName);
  if (field === "country") return validateCountry(form.country);
  if (field === "leaderName") return validateLeaderName(form.leaderName);
  if (field === "leaderEmail") return validateEmail(form.leaderEmail);

  const match = field.match(/^member(\d)(Discord|CTFtime)$/);
  if (match) {
    const n = Number(match[1]);
    const kind = match[2];
    const dVal = form[`member${n}Discord` as keyof FormData] as string;
    const cVal = form[`member${n}CTFtime` as keyof FormData] as string;
    return kind === "Discord" ? validateDiscord(dVal) : validateCTFtime(cVal);
  }
  return "";
}

export default function RegistrationPage({ onBack }: Props) {
  const [form, setForm]                       = useState<FormData>(initialForm);
  const [status, setStatus]                   = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg]               = useState("");
  const [errors, setErrors]                   = useState<FieldErrors>({});
  const [expandedMembers, setExpandedMembers] = useState<number[]>([1]);
  const honeypotRef                            = useRef<HTMLInputElement>(null);
  // Second bot trap: real people cannot open the page and complete a
  // twelve-field form inside three seconds.
  const openedAt                               = useRef(Date.now());

  // Arriving from anywhere on the long home page — always start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    sound.playKey?.();
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear an existing error the moment the field becomes valid again,
    // so the UI doesn't nag the user after they've already fixed it.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    // And when that was the last outstanding error, retire the banner too —
    // it was still shouting the old message after everything was fixed.
    if (errors[field] && Object.keys(errors).length === 1 && status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const handleBlur = (field: keyof FormData) => {
    const message = validateSingleField(field, form);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const toggleMember = (n: number) => {
    sound.playClick?.();
    setExpandedMembers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    // Bot trap — only the honeypot hard-blocks; a human never fills it.
    if (honeypotRef.current?.value) {
      setStatus("error");
      setErrorMsg("Submission blocked.");
      return;
    }

    const fieldErrors = validateForm(form);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("error");
      setErrorMsg(firstErrorMessage(fieldErrors));
      sound.playError?.();

      // Auto-expand any member section that has an error so it's visible.
      const membersToExpand = [1, 2, 3, 4].filter(
        (n) => fieldErrors[`member${n}Discord` as keyof FormData] || fieldErrors[`member${n}CTFtime` as keyof FormData]
      );
      if (membersToExpand.length) {
        setExpandedMembers((prev) => Array.from(new Set([...prev, ...membersToExpand])));
      }

      // Focus + scroll to the first invalid field for fast correction.
      const firstField = Object.keys(fieldErrors)[0];
      requestAnimationFrame(() => {
        const el = document.getElementById(
          firstField.startsWith("member")
            ? firstField.replace(/^member(\d)(Discord|CTFtime)$/, (_, n, k) => `m${n}${k.toLowerCase()}`)
            : firstField
        );
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLInputElement | null)?.focus();
      });
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    // Defense in depth: everything sent is cleaned and hard-capped, even
    // though the validators already passed it.
    const payload = Object.fromEntries(
      (Object.entries(form) as [keyof FormData, string][]).map(([k, v]) => [
        k,
        clean(v).slice(0, FIELD_MAX[k]),
      ])
    ) as Record<string, string>;
    payload.timestamp = new Date().toISOString();

    // Second bot trap, now transparent to humans: a scripted submit fires
    // instantly, so anything faster than 3s from page-open simply waits out
    // the remainder under the normal "Submitting…" spinner instead of
    // being rejected with a cryptic error (which real users on autofill
    // were hitting).
    const elapsed = Date.now() - openedAt.current;
    if (elapsed < 3000) {
      await new Promise((r) => setTimeout(r, 3000 - elapsed));
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      sound.playSuccess?.();
      setStatus("success");
    } catch {
      sound.playError?.();
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return <SuccessScreen form={form} onBack={onBack} onReset={(f) => { setForm(f); setErrors({}); setStatus("idle"); }} />;
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      {/* The same living backdrop as the rest of the site. */}
      <CosmicBackground />
      <div className="above-cosmos flex min-h-screen flex-col">
        <RegistrationHeader onBack={onBack} />
        <RegFormCard
          form={form} status={status} errorMsg={errorMsg} expandedMembers={expandedMembers} errors={errors}
          onSubmit={handleSubmit} onChange={handleChange} onBlur={handleBlur} onToggleMember={toggleMember}
        />
        {/* Honeypot field — hidden from real users, invisible to screen readers, catches bots */}
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
        />
        <RegistrationFooter />
      </div>
    </div>
  );
}
