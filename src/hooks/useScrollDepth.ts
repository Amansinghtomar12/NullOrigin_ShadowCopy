import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Drives the scroll-linked 3D transform on every `.depth` element.
 *
 * Each element gets a normalised progress value (`--p`, 0 at the bottom
 * of the viewport, 1 once it has risen into the reading band) which CSS
 * turns into rotateX / translateZ / opacity. Doing the maths here and the
 * transform in CSS keeps the JS to one number per element per frame.
 *
 * Only elements currently on screen are measured — an IntersectionObserver
 * maintains that set, so a long page does not cost a full-document sweep
 * on every scroll frame.
 */
export function useScrollDepth() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      // Ensure nothing is left mid-transform if the setting flips on.
      document.querySelectorAll<HTMLElement>(".depth").forEach((el) => {
        el.style.setProperty("--p", "1");
      });
      return;
    }

    const visible = new Set<HTMLElement>();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of visible) {
        const r = el.getBoundingClientRect();
        // 0 while the top edge is still at/below the fold, reaching 1 by
        // the time it has travelled a third of the viewport upward.
        const raw = (vh - r.top) / (vh * 0.62);
        const p = Math.max(0, Math.min(1, raw));
        el.style.setProperty("--p", p.toFixed(3));
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
          else {
            visible.delete(el);
            // Past the top of the screen it should stay fully resolved,
            // not snap back to its entry pose.
            if (e.boundingClientRect.top < 0) el.style.setProperty("--p", "1");
          }
        }
        schedule();
      },
      { rootMargin: "10% 0px 10% 0px" }
    );

    const els = document.querySelectorAll<HTMLElement>(".depth");
    els.forEach((el) => io.observe(el));

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
