import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Drifting node network — the red "plexus" backdrop.
 *
 * Nodes wander and a line is drawn between any pair close enough, faded
 * by distance, so the mesh continuously forms and dissolves.
 *
 * Scrolling nudges the whole field a little, which is what makes the
 * backdrop feel alive rather than a wallpaper — but the nudge is a small
 * fraction of the scroll distance and is applied to the nodes themselves
 * rather than by speeding the animation up. A backdrop that accelerates
 * with scroll velocity is exactly what makes this kind of effect
 * dizzying; a gentle constant offset does not.
 *
 * Nodes carry a z depth used only for size and brightness, which gives
 * the mesh volume without moving anything toward the camera.
 *
 * Cost: linking is O(n²), so the node count is capped and scaled to the
 * viewport. At the cap that is ~7k distance checks a frame, which is
 * cheap next to the drawing itself.
 */

const MAX_NODES = 190;
const LINK_DIST = 150;
const SPEED = 0.34;

type Node = { x: number; y: number; vx: number; vy: number; z: number };

export default function NetworkField({ className = "" }: { className?: string }) {
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
    let nodes: Node[] = [];
    let frame = 0;
    let px = 0;
    let py = 0;
    let cx = 0;
    let cy = 0;
    let lastScroll = window.scrollY;

    const populate = () => {
      const target = Math.max(34, Math.min(MAX_NODES, Math.round((w * h) / 9000)));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        z: 0.35 + Math.random() * 0.65,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = cv.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // The whole mesh leans a little toward the pointer. Eased, and only
      // a few pixels, so it reads as parallax rather than as the page
      // moving under you.
      cx += (px * 16 - cx) * 0.04;
      cy += (py * 12 - cy) * 0.04;

      // Scroll drags the field along at a fraction of the page's own
      // travel. Applied to node coordinates so the link geometry stays
      // consistent and the existing wrap keeps handling the edges.
      const sy = window.scrollY;
      const drag = (sy - lastScroll) * 0.06;
      lastScroll = sy;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy - drag;
        // Wrap rather than bounce: bouncing makes the motion read as
        // rhythmic and draws the eye to the edges.
        if (n.x < -30) n.x = w + 30;
        if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = h + 30;
        if (n.y > h + 30) n.y = -30;
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const bn = nodes[j];
          const dx = a.x - bn.x;
          const dy = a.y - bn.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const t = 1 - Math.sqrt(d2) / LINK_DIST;
          ctx.strokeStyle = `rgba(255, 46, 78, ${(t * 0.42 * ((a.z + bn.z) / 2)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x + cx * a.z, a.y + cy * a.z);
          ctx.lineTo(bn.x + cx * bn.z, bn.y + cy * bn.z);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const r = 0.8 + n.z * 1.7;
        ctx.fillStyle = `rgba(255, 92, 116, ${(0.28 + n.z * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x + cx * n.z, n.y + cy * n.z, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      render();
    };

    const onPointer = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };

    resize();

    if (reduced) {
      render();
    } else {
      frame = requestAnimationFrame(loop);
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
