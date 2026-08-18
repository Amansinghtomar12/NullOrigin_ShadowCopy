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

export type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ── Wowi pixel/retro design tokens ── */
export const inputClass =
  "w-full bg-[#000000] text-white border-[3px] border-[#000] px-3.5 py-3 text-[18px] font-['VT323',monospace] tracking-wider uppercase placeholder-[#7c8389] focus:outline-none focus:border-[#39ff6a] transition-colors";

export const inputErrorClass =
  "w-full bg-[#000000] text-white border-[3px] border-[#ff3355] px-3.5 py-3 text-[18px] font-['VT323',monospace] tracking-wider uppercase placeholder-[#7c8389] focus:outline-none focus:border-[#ff3355] transition-colors";

export const selectClass =
  "w-full bg-[#000000] text-white border-[3px] border-[#000] px-3.5 py-3 text-[18px] font-['VT323',monospace] tracking-wider uppercase focus:outline-none focus:border-[#39ff6a] transition-colors appearance-none cursor-pointer pr-10";

export const selectErrorClass =
  "w-full bg-[#000000] text-white border-[3px] border-[#ff3355] px-3.5 py-3 text-[18px] font-['VT323',monospace] tracking-wider uppercase focus:outline-none focus:border-[#ff3355] transition-colors appearance-none cursor-pointer pr-10";

export const errorTextClass =
  "text-[13px] text-[#ff3355] mt-0.5 normal-case tracking-normal";

export const labelClass =
  "text-[14px] text-[#7c8389] flex items-center gap-1.5 letter-spacing-[0.5px] select-none mb-1";

export const sectionHeadingClass =
  "flex items-center gap-2.5 font-['Press_Start_2P',monospace] text-[11px] text-[#ff3355] pb-2.5 border-b-[3px] border-[#000] mb-4";