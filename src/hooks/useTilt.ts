import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Gives every `.tilt3d` element real 3D rotation toward the pointer, plus
 * a specular highlight that tracks the cursor across its surface.
 *
 * Delegated from one document-level listener rather than a listener per
 * card: the page has dozens of cards, and dozens of pointermove handlers
 * is exactly how a page starts dropping frames.
 *
 * Rotation is applied to a child wrapper so it composes with whatever
 * transform the card's own hover state already uses.
 */
export function useTilt(maxDeg = 8) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      const r = el.getBoundingClientRect();
      // -0.5..0.5 from the card's own centre
      const px = (x - r.left) / r.width - 0.5;
      const py = (y - r.top) / r.height - 0.5;

      el.style.setProperty("--rx", `${(-py * maxDeg).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * maxDeg).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(((x - r.left) / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(((y - r.top) / r.height) * 100).toFixed(1)}%`);
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".tilt3d");
      if (!el) return;
      pending = { el, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Leaving must settle the card back to flat, or it stays skewed.
    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".tilt3d");
      if (!el) return;
      const to = e.relatedTarget as HTMLElement | null;
      if (to && el.contains(to)) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, [maxDeg, reduced]);
}
