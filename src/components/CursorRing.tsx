import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * The orbit around the reticle cursor: two broken arc rings counter-
 * rotating around the pointer, like a targeting HUD acquiring whatever
 * the visitor aims at. The crosshair itself is the real CSS cursor —
 * native, zero-lag, pixel-accurate — so this layer is pure decoration
 * and trails it on a soft spring.
 *
 * Over anything clickable the rig "locks": the arcs swell and go amber,
 * matching the pointer cursor's own amber state. Pressing tightens the
 * ring. One fixed element, transform-only updates, no layout cost.
 */

const INTERACTIVE =
  "a,button,summary,label,select,[role='button'],[role='tab'],[onclick],.btn,.chip,.cursor-pointer";

export default function CursorRing() {
  const el = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!(window.matchMedia?.("(pointer: fine)").matches ?? false)) return;
    const node = el.current;
    if (!node) return;

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let frame = 0;
    let seen = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        // First contact: appear where the pointer is, not fly in from
        // the corner.
        seen = true;
        cx = x;
        cy = y;
        node.style.opacity = "1";
      }
      const t = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      node.classList.toggle("cursor-ring--lock", !!t);
    };

    const onDown = () => node.classList.add("cursor-ring--press");
    const onUp = () => node.classList.remove("cursor-ring--press");
    const onLeave = () => {
      node.style.opacity = "0";
      seen = false;
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      cx += (x - cx) * 0.3;
      cy += (y - cy) * 0.3;
      node.style.transform = `translate3d(${(cx - 32).toFixed(1)}px, ${(cy - 32).toFixed(1)}px, 0)`;
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div ref={el} className="cursor-ring" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        {/* steady faint circle — the base of the instrument */}
        <circle cx="32" cy="32" r="24" stroke="rgba(255,51,85,0.3)" strokeWidth="1" fill="none" />
        {/* two broken arc rings, counter-rotating */}
        <g className="cr-spin-a">
          <circle
            className="cr-ink"
            cx="32" cy="32" r="27.5"
            stroke="rgba(255,23,68,0.8)" strokeWidth="1.4" fill="none"
            strokeDasharray="56 34 22 61"
          />
        </g>
        <g className="cr-spin-b">
          <circle
            className="cr-ink"
            cx="32" cy="32" r="20.5"
            stroke="rgba(255,51,85,0.6)" strokeWidth="1" fill="none"
            strokeDasharray="34 30 16 49"
          />
        </g>
      </svg>
    </div>
  );
}
