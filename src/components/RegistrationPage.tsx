import React, { useRef, useState } from "react";
import { sound } from "../hooks/utils/audio";
import { FormData, initialForm, SubmitStatus, GOOGLE_SCRIPT_URL } from "./registration/types";
import { FieldErrors, validateForm, validateTeamName, validateCountry, validateLeaderName, validateEmail, validateDiscord, validateCTFtime, firstErrorMessage } from "./registration/validation";
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

    // Silent bot trap — real users never fill this hidden field.
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

    const trimmed: FormData = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    ) as unknown as FormData;

    const payload = {
      ...trimmed,
      member2Discord: trimmed.member2Discord || "",
      member2CTFtime: trimmed.member2CTFtime || "",
      member3Discord: trimmed.member3Discord || "",
      member3CTFtime: trimmed.member3CTFtime || "",
      member4Discord: trimmed.member4Discord || "",
      member4CTFtime: trimmed.member4CTFtime || "",
      timestamp: new Date().toISOString(),
    };
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
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        background: "#0a0a12",
        color: "#f4f6f5",
        fontFamily: "'VT323', monospace",
        fontSize: "20px",
        lineHeight: 1.5,
      }}
    >
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
  );
}