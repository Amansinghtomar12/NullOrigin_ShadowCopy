import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { sound } from "../hooks/utils/audio";

/**
 * Opening sequence: a live breach that decrypts itself line by line,
 * fills a progress meter, then blows the door open and flies the viewer
 * through into the page.
 *
 * Runs on every load, so it is deliberately short (~3.4s) and skippable
 * at any instant with a click, Esc, Enter or Space. Skipped outright when
 * the visitor prefers reduced motion.
 */

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEF";

const LINES = [
  { text: "./nullorigin --breach --target=n0de00", tag: "EXEC" },
  { text: "resolving nullorigin.cyberhx.com", tag: "OK" },
  { text: "tunnel negotiated · AES-256-GCM", tag: "OK" },
  { text: "mounting 30 challenge nodes", tag: "OK" },
  { text: "arming six attack domains", tag: "OK" },
  { text: "operator credentials verified", tag: "OK" },
];

const LINE_MS = 300;
const SCRAMBLE_MS = 240;

/**
 * Renders text that resolves out of random glyphs, character by
 * character — the decrypt effect. Each character locks in at a staggered
 * moment, so the string appears to be solved rather than typed.
 */
function Decrypt({ text, delay }: { text: string; delay: number }) {
  const [out, setOut] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let start = 0;
    const total = SCRAMBLE_MS + text.length * 14;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start - delay) / total;
      if (t < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (t >= 1) {
        setOut(text);
        return;
      }
      const settled = Math.floor(t * text.length * 1.35);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        if (i < settled || text[i] === " ") next += text[i];
        else next += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(next);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay, reduced]);

  return <span>{out}</span>;
}

export default function BootIntro() {
  const reduced = useReducedMotion();

  // Decided before first paint so the overlay never flashes for someone
  // who should not see it at all.
  const [active, setActive] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const [shown, setShown] = useState(0);
  const [granted, setGranted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLeaving(true);
    window.setTimeout(() => setActive(false), 900);
  }, []);

  useEffect(() => {
    if (!active || reduced) return;
    let at = 260;
    LINES.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setShown(i + 1), at));
      at += LINE_MS;
    });
    timers.current.push(
      window.setTimeout(() => {
        setGranted(true);
        sound.playSuccess();
      }, at + 240)
    );
    timers.current.push(window.setTimeout(finish, at + 1250));
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [active, reduced, finish]);

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

  const pct = Math.round((shown / LINES.length) * 100);

  return (
    <div
      className={`boot ${leaving ? "boot--leaving" : ""}`}
      role="dialog"
      aria-label="Opening sequence"
      onClick={finish}
    >
      <div className="boot__grid" aria-hidden="true" />
      <div className="boot__scan" aria-hidden="true" />
      {/* Rings punch outward at the moment of entry, which is what makes
          the reveal read as a door opening rather than a fade. */}
      <div className="boot__rings" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="boot__stamp" aria-hidden="true">
        NULL ORIGIN
      </div>

      <div className="boot__panel">
        <div className="boot__bar">
          <span className="boot__dot" />
          <span>null_origin — secure shell</span>
          <span className="boot__pct">{pct}%</span>
        </div>

        <div className="boot__log">
          {LINES.slice(0, shown).map((l) => (
            <p key={l.text} className="boot__line">
              <span className="boot__prompt">›</span>
              <span className="boot__text">
                <Decrypt text={l.text} delay={0} />
              </span>
              <span className={l.tag === "OK" ? "boot__ok" : "boot__exec"}>[{l.tag}]</span>
            </p>
          ))}
          {shown < LINES.length && <span className="boot__caret" aria-hidden="true" />}
        </div>

        <div className="boot__meter" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>

        {granted && <p className="boot__granted">ACCESS GRANTED</p>}
      </div>

      <button type="button" className="boot__skip" onClick={finish}>
        Skip <kbd>Esc</kbd>
      </button>
    </div>
  );
}
