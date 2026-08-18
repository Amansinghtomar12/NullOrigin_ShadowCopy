import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Splits a display value such as "500+", "₹50K+" or "24h" into a leading
 * prefix, a number to animate, and a trailing suffix. Values with no
 * digits at all (for example "Global") animate nothing.
 */
function parse(value: string) {
  const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/s);
  if (!match) return null;
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
}

/**
 * Counts a stat up from zero the first time it scrolls into view, then
 * leaves it alone. Falls back to the literal string when the value has no
 * number in it or the visitor prefers reduced motion.
 */
export function useCountUp(value: string, durationMs = 1300) {
  const ref = useRef<HTMLElement | null>(null);
  const parsed = parse(value);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(parsed && !reduced ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let started = false;
    const { prefix, target, suffix } = parsed;
    const decimals = String(target).includes(".") ? 1 : 0;

    const run = (startedAt: number) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - startedAt) / durationMs);
        // ease-out cubic: fast start, gentle settle
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            io.disconnect();
            run(performance.now());
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    // Safety net: a stat stuck at zero reads as real data, which is worse
    // than not animating at all. If the observer has not fired by now,
    // show the true figure regardless.
    const failsafe = window.setTimeout(() => {
      if (!started) {
        started = true;
        io.disconnect();
        setDisplay(value);
      }
    }, 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, durationMs, reduced]);

  return { ref, display };
}
