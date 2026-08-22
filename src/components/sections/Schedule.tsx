import { Users, Zap, Clock, Award } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";

const TIMELINE = [
  {
    date: "Now",
    title: "Registration open",
    desc: "Teams sign up via Unstop and prepare for the competition.",
    icon: <Users className="h-5 w-5" />,
    active: true,
  },
  {
    date: "18 September 2026",
    title: "CTF qualifier goes live",
    desc: "The platform opens. 12 hours to capture as many flags as possible.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    date: "25 September 2026",
    title: "Null Origin Finals CTF",
    desc: "The top teams from the qualifier meet on the final board for the second 12-hour round.",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    date: "26 September 2026",
    title: "Winners announced",
    desc: "The podium is crowned — and the rewards are revealed live.",
    icon: <Award className="h-5 w-5" />,
  },
];

/**
 * Central-spine timeline: a gradient rail down the middle with milestone
 * cards alternating left and right of it on desktop, collapsing to a
 * left rail with stacked cards on small screens. The live milestone gets
 * a filled, glowing node so "where we are" reads at a glance.
 *
 * (The old layout asked for max-w-3xl on the shell, but the unlayered
 * .shell class out-cascades Tailwind's max-width utility — the same trap
 * as the navbar's hidden buttons — so everything sat in the left third
 * of a 1200px container.)
 */
export default function Schedule() {
  return (
    <section id="schedule" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            tag="Schedule"
            title="Event Timeline"
            sub="From first sign-up to the final scoreboard."
          />
        </Reveal>

        <div className="timeline mt-14" role="list">
          {TIMELINE.map((t, i) => (
            <Reveal
              key={t.title}
              delay={i * 90}
              className={`tl-item ${i % 2 ? "tl-item--right" : "tl-item--left"} ${
                t.active ? "tl-item--active" : ""
              }`}
            >
              <div role="listitem" className="contents">
                <div className="tl-node" aria-hidden="true">
                  {t.icon}
                </div>
                <div className="tl-card">
                  <p className="tl-date">
                    {t.active && <span className="dot" aria-hidden="true" />}
                    {t.date}
                  </p>
                  <h3 className="tl-title">{t.title}</h3>
                  <p className="tl-desc">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
