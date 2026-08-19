import { FormData, FIELD_MAX } from "./types";

/* ── Regex patterns ── */
// RFC-5322-lite email check — good balance of strictness vs false negatives
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Discord handles: the current format (2-32 chars of a-z 0-9 . _) or the
// legacy Name#1234 form. Case-insensitive so people can paste either.
const DISCORD_RE = /^(?:[a-zA-Z0-9._]{2,32}|[^#@:\s]{2,32}#\d{4})$/;

// Very common "throwaway"/disposable domains — soft block to cut down junk signups
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com",
  "yopmail.com", "trashmail.com", "throwawaymail.com", "fakeinbox.com",
]);

export type FieldErrors = Partial<Record<keyof FormData, string>>;

/**
 * Trim, drop control characters and zero-width/bidi tricks, and collapse
 * runs of whitespace. Every validator sees input only through this, so a
 * value that "looks empty" (all zero-width) is empty.
 */
export const clean = (v: string) =>
  v
    .replace(/[\u0000-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export function validateTeamName(value: string): string {
  const v = clean(value);
  if (!v) return "Team name is required.";
  if (v.length < 2) return "Team name must be at least 2 characters.";
  if (v.length > FIELD_MAX.teamName) return "Team name must be under 50 characters.";
  if (/[<>]/.test(v)) return "Team name can't contain < or >.";
  if (/https?:\/\/|www\./i.test(v)) return "Team name can't be a link.";
  return "";
}

export function validateCountry(value: string): string {
  const v = clean(value);
  if (!v) return "Please select your country.";
  if (v.length > FIELD_MAX.country) return "Invalid country.";
  return "";
}

export function validateLeaderName(value: string): string {
  const v = clean(value);
  if (!v) return "Full name is required.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  if (v.length > FIELD_MAX.leaderName) return "Name must be under 60 characters.";
  // Unicode letters and marks, so names from any script pass — plus the
  // separators real names use. Digits, emoji and markup do not.
  if (!/^[\p{L}\p{M}\s.'’-]+$/u.test(v)) return "Name contains invalid characters.";
  return "";
}

export function validateEmail(value: string): string {
  const v = clean(value);
  if (!v) return "Email is required.";
  if (v.length > FIELD_MAX.leaderEmail) return "Email is too long.";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address (e.g. name@domain.com).";
  const [local, domain] = v.split("@");
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return "Enter a valid email address (e.g. name@domain.com).";
  }
  if (domain && DISPOSABLE_DOMAINS.has(domain.toLowerCase())) {
    return "Disposable email addresses aren't allowed — use a real inbox.";
  }
  return "";
}

// Optional for every member — but if something is entered, it has to
// actually be a Discord handle.
export function validateDiscord(value: string): string {
  const v = clean(value);
  if (!v) return "";
  if (v.length > FIELD_MAX.member1Discord) return "Discord username is too long.";
  if (!DISCORD_RE.test(v)) return "Enter a valid Discord username (e.g. operator_01 or Name#1234).";
  return "";
}

// Optional — but if something is entered, it has to be a ctftime.org link.
export function validateCTFtime(value: string): string {
  const v = clean(value);
  if (!v) return "";
  if (v.length > FIELD_MAX.member1CTFtime) return "CTFtime link is too long.";
  try {
    const url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    const host = url.hostname.toLowerCase();
    if (host !== "ctftime.org" && !host.endsWith(".ctftime.org")) {
      return "Enter a ctftime.org link (e.g. ctftime.org/user/12345).";
    }
  } catch {
    return "Enter a valid ctftime.org link.";
  }
  return "";
}

/**
 * Validates the whole form. Team size is 1-4 members: only the team info
 * and team leader fields are required. Every member's Discord/CTFtime is
 * optional, but values that are present must be well-formed and no two
 * members may share the same handle or profile.
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

  const seenDiscord = new Map<string, number>();
  const seenCTFtime = new Map<string, number>();

  for (let n = 1; n <= 4; n++) {
    const dKey = `member${n}Discord` as keyof FormData;
    const cKey = `member${n}CTFtime` as keyof FormData;

    const dErr = validateDiscord(form[dKey] as string);
    if (dErr) errors[dKey] = dErr;

    const cErr = validateCTFtime(form[cKey] as string);
    if (cErr) errors[cKey] = cErr;

    // Duplicate handles across members are a paste mistake — catch them.
    const dVal = clean(form[dKey] as string).toLowerCase();
    if (dVal && !dErr) {
      const prev = seenDiscord.get(dVal);
      if (prev) errors[dKey] = `Same Discord username as member ${prev}.`;
      else seenDiscord.set(dVal, n);
    }
    const cVal = clean(form[cKey] as string).toLowerCase().replace(/\/+$/, "");
    if (cVal && !cErr) {
      const prev = seenCTFtime.get(cVal);
      if (prev) errors[cKey] = `Same CTFtime profile as member ${prev}.`;
      else seenCTFtime.set(cVal, n);
    }
  }

  return errors;
}

export function firstErrorMessage(errors: FieldErrors): string {
  const first = Object.values(errors)[0];
  return first || "Please fix the highlighted fields and try again.";
}
