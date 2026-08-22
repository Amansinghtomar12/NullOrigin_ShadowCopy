import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { sound } from "../hooks/utils/audio";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Appears once the visitor is a screen or so down the page. Hidden from
 * assistive tech and keyboard order while off-screen, so it never becomes
 * a focus trap floating over the content.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight * 0.9);
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
    <button
      type="button"
      className={`to-top ${show ? "show" : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onMouseEnter={() => sound.playHover()}
      onClick={() => {
        sound.playClick();
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={3} />
    </button>
  );
}
