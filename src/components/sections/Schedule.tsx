import { Users, Zap, Clock, Award } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";

const TIMELINE = [
  {
    date: "Now",
    title: "Registration open",
    desc: "Teams sign up via Unstop and prepare for the competition.",
    icon: <Users className="h-4 w-4" />,
    active: true,
  },
  {
    date: " 18 september 2026",
    title: "CTF qualifier goes live",
    desc: "The platform opens. 12 hours to capture as many flags as possible.",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    date: "25 september 2026",
    title: "Null Origin Finals CTF ",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    date: "26 september 2026",
    title: "Winners announced",
    desc: "Top teams receive prizes, certificates and recognition.",
    icon: <Award className="h-4 w-4" />,
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="section">
      <div className="shell max-w-3xl">
        <Reveal><SectionHeading tag="Schedule" title="Event Timeline" /></Reveal>
        <div className="mt-12">
          {TIMELINE.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className={`grid place-items-center h-11 w-11 rounded-full border ${
                      t.active
                        ? "border-red-500 bg-red-500/15 text-red-400 animate-pulse-glow"
                        : "border-[var(--line)] bg-white/[0.02] text-[var(--muted)]"
                    }`}
                  >
                    {t.icon}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 min-h-[58px] bg-gradient-to-b from-[var(--line-strong)] to-transparent" />
                  )}
                </div>
                <div className="pb-9 pt-1.5">
                  <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-red-400">
                    {t.date}
                  </span>
                  <h3 className="font-display font-bold text-[15px] tracking-wide text-white mt-1">
                    {t.title}
                  </h3>
                  <p className="text-[13px] text-[var(--muted)] mt-1">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
