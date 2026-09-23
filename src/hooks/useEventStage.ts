import { useSyncExternalStore } from "react";
import { FINALE_END, FINALE_START, QUALIFIER_END, RESULTS_AT, WINNERS } from "../constants";

/**
 * Where the event stands, as the page should present it:
 *
 *   null      — before the Qualifier closes: the everyday site
 *   "soon"    — Qualifier over, Grand Finale ahead   (gold finale dress)
 *   "live"    — the Grand Finale window is open      (gold finale dress)
 *   "results" — finale over, results not yet out: counts down to them
 *   "winners" — from the announcement on: the podium, for good
 *
 * Everything stage-specific keys off this one value, so the site moves
 * through the stages by itself — no redeploy at any boundary.
 *
 * One store for the whole page. It re-checks the clock at the next
 * boundary, but never waits more than a minute between checks, and
 * again on focus/visibility/pageshow and whenever a countdown hits zero:
 * browser timers stall while a laptop sleeps, and a single long timer
 * left a tab that slept across 22:00 dressed as "Live now" for hours.
 */
export type EventStage = "soon" | "live" | "results" | "winners" | null;

const ORDER: EventStage[] = [null, "soon", "live", "results", "winners"];
const BOUNDARIES = [QUALIFIER_END, FINALE_START, FINALE_END, RESULTS_AT].map((d) => d.getTime());

function stageAt(now: number): EventStage {
  if (now < QUALIFIER_END.getTime()) return null;
  if (now < FINALE_START.getTime()) return "soon";
  if (now < FINALE_END.getTime()) return "live";
  if (now < RESULTS_AT.getTime()) return "results";
  return "winners";
}

/** Stages that wear the gold finale dressing. */
export const isFinaleStage = (s: EventStage): s is "soon" | "live" => s === "soon" || s === "live";

/** True once the podium can be shown with names on it. */
export const hasWinners = () => Boolean(WINNERS.first && WINNERS.second && WINNERS.third);

/* ?finale=soon|live|results|winners previews a stage ahead of time. A
   preview can only look forward: once the clock has moved past the
   previewed stage the real one wins, so a preview link shared today
   cannot show "Live now" after the finale. */
const PREVIEW: EventStage | undefined = (() => {
  if (typeof window === "undefined") return undefined;
  const v = new URLSearchParams(window.location.search).get("finale");
  return v === "soon" || v === "live" || v === "results" || v === "winners" ? v : undefined;
})();

function compute(): EventStage {
  const real = stageAt(Date.now());
  if (PREVIEW !== undefined && ORDER.indexOf(PREVIEW) >= ORDER.indexOf(real)) return PREVIEW;
  return real;
}

const ORIGINAL_TITLE = typeof document !== "undefined" ? document.title : "";
const ORIGINAL_THEME =
  typeof document !== "undefined"
    ? document.querySelector('meta[name="theme-color"]')?.getAttribute("content") ?? null
    : null;

let current: EventStage = compute();
const listeners = new Set<() => void>();
let timer = 0;

/** The tab title the page should carry right now. */
export function pageTitle(): string {
  switch (current) {
    case "soon":
      return "Grand Finale · 25 Sep — Null Origin CTF";
    case "live":
      return "● LIVE — Grand Finale · Null Origin CTF";
    case "results":
      return "Results · 27 Sep — Null Origin CTF";
    case "winners":
      return hasWinners() ? `Champions: ${WINNERS.first} — Null Origin CTF 2026` : "Results — Null Origin CTF 2026";
    default:
      return ORIGINAL_TITLE;
  }
}

/* The document-level part: a root attribute the gold finale styles hang
   off (finale stages only), the tab title and the mobile browser
   chrome colour. */
function applyToDocument() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (isFinaleStage(current)) root.dataset.finale = current;
  else delete root.dataset.finale;
  // A hidden tab is showing the idle title; it picks this up on return.
  if (!document.hidden) document.title = pageTitle();
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme && ORIGINAL_THEME !== null) {
    theme.setAttribute("content", isFinaleStage(current) ? "#ffc23c" : ORIGINAL_THEME);
  }
}

function schedule() {
  window.clearTimeout(timer);
  if (listeners.size === 0) return;
  const now = Date.now();
  const next = BOUNDARIES.find((t) => t > now);
  if (next === undefined) return;
  timer = window.setTimeout(refreshStage, Math.min(next - now + 50, 60_000));
}

/** Re-reads the clock; cheap, and a no-op when the stage is unchanged. */
export function refreshStage() {
  const next = compute();
  if (next !== current) {
    current = next;
    applyToDocument();
    listeners.forEach((l) => l());
  }
  schedule();
}

const onWake = () => {
  if (!document.hidden) refreshStage();
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    document.addEventListener("visibilitychange", onWake);
    window.addEventListener("focus", onWake);
    window.addEventListener("pageshow", onWake);
  }
  refreshStage();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("focus", onWake);
      window.removeEventListener("pageshow", onWake);
    }
  };
}

// Dressed before React's first paint, so the page never flashes the
// wrong stage first.
applyToDocument();

export function useEventStage(): EventStage {
  return useSyncExternalStore(subscribe, () => current, () => null);
}
