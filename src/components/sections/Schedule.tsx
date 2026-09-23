import { ReactNode } from "react";
import { Users, Zap, Clock, Award, Check } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { FinalePhase, useFinale } from "../../hooks/useFinale";

interface Milestone {
  date: string;
  title: string;
  desc: string;
  icon: ReactNode;
  active?: boolean;
  done?: boolean;
}

/* Finale and results times as published on Unstop: the finale runs
   10:00 AM – 10:00 PM IST on 25 September, results at 12:00 PM IST on
   27 September. While the finale is on, the milestones behind it read as
   done and the live marker sits on the finale; otherwise the timeline
   reads as it always has. */
function timeline(finale: FinalePhase): Milestone[] {
  return [
    finale
      ? {
          date: "17 September 2026",
          title: "Registration closed",
          desc: "Teams signed up via Unstop — the field for Null Origin 2026 is set.",
          icon: <Users className="h-5 w-5" />,
          done: true,
        }
      : {
          date: "Now",
          title: "Registration open",
          desc: "Teams sign up via Unstop and prepare for the competition.",
          icon: <Users className="h-5 w-5" />,
          active: true,
        },
    finale
      ? {
          date: "18 September 2026",
          title: "Qualifier complete",
          desc: "12 hours on the board, 10:00 AM to 10:00 PM IST — the top teams earned their place in the Finale.",
          icon: <Zap className="h-5 w-5" />,
          done: true,
        }
      : {
          date: "18 September 2026",
          title: "CTF qualifier goes live",
          desc: "The platform opens at 10:00 AM IST. 12 hours to capture as many flags as possible, until 10:00 PM IST.",
          icon: <Zap className="h-5 w-5" />,
        },
    {
      date: finale === "live" ? "Live now" : finale === "soon" ? "25 September 2026 · Up next" : "25 September 2026",
      title: finale ? "The Grand Finale" : "Null Origin Finals CTF",
      desc: "The top teams from the qualifier meet on the final board for the second 12-hour round, 10:00 AM to 10:00 PM IST.",
      icon: <Clock className="h-5 w-5" />,
      active: !!finale,
    },
    {
      date: "27 September 2026",
      title: "Winners announced",
      desc: "Results go live at 12:00 PM IST — the podium is crowned and the prize pool is handed to the Finale's top three.",
      icon: <Award className="h-5 w-5" />,
    },
  ];
}

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
  const finale = useFinale();
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
          {timeline(finale).map((t, i) => (
            // Keyed by position and with a constant class on the Reveal: the
            // reveal sweep adds "in" outside React, and a remount or a
            // className rewrite when the finale flips would strip it and
            // leave the milestone invisible. The state classes ride on the
            // inner element instead — every rule for them is a descendant
            // selector.
            <Reveal
              key={i}
              delay={i * 90}
              className={`tl-item ${i % 2 ? "tl-item--right" : "tl-item--left"}`}
            >
              <div
                role="listitem"
                className={`contents ${t.active ? "tl-item--active" : ""} ${t.done ? "tl-item--done" : ""}`}
              >
                <div className="tl-node" aria-hidden="true">
                  {t.done ? <Check className="h-5 w-5" /> : t.icon}
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
