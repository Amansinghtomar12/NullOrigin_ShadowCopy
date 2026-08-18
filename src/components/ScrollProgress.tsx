import { useEffect, useRef } from "react";

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * Written straight to the DOM node via a ref rather than through state:
 * this updates on every scroll frame, and re-rendering React that often
 * would be wasteful for what is ultimately one CSS transform.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = bar.current;
      if (!el) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bar}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
