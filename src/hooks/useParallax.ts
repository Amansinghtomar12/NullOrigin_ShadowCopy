import { RefObject, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Moves every `[data-depth]` descendant of `root` against the pointer,
 * and optionally against scroll. Higher depth = moves further, which is
 * what reads as depth.
 *
 * The pointer position is eased toward rather than applied directly:
 * snapping each layer straight to the cursor looks like a twitch, while
 * a light lag reads as weight. Runs on requestAnimationFrame and writes
 * transforms directly to the nodes, so React never re-renders for it.
 */
export function useParallax(
  root: RefObject<HTMLElement | null>,
  opts: { strength?: number; scroll?: boolean; scrollFactor?: number } = {}
) {
  const { strength = 30, scroll = true, scrollFactor = 0.28 } = opts;
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;

    const layers: HTMLElement[] = Array.from(el.querySelectorAll("[data-depth]"));
    if (layers.length === 0) return;

    // target = where the pointer is, current = where we have eased to
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let scrolled = 0;
    let frame = 0;
    let idle = false;

    const step = () => {
      cx += (tx - cx) * 0.085;
      cy += (ty - cy) * 0.085;

      for (const layer of layers) {
        const depth = Number(layer.dataset.depth || 0);
        const x = cx * depth * strength;
        const y = cy * depth * (strength * 0.65) + (scroll ? scrolled * depth * scrollFactor : 0);
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }

      // Stop burning frames once the easing has effectively settled; the
      // next pointer or scroll event starts the loop again.
      if (Math.abs(tx - cx) < 0.0015 && Math.abs(ty - cy) < 0.0015) {
        frame = 0;
        idle = true;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const kick = () => {
      idle = false;
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      // Normalised to roughly -1..1 from the centre of the viewport.
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };

    const onScroll = () => {
      if (!scroll) return;
      // Only this section's own scroll range matters.
      scrolled = Math.min(window.scrollY, el.offsetHeight || 1);
      // Scroll changes y directly, so force a frame even when eased-out.
      if (idle) {
        idle = false;
        frame = requestAnimationFrame(step);
      } else {
        kick();
      }
    };

    // Pointer never leaving the window would strand the scene off-centre.
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    onScroll();
    kick();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      for (const layer of layers) layer.style.transform = "";
    };
  }, [root, strength, scroll, scrollFactor, reduced]);
}
