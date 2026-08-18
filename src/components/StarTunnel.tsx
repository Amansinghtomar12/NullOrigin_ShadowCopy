import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Perspective-projected star tunnel on a canvas.
 *
 * Each star is a real 3D point (x, y, z) projected to the screen with
 * `screen = focal * world / z`, so nearer stars are genuinely larger,
 * brighter and faster-moving — this is actual perspective, not a parallax
 * fake. Stars stream toward the viewer; scrolling accelerates the flight,
 * which is what makes the page feel like it has depth behind it.
 *
 * Drawn on one canvas rather than as DOM nodes: a thousand elements each
 * with their own transform would stall, whereas one canvas stays cheap.
 */

const BASE_SPEED = 0.55;
const SCROLL_BOOST = 0.05;
const MAX_SPEED = 26;
const FOCAL = 320;
const DEPTH = 900;

type Star = { x: number; y: number; z: number; pz: number; hue: number };

export default function StarTunnel({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let frame = 0;
    let speed = BASE_SPEED;
    let lastScroll = window.scrollY;
    let pointerX = 0;
    let pointerY = 0;

    // Star density scales with area so phones do not render a desktop's
    // worth of geometry for no visual gain.
    const populate = () => {
      const target = Math.min(620, Math.round((w * h) / 2600));
      stars = Array.from({ length: target }, () => spawn());
    };

    const spawn = (): Star => ({
      x: (Math.random() - 0.5) * w * 1.6,
      y: (Math.random() - 0.5) * h * 1.6,
      z: Math.random() * DEPTH + 1,
      pz: 0,
      // Mostly white, with a minority in the brand red and green.
      hue: Math.random(),
    });

    const resize = () => {
      // Cap DPR: at 3x a full-bleed canvas costs far more than it shows.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = cv.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
    };

    const colorFor = (hue: number, alpha: number) => {
      if (hue > 0.93) return `rgba(255,51,85,${alpha})`;
      if (hue > 0.84) return `rgba(57,255,106,${alpha})`;
      return `rgba(226,236,255,${alpha})`;
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);

      // Scroll velocity accelerates the tunnel, then it eases back down.
      const dy = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      speed = Math.min(MAX_SPEED, speed + dy * SCROLL_BOOST);
      speed += (BASE_SPEED - speed) * 0.045;

      ctx.clearRect(0, 0, w, h);
      // Pointer shifts the vanishing point, so the tunnel leans as you move.
      const cx = w / 2 + pointerX * w * 0.06;
      const cy = h / 2 + pointerY * h * 0.06;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;

        if (s.z < 1) {
          Object.assign(s, spawn(), { z: DEPTH });
          continue;
        }

        const k = FOCAL / s.z;
        const sx = cx + s.x * k;
        const sy = cy + s.y * k;

        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) continue;

        // Depth drives size and brightness together, which is what makes
        // the field read as receding rather than as scattered dots.
        const depth = 1 - s.z / DEPTH;
        const r = Math.max(0.25, depth * 2.3);
        const alpha = Math.min(1, depth * 1.25);

        // Above a threshold the movement per frame exceeds the dot, so
        // draw the trail instead — that is what sells warp speed.
        if (speed > 4) {
          const pk = FOCAL / s.pz;
          const px = cx + s.x * pk;
          const py = cy + s.y * pk;
          ctx.strokeStyle = colorFor(s.hue, alpha * 0.85);
          ctx.lineWidth = r;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = colorFor(s.hue, alpha);
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    resize();

    if (reduced) {
      // Draw one still frame so the hero is not an empty black band.
      speed = 0;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const k = FOCAL / s.z;
        const sx = w / 2 + s.x * k;
        const sy = h / 2 + s.y * k;
        const depth = 1 - s.z / DEPTH;
        ctx.fillStyle = colorFor(s.hue, Math.min(1, depth * 1.25));
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.25, depth * 2.3), 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      frame = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvas}
      data-star="1"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
