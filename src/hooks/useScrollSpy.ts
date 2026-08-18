import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently occupying the reading area, so
 * the navbar can mark it as current.
 *
 * Intersection ratios alone are unreliable here because the sections have
 * wildly different heights — a short section can never out-score a tall
 * one. Instead this picks the last section whose top has passed the
 * reading line, which is what a reader would call "the section I'm in".
 */
export function useScrollSpy(ids: string[], offset = 140): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = offset;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
      }

      // At the very bottom the final section may never reach the line —
      // if the page is scrolled to the end, it is the one being read.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        const last = [...ids].reverse().find((id) => document.getElementById(id));
        if (last) current = last;
      }

      setActive(current);
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
  }, [ids.join("|"), offset]);

  return active;
}
