import { useRef } from "react";
import { Trophy } from "lucide-react";
import {
  EVENT_WHEN,
  FINALE_CLOSES,
  FINALE_WHEN,
  REGISTER_URL,
  RESULTS_WHEN,
  SOCIALS,
  WINNERS,
} from "../constants";
import { sound } from "../hooks/utils/audio";
import { useParallax } from "../hooks/useParallax";
import { EventStage, hasWinners, isFinaleStage, useEventStage } from "../hooks/useEventStage";
import FinaleEmbers from "./FinaleEmbers";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface HomeHeroProps {
  timeLeft: TimeLeft;
}

function pillText(stage: EventStage, crowned: boolean) {
  switch (stage) {
    case "soon":
      return "Round 02 · Grand Finale";
    case "live":
      return "Grand Finale · Live now";
    case "results":
      return "Finale complete";
    case "winners":
      return crowned ? "Champions crowned" : "Results announced";
    default:
      return "Insert coin";
  }
}

/** What the countdown counts to, in words, for the timer's label and the line under it. */
function countdownCopy(stage: EventStage) {
  switch (stage) {
    case "soon":
      return { aria: "Grand Finale starts", lead: "Grand Finale starts", at: FINALE_WHEN };
    case "live":
      return { aria: "Grand Finale ends", lead: "Live now · Board closes", at: FINALE_CLOSES };
    case "results":
      return { aria: "Results are announced", lead: "Results announced", at: RESULTS_WHEN };
    default:
      return { aria: "Event starts", lead: "Qualifier opens", at: EVENT_WHEN };
  }
}

const PODIUM = [
  { rank: "1st", tier: "gold", team: WINNERS.first },
  { rank: "2nd", tier: "silver", team: WINNERS.second },
  { rank: "3rd", tier: "bronze", team: WINNERS.third },
];

export default function HomeHero({ timeLeft }: HomeHeroProps) {
  // The scene and the content drift against the pointer at different
  // depths. Content moves least — enough to feel alive, not enough to
  // make anyone chase a button.
  const scene = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  useParallax(scene, { strength: 26 });
  useParallax(content, { strength: 16, scroll: false });
  const stage = useEventStage();
  const finale = isFinaleStage(stage);
  const crowned = stage === "winners" && hasWinners();
  const after = stage === "results" || stage === "winners";
  const count = countdownCopy(stage);

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

        {finale && <FinaleEmbers />}
      </div>

      {/* ── content ── */}
      <div ref={content} className="relative z-10 shell">
        {/* Sits over the moon, so it carries its own plate — amber text on
            the amber glow was unreadable. */}
        <div data-depth="0.55" className="mb-6 flex justify-center">
          <span className="status hero-pill !text-[11px] !text-[var(--amber)] !border-[rgba(255,194,60,.45)] !bg-[rgba(255,194,60,.08)]">
            {stage === "soon" || crowned ? (
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <span
                className={`dot ${
                  stage === "live"
                    ? "!bg-[var(--red)] !shadow-[0_0_10px_var(--red)]"
                    : "!bg-[var(--amber)] !shadow-[0_0_10px_var(--amber)]"
                }`}
              />
            )}
            {pillText(stage, crowned)}
          </span>
        </div>

        <h1
          data-depth="0.9"
          tabIndex={-1}
          className="h-display title3d glitchy outline-none"
          style={{ fontSize: "clamp(46px, 7.4vw, 112px)", lineHeight: "1.04" }}
        >
          NULL
          <br />
          ORIGIN
        </h1>

        {finale && (
          <p data-depth="0.8" className="finale-mark" aria-hidden="true">
            <span className="finale-mark__rule" />
            Grand Finale
            <span className="finale-mark__rule" />
          </p>
        )}

        <p data-depth="0.65" className={`lead mx-auto max-w-[52ch] ${finale ? "mt-6" : "mt-8"}`}>
          {stage === "soon" ? (
            <>
              The Qualifier is in the books. The top teams return for the 12-hour Grand Finale —
              one board, one day, three podium spots.
            </>
          ) : stage === "live" ? (
            <>
              The Grand Finale is live — 12 hours on one board, with the podium and the prize pool
              on the line. Finalists, the arena is open.
            </>
          ) : stage === "results" ? (
            <>
              The Grand Finale is over — two rounds, 24 hours of CTF, one final board. The podium
              goes up on 27 September at 12:00 PM IST.
            </>
          ) : stage === "winners" ? (
            crowned ? (
              <>
                Null Origin 2026 is in the books. Congratulations to our champions — and to every
                team that played.
              </>
            ) : (
              <>Null Origin 2026 is in the books — thank you to every team that played.</>
            )
          ) : (
            <>
              Select your domain. Beat the clock. Capture every flag — 24 hours of CTF in two rounds:
              a 12-hour Qualifier and a 12-hour Finale.
            </>
          )}
        </p>

        <div data-depth="0.4" className="flex gap-3 justify-center mt-9 flex-wrap px-4">
          {after ? (
            <a
              href="#prizes"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="btn btn-ghost"
            >
              <Trophy className="h-[18px] w-[18px]" aria-hidden="true" /> View the podium
            </a>
          ) : (
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="btn btn-ghost"
            >
              {finale ? (
                <>
                  <Trophy className="h-[18px] w-[18px]" aria-hidden="true" /> Enter the Finale
                </>
              ) : (
                "Start game"
              )}
            </a>
          )}
          {/* The second-most-valuable click on the page goes to the
              community, not to a scroll the visitor will do anyway.
              Falls back to the old intro link if the invite empties. */}
          {(() => {
            const discord = SOCIALS.find((s) => s.name === "Discord");
            return discord?.href ? (
              <a
                href={discord.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="btn btn-discord"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[19px] w-[19px]" aria-hidden="true">
                  <path d={discord.svg} />
                </svg>
                Join Discord
              </a>
            ) : (
              <a href="#about" onMouseEnter={() => sound.playHover()} className="btn btn-ghost">
                View intro
              </a>
            );
          })()}
        </div>

        {/* One stable parallax layer for whatever sits here — the parallax
            hook collects its layers once, so a board that replaces the
            timer mid-visit must not bring its own. */}
        <div data-depth="0.25">
          {stage === "winners" ? (
            crowned ? (
              <ol className="champions glass mt-11" aria-label="Null Origin CTF 2026 Grand Finale podium">
                {PODIUM.map((p) => (
                  <li key={p.rank} className={`champion champion--${p.tier}`}>
                    <span className="champion__medal" aria-hidden="true">
                      {p.rank[0]}
                    </span>
                    <span className="champion__team">{p.team}</span>
                    <span className="champion__rank">{p.rank} place</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="champions champions--pending glass mt-11">
                <Trophy className="h-5 w-5 shrink-0 text-[var(--amber)]" aria-hidden="true" />
                <span>The winners&rsquo; names go up here shortly.</span>
              </div>
            )
          ) : (
            <div
              className="coin-counter glass inline-flex mt-11 mx-4"
              role="timer"
              aria-label={`${count.aria} in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`}
            >
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
          )}
          <p className="coin-when mx-4">
            {stage === "winners" ? (
              <>Winners announced <span className="coin-when__at">{RESULTS_WHEN}</span></>
            ) : (
              <>{count.lead} <span className="coin-when__at">{count.at}</span></>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
