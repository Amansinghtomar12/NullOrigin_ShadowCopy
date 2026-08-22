import { Trophy, Medal, Award } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";

/* Vector medals instead of emoji: emoji render differently on every
   platform and can't take the theme's glow, while these strokes stay
   crisp at any size and inherit each tier's metal colour. */
const TIERS = [
  {
    rank: "2nd",
    icon: <Medal className="h-[52px] w-[52px] text-[#cfd6de]" strokeWidth={1.5} />,
    variant: "podium--second",
    perks: ["TBA"],
    order: "sm:order-1",
  },
  {
    rank: "1st",
    icon: <Trophy className="h-[74px] w-[74px] text-[var(--amber)]" strokeWidth={1.5} />,
    variant: "podium--first",
    perks: ["TBA"],
    order: "sm:order-2",
  },
  {
    rank: "3rd",
    icon: <Award className="h-[52px] w-[52px] text-[#d99559]" strokeWidth={1.5} />,
    variant: "podium--third",
    perks: ["TBA"],
    order: "sm:order-3",
  },
];

/**
 * Podium layout: first place stands centre and taller, flanked by second
 * and third — the shape everyone already knows from a medal ceremony, so
 * the hierarchy needs no reading. On phones it collapses to rank order,
 * champion first.
 */
export default function Prizes() {
  return (
    <section id="prizes" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            tag="Rewards"
            title="Prize Pool"
            sub="Yet to be announced, but expect some exciting rewards for the top solvers!"
          />
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5 mt-14 items-end max-w-3xl mx-auto">
          {TIERS.map((t, i) => (
            <Reveal key={t.rank} delay={i * 90} className={t.order}>
              <div className={`podium glass glass-hover ${t.variant}`}>
                <div className={`podium__medal ${t.variant === "podium--first" ? "podium__medal--lg" : ""}`} aria-hidden="true">
                  {t.icon}
                </div>
                <p className="podium__rank">{t.rank} place</p>
                <ul className="podium__perks">
                  {t.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="text-center text-[14px] text-[var(--faint)] mt-8">
            Additional category prizes and special mentions for top solvers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
