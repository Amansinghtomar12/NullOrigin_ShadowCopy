import { Reveal, SectionHeading } from "../ui";

const TIERS = [
  {
    rank: "2nd",
    icon: "🥈",
    featured: false,
    perks: ["Certificate", "Swag"],
    order: "sm:order-1",
  },
  {
    rank: "1st",
    icon: "🏆",
    featured: true,
    perks: ["INE certificate", "Swag", "Champion title"],
    order: "sm:order-2",
  },
  {
    rank: "3rd",
    icon: "🥉",
    featured: false,
    perks: ["Certificate", "Swag"],
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
              <div className={`podium glass glass-hover ${t.featured ? "podium--first" : ""}`}>
                <div className={`podium__medal ${t.featured ? "podium__medal--lg" : ""}`} aria-hidden="true">
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
          <p className="text-center text-[13px] text-[var(--faint)] mt-8">
            Additional category prizes and special mentions for top solvers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
