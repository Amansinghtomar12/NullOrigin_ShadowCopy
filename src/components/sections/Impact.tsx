import { Ref, ReactNode } from "react";
import { Users, Target, Layers, Clock, Globe, Trophy } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { useCountUp } from "../../hooks/useCountUp";

const STATS = [
  { icon: <Users className="h-5 w-5" />, val: "4000+", label: "Expected players" },
  { icon: <Target className="h-5 w-5" />, val: "30+", label: "Challenges" },
  { icon: <Layers className="h-5 w-5" />, val: "6", label: "Attack domains" },
  { icon: <Clock className="h-5 w-5" />, val: "24h", label: "Across 2 rounds" },
  { icon: <Globe className="h-5 w-5" />, val: "Global", label: "Reach" },
  { icon: <Trophy className="h-5 w-5" />, val: "₹50K+", label: "Prize pool" },
];

/** One stat tile; the figure counts up the first time it scrolls in. */
function Stat({ icon, val, label }: { icon: ReactNode; val: string; label: string }) {
  const { ref, display } = useCountUp(val);
  return (
    <div className="tilt3d h-full">
      <div className="tilt3d__inner glass glass-hover rounded-[var(--radius)] p-5 text-center h-full">
        <div className="text-red-400 flex justify-center mb-3">{icon}</div>
        <p ref={ref as Ref<HTMLParagraphElement>} className="data-num text-[30px]">
          {display}
        </p>
        <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--faint)] mt-1.5">{label}</p>
      </div>
    </div>
  );
}

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
              <Stat icon={s.icon} val={s.val} label={s.label} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="text-center text-[14px] text-[var(--muted)] mt-7 max-w-2xl mx-auto">
            Audience makeup: penetration testers, security engineers, CTF competitors, university
            students and independent researchers.{" "}
            <span className="text-[var(--faint)]">Projections based on programme scope and community size.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
