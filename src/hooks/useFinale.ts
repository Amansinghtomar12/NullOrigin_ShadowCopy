import { useSyncExternalStore } from "react";
import { FINALE_END, FINALE_START, QUALIFIER_END } from "../constants";

/**
 * Where the Grand Finale stands, as the page should present it:
 *
 *   "soon" — the Qualifier is over and the finale is still ahead
 *   "live" — the finale window is open
 *   null   — any other time: the site in its everyday dress
 *
 * Everything finale-specific keys off this one value, so the dressing
 * comes off by itself the moment FINALE_END passes — no redeploy.
 *
 * One store for the whole page: a single timer aimed at the next
 * boundary (not a per-second poll), re-checked whenever the tab becomes
 * visible again, because timers in background tabs and sleeping laptops
 * fire late.
 */
export type FinalePhase = "soon" | "live" | null;

const BOUNDARIES = [QUALIFIER_END, FINALE_START, FINALE_END].map((d) => d.getTime());

function phaseAt(now: number): FinalePhase {
  if (now < QUALIFIER_END.getTime() || now >= FINALE_END.getTime()) return null;
  return now < FINALE_START.getTime() ? "soon" : "live";
}

/* ?finale=soon|live|off previews a phase without waiting for the clock. */
const PREVIEW: FinalePhase | undefined = (() => {
  if (typeof window === "undefined") return undefined;
  const v = new URLSearchParams(window.location.search).get("finale");
  if (v === "soon" || v === "live") return v;
  if (v === "off") return null;
  return undefined;
})();

const compute = (): FinalePhase => (PREVIEW !== undefined ? PREVIEW : phaseAt(Date.now()));

const ORIGINAL_TITLE = typeof document !== "undefined" ? document.title : "";
const ORIGINAL_THEME =
  typeof document !== "undefined"
    ? document.querySelector('meta[name="theme-color"]')?.getAttribute("content") ?? null
    : null;

let current: FinalePhase = compute();
const listeners = new Set<() => void>();
let timer = 0;

/** The tab title the page should carry right now. */
export function pageTitle(): string {
  if (current === "live") return "● LIVE — Grand Finale · Null Origin CTF";
  if (current === "soon") return "Grand Finale · 25 Sep — Null Origin CTF";
  return ORIGINAL_TITLE;
}

/* The document-level dressing: a root attribute every finale style hangs
   off, the tab title and the mobile browser chrome colour. With the
   phase back to null all three return to exactly what index.html set. */
function applyToDocument() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (current) root.dataset.finale = current;
  else delete root.dataset.finale;
  // A hidden tab is showing the idle title; it picks this up on return.
  if (!document.hidden) document.title = pageTitle();
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme && ORIGINAL_THEME !== null) {
    theme.setAttribute("content", current ? "#ffc23c" : ORIGINAL_THEME);
  }
}

function schedule() {
  window.clearTimeout(timer);
  if (PREVIEW !== undefined || listeners.size === 0) return;
  const now = Date.now();
  const next = BOUNDARIES.find((t) => t > now);
  if (next === undefined) return;
  // setTimeout overflows past ~24.8 days; a capped wait just re-checks.
  timer = window.setTimeout(refresh, Math.min(next - now + 50, 2 ** 31 - 1));
}

function refresh() {
  const next = compute();
  if (next !== current) {
    current = next;
    applyToDocument();
    listeners.forEach((l) => l());
  }
  schedule();
}

const onVisible = () => {
  if (!document.hidden) refresh();
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) document.addEventListener("visibilitychange", onVisible);
  refresh();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    }
  };
}

// Dressed before React's first paint, so the page never flashes its
// everyday look first.
applyToDocument();

export function useFinale(): FinalePhase {
  return useSyncExternalStore(subscribe, () => current, () => null);
}
