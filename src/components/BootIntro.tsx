import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { sound } from "../hooks/utils/audio";

/**
 * Opening sequence: a breach-in-progress terminal that types itself out,
 * lands on ACCESS GRANTED, then tears away to reveal the page.
 *
 * Rules it plays by:
 * - once per browser session, so it is an entrance and not a toll booth
 * - skippable at any moment with a click, Esc, or Enter
 * - skipped outright when the visitor prefers reduced motion
 * - scroll is locked only while it is on screen
 */

const LINES: { text: string; status?: string; delay: number }[] = [
  { text: "$ ./nullorigin --connect", delay: 260 },
  { text: "resolving nullorigin.cyberhx.com", status: "OK", delay: 300 },
  { text: "negotiating tunnel [AES-256-GCM]", status: "OK", delay: 320 },
  { text: "mounting challenge nodes ×30", status: "OK", delay: 300 },
  { text: "arming six attack domains", status: "OK", delay: 300 },
  { text: "verifying operator credentials", status: "OK", delay: 340 },
];

const SESSION_KEY = "nullorigin:booted";

export default function BootIntro() {
  const reduced = useReducedMotion();

  // Decided once, before first paint, so the overlay never flashes for
  // someone who should not see it.
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    try {
      return window.sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      // Private mode or blocked storage — show it, just do not remember.
      return true;
    }
  });

  const [shown, setShown] = useState(0);
  const [granted, setGranted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* nothing to do — the intro simply repeats next load */
    }
    setLeaving(true);
    window.setTimeout(() => setActive(false), 620);
  }, []);

  // Type the log out, then grant access, then leave.
  useEffect(() => {
    if (!active || reduced) return;
    let at = 0;
    LINES.forEach((line, i) => {
      at += line.delay;
      timers.current.push(window.setTimeout(() => setShown(i + 1), at));
    });
    timers.current.push(window.setTimeout(() => { setGranted(true); sound.playSuccess(); }, at + 380));
    timers.current.push(window.setTimeout(finish, at + 1500));
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [active, reduced, finish]);

  // Skip on Esc / Enter / Space, and lock scroll while covering the page.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        finish();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, finish]);

  if (!active) return null;

  return (
    <div
      className={`boot ${leaving ? "boot--leaving" : ""}`}
      role="dialog"
      aria-label="Opening sequence"
      onClick={finish}
    >
      <div className="boot__scan" aria-hidden="true" />

      <div className="boot__panel">
        <div className="boot__bar">
          <span className="boot__dot" />
          <span>null_origin — secure shell</span>
        </div>

        <div className="boot__log">
          {LINES.slice(0, shown).map((l) => (
            <p key={l.text} className="boot__line">
              <span>{l.text}</span>
              {l.status && <span className="boot__ok">[{l.status}]</span>}
            </p>
          ))}
          {shown < LINES.length && <span className="boot__caret" aria-hidden="true" />}
        </div>

        {granted && (
          <p className="boot__granted">
            ACCESS GRANTED
          </p>
        )}
      </div>

      <button type="button" className="boot__skip" onClick={finish}>
        Skip intro <kbd>Esc</kbd>
      </button>
    </div>
  );
}
