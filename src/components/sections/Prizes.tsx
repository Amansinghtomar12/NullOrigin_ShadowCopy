import React from "react";
import { Reveal, SectionHeading } from "../ui";
import PodiumMedal from "./PodiumMedal";

/* After the event, crown the podium by filling in `team` — the card then
   shows the winning team's name above the rank, and nothing else needs
   touching. These prizes go to the Grand Finale's final standings. */
const TIERS: {
  rank: string;
  icon: React.ReactNode;
  variant: string;
  team?: string;
  perks: string[];
  order: string;
}[] = [
  /* The champion leads the DOM so phones (and screen readers) meet the
     podium in rank order; the sm:order classes rebuild the ceremony
     shape — silver left, gold centre, bronze right — on wider screens. */
  {
    rank: "1st",
    icon: <PodiumMedal tier="gold" rank={1} size={104} />,
    variant: "podium--first",
    perks: [
      "$500 Render cloud credits",
      "1-year OffSec Proving Grounds Practice access",
      "CRTP voucher by Altered Security",
      "INE Learning Path + Certificate — any one domain",
      "CPPT — Certified Practical Penetration Tester by CyberHX, worth $99",
      "MITRE ATT&CK lab access by CyberHX",
      "Internship opportunity with CyberHX",
    ],
    order: "sm:order-2",
  },
  {
    rank: "2nd",
    icon: <PodiumMedal tier="silver" rank={2} size={78} />,
    variant: "podium--second",
    perks: [
      "$300 Render cloud credits",
      "1-year OffSec Proving Grounds Practice access",
      "INE Learning Path + Certificate — any one domain",
      "CPPT — Certified Practical Penetration Tester by CyberHX, worth $99",
      "MITRE ATT&CK lab access by CyberHX",
      "Internship opportunity with CyberHX",
    ],
    order: "sm:order-1",
  },
  {
    rank: "3rd",
    icon: <PodiumMedal tier="bronze" rank={3} size={78} />,
    variant: "podium--third",
    perks: [
      "$100 Render cloud credits",
      "1-year OffSec Proving Grounds Practice access",
      "INE Learning Path + Certificate — any one domain",
      "CPPT — Certified Practical Penetration Tester by CyberHX, worth $99",
      "MITRE ATT&CK lab access by CyberHX",
      "Internship opportunity with CyberHX",
    ],
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
            sub="A pool worth ₹10 Lakh+ in total — premium cybersecurity training, certifications, hands-on labs, cloud credits and career opportunities from CyberHX and our official partners."
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
            These prizes crown the Grand Finale&rsquo;s top three — the 12-hour Qualifier decides
            who gets to fight for them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
