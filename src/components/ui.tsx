import { ReactNode, useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let fallbackTimer: number | undefined;

    // Wait a frame so the DOM has actually painted (fonts/images can shift
    // layout right after mount) before we measure anything.
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      if (els.length === 0) return;

      if (typeof IntersectionObserver === "undefined") {
        els.forEach((e) => e.classList.add("in"));
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -5% 0px" }
      );

      els.forEach((e) => {
        // Anything already sitting inside (or just below) the viewport on
        // first paint gets revealed immediately instead of waiting on the
        // observer — this is what stops the page looking "blank" below the
        // fold when the intersection callback is slow to fire.
        const rect = e.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.15) {
          e.classList.add("in");
        } else {
          io!.observe(e);
        }
      });

      // Safety net: if for any reason an element never gets revealed
      // (observer glitch, layout shift, etc.) force it visible after a
      // few seconds so users are never stuck looking at a blank page.
      fallbackTimer = window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((e) => {
          e.classList.add("in");
        });
        io?.disconnect();
      }, 2500);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      io?.disconnect();
    };
  }, []);
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  tag,
  title,
  sub,
  center = true,
}: {
  tag: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <span className={`eyebrow ${center ? "eyebrow--center" : ""}`}>{tag}</span>
      <h2 className="h-display text-[clamp(1.7rem,4vw,2.6rem)] mt-4">{title}</h2>
      {sub && <p className="lead mt-4">{sub}</p>}
    </div>
  );
}