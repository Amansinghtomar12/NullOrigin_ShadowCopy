import { FormData } from "./types";

/* ── Regex patterns ── */
// RFC-5322-lite email check — good balance of strictness vs false negatives
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Very common "throwaway"/disposable domains — soft block to cut down junk signups
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com",
  "yopmail.com", "trashmail.com", "throwawaymail.com", "fakeinbox.com",
]);

export type FieldErrors = Partial<Record<keyof FormData, string>>;

const clean = (v: string) => v.trim();

export function validateTeamName(value: string): string {
  const v = clean(value);
  if (!v) return "Team name is required.";
  if (v.length < 2) return "Team name must be at least 2 characters.";
  if (v.length > 50) return "Team name must be under 50 characters.";
  return "";
}

export function validateCountry(value: string): string {
  const v = clean(value);
  if (!v) return "Please select your country.";
  return "";
}

export function validateLeaderName(value: string): string {
  const v = clean(value);
  if (!v) return "Full name is required.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-Z\s.'-]+$/.test(v)) return "Name contains invalid characters.";
  return "";
}

export function validateEmail(value: string): string {
  const v = clean(value);
  if (!v) return "Email is required.";
  if (v.length > 254) return "Email is too long.";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address (e.g. name@domain.com).";
  const domain = v.split("@")[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return "Disposable email addresses aren't allowed — use a real inbox.";
  }
  return "";
}

// Discord username and CTFtime profile are both fully optional for every
// member (including Member 1) — any value the user types is accepted as-is,
// we just guard against something absurdly long.
export function validateDiscord(value: string): string {
  const v = clean(value);
  if (!v) return "";
  if (v.length > 40) return "Discord username is too long.";
  return "";
}

export function validateCTFtime(value: string): string {
  const v = clean(value);
  if (!v) return "";
  if (v.length > 200) return "CTFtime link is too long.";
  return "";
}

/**
 * Validates the whole form. Team size is 1-4 members: only the team info
 * and team leader fields are required. Every member's Discord/CTFtime is
 * optional — no format or pairing requirements.
 */
export function validateForm(form: FormData): FieldErrors {
  const errors: FieldErrors = {};

  const teamName = validateTeamName(form.teamName);
  if (teamName) errors.teamName = teamName;

  const country = validateCountry(form.country);
  if (country) errors.country = country;

  const leaderName = validateLeaderName(form.leaderName);
  if (leaderName) errors.leaderName = leaderName;

  const leaderEmail = validateEmail(form.leaderEmail);
  if (leaderEmail) errors.leaderEmail = leaderEmail;

  for (let n = 1; n <= 4; n++) {
    const dKey = `member${n}Discord` as keyof FormData;
    const cKey = `member${n}CTFtime` as keyof FormData;

    const dErr = validateDiscord(form[dKey] as string);
    if (dErr) errors[dKey] = dErr;

    const cErr = validateCTFtime(form[cKey] as string);
    if (cErr) errors[cKey] = cErr;
  }

  return errors;
}

export function firstErrorMessage(errors: FieldErrors): string {
  const first = Object.values(errors)[0];
  return first || "Please fix the highlighted fields and try again.";
}