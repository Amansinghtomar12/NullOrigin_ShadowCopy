import { useRef } from "react";
import { sound } from "../hooks/utils/audio";
import { useParallax } from "../hooks/useParallax";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface HomeHeroProps {
  timeLeft: TimeLeft;
  onRegister: () => void;
}

export default function HomeHero({ timeLeft, onRegister }: HomeHeroProps) {
  // The scene and the content drift against the pointer at different
  // depths. Content moves least — enough to feel alive, not enough to
  // make anyone chase a button.
  const scene = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  useParallax(scene, { strength: 26 });
  useParallax(content, { strength: 16, scroll: false });

  return (
    <section
      className="stage3d relative w-full overflow-hidden text-center"
      style={{ padding: "236px 0 56px" }}
    >
      <div ref={scene} className="absolute inset-0 z-0 pointer-events-none">
        {/* Neon grid floor receding to the horizon. Two stacked planes —
            a static one for the perspective, and a scrolling one for the
            sense of travel — with a mask so it fades out rather than
            ending on a hard line. */}
        <div className="hero-floor" data-depth="0.18">
          <div className="hero-floor__grid" />
        </div>

        {/* Horizon bloom where the floor meets the sky. */}
        <div className="hero-horizon" data-depth="0.1" />

        {/* The core: the vanishing point the tunnel streams out of. */}
        <div className="hero-core" data-depth="0.5" />
      </div>

      {/* ── content ── */}
      <div ref={content} className="relative z-10 shell">
        {/* Sits over the moon, so it carries its own plate — amber text on
            the amber glow was unreadable. */}
        <div data-depth="0.55" className="mb-6 flex justify-center">
          <span className="status !text-[11px] !text-[var(--amber)] !border-[rgba(255,194,60,.45)] !bg-[rgba(255,194,60,.08)]">
            <span className="dot !bg-[var(--amber)] !shadow-[0_0_10px_var(--amber)]" />
            Insert coin
          </span>
        </div>

        <h1
          data-depth="0.9"
          className="h-display title3d glitchy"
          style={{ fontSize: "clamp(28px,8vw,72px)", lineHeight: "1.1" }}
        >
          NULL
          <br />
          ORIGIN
        </h1>

        <p data-depth="0.65" className="lead mx-auto mt-[34px] max-w-[50ch]">
          Select your domain. Beat the clock. Capture every flag — a 24-hour CTF across six attack
          levels.
        </p>

        <div data-depth="0.4" className="flex gap-3 justify-center mt-[28px] flex-wrap px-4">
          <button
            type="button"
            onClick={() => { onRegister(); sound.playClick(); }}
            onMouseEnter={() => sound.playHover()}
            className="btn btn-primary cursor-pointer"
          >
            Start game
          </button>
          <a
            href="#about"
            onMouseEnter={() => sound.playHover()}
            className="btn btn-ghost"
          >
            View intro
          </a>
        </div>

        <div data-depth="0.25" className="coin-counter glass inline-flex mt-[36px] mx-4">
          <div className="coin">
            <div key={timeLeft.days} className="n">{timeLeft.days}</div>
            <div className="l">DAYS</div>
          </div>
          <div className="coin">
            <div key={timeLeft.hours} className="n">{timeLeft.hours}</div>
            <div className="l">HRS</div>
          </div>
          <div className="coin">
            <div key={timeLeft.minutes} className="n">{timeLeft.minutes}</div>
            <div className="l">MIN</div>
          </div>
          <div className="coin r">
            <div key={timeLeft.seconds} className="n">{timeLeft.seconds}</div>
            <div className="l">SEC</div>
          </div>
        </div>
      </div>
    </section>
  );
}