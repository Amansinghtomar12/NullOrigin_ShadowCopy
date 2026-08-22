import React from "react";
import { Reveal, SectionHeading } from "../ui";
import PodiumMedal from "./PodiumMedal";

/* After the event, crown the podium by filling in `team` (and optionally
   replacing the perks with the actual prizes) — the card then shows the
   winning team's name above the rank, and nothing else needs touching. */
const TIERS: {
  rank: string;
  icon: React.ReactNode;
  variant: string;
  team?: string;
  perks: string[];
  order: string;
}[] = [
  {
    rank: "2nd",
    icon: <PodiumMedal tier="silver" rank={2} size={78} />,
    variant: "podium--second",
    perks: ["TBA"],
    order: "sm:order-1",
  },
  {
    rank: "1st",
    icon: <PodiumMedal tier="gold" rank={1} size={104} />,
    variant: "podium--first",
    perks: ["TBA"],
    order: "sm:order-2",
  },
  {
    rank: "3rd",
    icon: <PodiumMedal tier="bronze" rank={3} size={78} />,
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
                {t.team && (
                  <p className="font-display text-[22px] tracking-wide text-[var(--amber)] leading-tight">
                    {t.team}
                  </p>
                )}
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
          <p className="text-center text-[15px] text-[var(--faint)] mt-8">
            Additional category prizes and special mentions for top solvers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
