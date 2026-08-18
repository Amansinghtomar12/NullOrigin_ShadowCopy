import { Users, Target, Layers, Clock, Globe, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";

const STATS = [
  { icon: <Users className="h-5 w-5" />, val: "500+", label: "Expected players" },
  { icon: <Target className="h-5 w-5" />, val: "30+", label: "Challenges" },
  { icon: <Layers className="h-5 w-5" />, val: "6", label: "Attack domains" },
  { icon: <Clock className="h-5 w-5" />, val: "24h", label: "Non-stop" },
  { icon: <Globe className="h-5 w-5" />, val: "Global", label: "Reach" },
  { icon: <Trophy className="h-5 w-5" />, val: "₹50K+", label: "Prize pool" },
];

export default function Impact() {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            tag="Reach & impact"
            title="Who you reach"
            sub="A focused, technical audience — exactly the people security brands want in the room."
          />
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="glass glass-hover rounded-[var(--radius)] p-5 text-center h-full">
                <div className="text-red-400 flex justify-center mb-3">{s.icon}</div>
                <p className="data-num text-[26px]">{s.val}</p>
                <p className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--faint)] mt-1.5">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="text-center text-[12.5px] text-[var(--muted)] mt-7 max-w-2xl mx-auto">
            Audience makeup: penetration testers, security engineers, CTF competitors, university
            students and independent researchers.{" "}
            <span className="text-[var(--faint)]">Projections based on programme scope and community size.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
