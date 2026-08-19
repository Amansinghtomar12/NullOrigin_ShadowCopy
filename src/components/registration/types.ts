export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxI8sK3VAPkyQxu9knSBii1orDbr37ZRU6zy_og9DGZsbnVH-YpWYp4ND-0YV9L9DGN2A/exec";

export interface FormData {
  teamName: string;
  country: string;
  leaderName: string;
  leaderEmail: string;
  member1Discord: string;
  member1CTFtime: string;
  member2Discord: string;
  member2CTFtime: string;
  member3Discord: string;
  member3CTFtime: string;
  member4Discord: string;
  member4CTFtime: string;
}

export const initialForm: FormData = {
  teamName: "",
  country: "",
  leaderName: "",
  leaderEmail: "",
  member1Discord: "",
  member1CTFtime: "",
  member2Discord: "",
  member2CTFtime: "",
  member3Discord: "",
  member3CTFtime: "",
  member4Discord: "",
  member4CTFtime: "",
};

/* Hard caps per field, enforced three times over: as maxLength on the
   inputs, in the validators, and again on the payload before send. */
export const FIELD_MAX: Record<keyof FormData, number> = {
  teamName: 50,
  country: 60,
  leaderName: 60,
  leaderEmail: 254,
  member1Discord: 40,
  member1CTFtime: 200,
  member2Discord: 40,
  member2CTFtime: 200,
  member3Discord: 40,
  member3CTFtime: 200,
  member4Discord: 40,
  member4CTFtime: 200,
};

export type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ── Design-system tokens (match src/index.css) ── */
const inputBase =
  "w-full rounded-xl bg-[rgba(10,3,7,0.45)] px-4 py-3 text-[15px] text-white " +
  "placeholder-[var(--faint)] transition-colors focus:outline-none border-2";

export const inputClass = `${inputBase} border-[var(--line-soft)] focus:border-[var(--amber)]`;

export const inputErrorClass = `${inputBase} border-red-500 focus:border-red-400`;

export const selectClass =
  `${inputBase} border-[var(--line-soft)] focus:border-[var(--amber)] appearance-none cursor-pointer pr-10`;

export const selectErrorClass =
  `${inputBase} border-red-500 focus:border-red-400 appearance-none cursor-pointer pr-10`;

export const errorTextClass = "text-[13px] text-red-400 mt-1";

export const labelClass =
  "font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--faint)] " +
  "flex items-center gap-1.5 select-none";

export const sectionHeadingClass =
  "flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-[0.22em] uppercase " +
  "text-[var(--accent)] pb-3 border-b-2 border-[var(--line-soft)] mb-5";
