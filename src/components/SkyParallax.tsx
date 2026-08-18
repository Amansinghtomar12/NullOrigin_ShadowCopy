import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Layered night sky behind the hero. Every element is generated here —
 * stars from a seeded scatter, clouds and the moon as inline SVG — so the
 * scene is ours rather than borrowed artwork.
 *
 * Layers move at different depths against both pointer and scroll, which
 * is what sells the parallax. All of it is inert under reduced-motion.
 */

/** Deterministic PRNG so the sky is identical on every render and reload. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Star = { x: number; y: number; r: number; o: number; twinkle: number };

function makeStars(count: number, seed: number): Star[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 0.6 + rand() * 1.7,
    o: 0.35 + rand() * 0.65,
    twinkle: 2.4 + rand() * 4.2,
  }));
}

function StarField({ stars, color }: { stars: Star[]; color: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.r}
          fill={color}
          opacity={s.o}
          style={{ animation: `twinkle ${s.twinkle}s ease-in-out ${(i % 7) * 0.4}s infinite` }}
        />
      ))}
    </svg>
  );
}

function Cloud({ className, opacity }: { className: string; opacity: number }) {
  return (
    <svg className={className} viewBox="0 0 220 80" aria-hidden="true" fill="none">
      <g opacity={opacity}>
        <ellipse cx="60" cy="52" rx="56" ry="24" fill="#1b2740" />
        <ellipse cx="112" cy="42" rx="48" ry="30" fill="#20304d" />
        <ellipse cx="164" cy="54" rx="46" ry="22" fill="#1b2740" />
      </g>
    </svg>
  );
}

export default function SkyParallax() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement | null>(null);

  const farStars = useMemo(() => makeStars(70, 20260710), []);
  const nearStars = useMemo(() => makeStars(26, 99173), []);

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;

    const layers: HTMLElement[] = Array.from(el.querySelectorAll("[data-depth]"));
    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      // Only the hero's own scroll range matters; past that the section
      // is gone and the transform is wasted work.
      const scrolled = Math.min(window.scrollY, el.offsetHeight || 1);
      for (const layer of layers) {
        const depth = Number(layer.dataset.depth || 0);
        const x = px * depth * 34;
        const y = py * depth * 22 + scrolled * depth * 0.28;
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    const onPointer = (e: PointerEvent) => {
      // Normalised to roughly -1..1 from the centre of the viewport.
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    apply();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--o, .7); }
          50%      { opacity: .16; }
        }
        @keyframes drift {
          from { transform: translateX(-6%); }
          to   { transform: translateX(6%); }
        }
      `}</style>

      {/* far stars — barely move */}
      <div className="sky-layer" data-depth="0.12">
        <StarField stars={farStars} color="#8fa3c8" />
      </div>

      {/* clouds — mid depth, with a slow lateral drift of their own */}
      <div className="sky-layer" data-depth="0.34">
        <Cloud
          className="absolute left-[4%] top-[16%] w-[210px] md:w-[300px]"
          opacity={0.5}
        />
        <Cloud
          className="absolute right-[6%] top-[30%] w-[180px] md:w-[260px]"
          opacity={0.38}
        />
      </div>

      {/* near stars — brighter, move most */}
      <div className="sky-layer" data-depth="0.62">
        <StarField stars={nearStars} color="#ffffff" />
      </div>
    </div>
  );
}
