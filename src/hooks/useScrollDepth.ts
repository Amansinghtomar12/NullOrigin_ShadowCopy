import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Drives the scroll-linked 3D pose of every `.d3` element.
 *
 * The pose is keyed to where the element sits relative to the middle of
 * the viewport, not to whether it has "entered" — so it is a continuous
 * pivot rather than a one-shot entrance:
 *
 *   below the middle   →  t = +1   lying back, pushed away
 *   at the middle      →  t =  0   square on, full size, sharp
 *   above the middle   →  t = -1   tipped the other way, pushed away
 *
 * An entrance animation was the wrong model here. Sections are taller
 * than the viewport, so a one-shot on the wrapper finished while the
 * section's empty top padding was crossing the fold and everything was
 * already flat by the time its content was on screen. Keying to distance
 * from centre means the thing you are actually reading is always the
 * thing that is moving.
 *
 * Two custom properties are written per element: `--t` (signed, for
 * direction) and `--a` (absolute, for magnitude). CSS cannot portably
 * take abs() yet, and computing it here is free.
 */
export function useScrollDepth(dep?: unknown) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      document.querySelectorAll<HTMLElement>(".d3").forEach((el) => {
        el.style.setProperty("--t", "0");
        el.style.setProperty("--a", "0");
      });
      return;
    }

    const visible = new Set<HTMLElement>();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      // Full tilt is reached a little beyond the viewport edge, so nothing
      // is at its extreme pose while still comfortably readable.
      const reach = window.innerHeight * 0.72;

      for (const el of visible) {
        const r = el.getBoundingClientRect();
        const centre = r.top + r.height / 2;
        const t = Math.max(-1, Math.min(1, (centre - mid) / reach));
        const a = Math.abs(t);
        el.style.setProperty("--t", t.toFixed(4));
        el.style.setProperty("--a", a.toFixed(4));
        // A tilted plane projects beyond its layout box, and a section
        // rotating in from below can invisibly overhang the links at the
        // foot of the panel above it, eating their clicks. Two defences:
        // stack by proximity to the reading line, and — because z-index
        // cannot cross the sections' stacking contexts — make any plane
        // tipped well away from the reading line transparent to input
        // entirely. Nobody is clicking inside a panel they are not
        // reading; by the time they scroll to it, it is interactive
        // again.
        el.style.zIndex = String(100 - Math.round(a * 90));
        el.style.pointerEvents = a > 0.5 ? "none" : "";
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        schedule();
      },
      // Generous margin so an element is already posed correctly before
      // it becomes visible, rather than snapping on arrival.
      { rootMargin: "40% 0px 40% 0px" }
    );

    /**
     * Hand-tagging every card was leaving gaps — whole grids sat flat
     * because they lived inside one block-level Reveal. Instead, adopt
     * every content panel that is not already posed.
     *
     * Elements that already sit inside a `.d3` are skipped: nested 3D
     * compounds, and a card rotating inside a rotating wrapper reads as
     * a glitch rather than depth. Fixed chrome (navbar, back-to-top) is
     * outside these roots and is never adopted — transforming a fixed
     * element would tear it off its anchor.
     */
    const adopt = () => {
      const roots = document.querySelectorAll<HTMLElement>("main, footer, aside[aria-label]");
      for (const root of roots) {
        root.querySelectorAll<HTMLElement>(".glass, .slot, .tilt3d").forEach((el) => {
          el.classList.add("d3");
        });
      }

      // Keep only the innermost pose on any branch. Nested 3D compounds —
      // a card rotating inside a rotating wrapper reads as a glitch — and
      // posing the inner item is also the more granular, better-looking
      // choice: a grid of cards fans individually instead of the whole
      // panel swinging as one slab.
      document.querySelectorAll<HTMLElement>(".d3").forEach((el) => {
        if (el.querySelector(".d3")) el.classList.remove("d3");
      });
    };

    const observe = () => {
      document.querySelectorAll<HTMLElement>(".d3").forEach((el) => io.observe(el));
    };

    adopt();
    observe();
    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced, dep]);
}
