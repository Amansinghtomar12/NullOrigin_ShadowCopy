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
export function useScrollDepth() {
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
        el.style.setProperty("--t", t.toFixed(4));
        el.style.setProperty("--a", Math.abs(t).toFixed(4));
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

    const observe = () => {
      document.querySelectorAll<HTMLElement>(".d3").forEach((el) => io.observe(el));
    };

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
  }, [reduced]);
}
