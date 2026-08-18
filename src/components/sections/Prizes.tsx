import { Reveal, SectionHeading } from "../ui";

const TIERS = [
  { rank: "1st", prize: "", icon: "🏆", featured: true },
  { rank: "2nd", prize: "", icon: "🥈", featured: false },
  { rank: "3rd", prize: "", icon: "🥉", featured: false },
];

export default function Prizes() {
  return (
    <section id="prizes" className="section">
      <div className="shell max-w-4xl">
        <Reveal>
          <SectionHeading
            tag="Rewards"
            title="Prize Pool"
            sub="Yet to be announced, but expect some exciting rewards for the top solvers!"
          />
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5 mt-12 items-stretch">
          {TIERS.map((t, i) => (
            <Reveal key={t.rank} delay={i * 80}>
              <div
                className={`glass glass-hover rounded-[var(--radius)] p-7 text-center h-full ${
                  t.featured ? "sm:-mt-3 sm:pb-9" : ""
                }`}
                style={t.featured ? { borderColor: "rgba(245,158,11,0.3)" } : undefined}
              >
                <div className="text-4xl mb-3">{t.icon}</div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--faint)]">
                  {t.rank} place
                </p>
                <p className="data-num text-[30px] mt-2">{t.prize}</p>
                <p className="text-[11px] text-[var(--muted)] mt-3">+ Certificate + Swag</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="text-center text-[11.5px] text-[var(--faint)] mt-7">
            Additional category prizes and special mentions for top solvers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
