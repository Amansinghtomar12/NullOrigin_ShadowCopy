import { useEffect, useRef, useState } from "react";

/**
 * Gold embers drifting up through the hero while the finale is on — the
 * one piece of pure celebration in the finale dressing.
 *
 * Plain spans on a CSS loop (transform and opacity only, so it stays on
 * the compositor), paused whenever the hero is scrolled out of view.
 * Each ember's lane, size, speed and delay come from a fixed table
 * rather than Math.random(), so the scene is the same on every render.
 * Phones get half the count; reduced motion gets none.
 */
const EMBERS = [
  [6, 3, 9.5, 0], [14, 2, 12, 3.1], [22, 4, 10.5, 6.4], [31, 2, 13, 1.2],
  [39, 3, 11, 7.8], [47, 2, 9, 4.6], [55, 4, 12.5, 2.2], [63, 2, 10, 8.9],
  [71, 3, 13.5, 5.3], [79, 2, 9.8, 0.7], [86, 4, 11.8, 3.9], [93, 2, 12.2, 7.1],
  [10, 2, 14, 9.6], [35, 3, 10.2, 10.4], [59, 2, 13.2, 11.2], [83, 3, 9.2, 12.3],
];

export default function FinaleEmbers() {
  const box = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`finale-embers ${visible ? "" : "finale-embers--paused"}`} aria-hidden="true">
      {EMBERS.map(([x, size, dur, delay], i) => (
        <span
          key={i}
          style={{
            left: `${x}%`,
            // The glow is drawn inside the box, so the box is 4x the ember.
            width: size * 4,
            height: size * 4,
            animationDuration: `${dur}s`,
            animationDelay: `-${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
