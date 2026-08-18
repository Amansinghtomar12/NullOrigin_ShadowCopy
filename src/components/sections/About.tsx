import { Users, ArrowUpRight, Terminal } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { ORG_SITE } from "../../constants";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            center={false}
            tag="About"
            title={<>What is <span className="text-red-500">Null Origin</span>?</>}
          />
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start mt-10">
          <Reveal>
            <div className="space-y-5">
              <p className="text-[var(--text)]/90 leading-relaxed">
                Null Origin is a premier online Capture The Flag competition organised by{" "}
                <span className="text-red-400 font-semibold">Team CyberXoX</span> and powered by{" "}
                <span className="text-red-400 font-semibold">CyberHX</span>. Over 24 hours, teams
                race across six attack domains to exploit vulnerabilities, break ciphers, reverse
                binaries and recover forensic evidence.
              </p>
              <p className="lead">
                Designed for everyone from seasoned pentesters to first-time competitors, it is a
                place to sharpen offensive skills, learn new techniques, and connect with the wider
                security community.
              </p>
              <div className="pt-2">
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-[var(--faint)] mb-3">
                  Organised by
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="chip !py-2.5 !px-3.5 text-[var(--text)]">
                    <Users className="h-4 w-4 text-red-500" /> Team CyberXoX
                  </span>
                  <a
                    href={ORG_SITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip !py-2.5 !px-3.5 text-[var(--text)] hover:border-red-700/50 transition-colors"
                  >
                    <img
                      src="/mask.png"
                      alt=""
                      className="h-4 w-4 object-contain"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />{" "}
                    CyberHX <ArrowUpRight className="h-3 w-3 text-[var(--faint)]" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass rounded-[var(--radius)] p-5 sm:p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400/90">
                <Terminal className="h-3.5 w-3.5" /> intel_briefing
              </div>
              <div className="mt-4 rounded-xl border border-[var(--line)] bg-black/50 p-4 font-mono text-[11.5px] leading-relaxed text-emerald-300/85 space-y-1.5">
                <p><span className="text-red-500">root@nullorigin</span>:~$ cat mission.txt</p>
                <p className="text-[var(--faint)]">────────────────────────────</p>
                <p>MISSION ··· Infiltrate. Exploit. Capture.</p>
                <p>DOMAINS ··· Crypto · Web · Rev · OSINT · Forensics · Pwn</p>
                <p>TEAM ······ 1–4 operators</p>
                <p>FORMAT ···· Jeopardy · 24 hours · online</p>
                <p>LEVEL ····· Easy → Expert</p>
                <p className="text-[var(--faint)]">────────────────────────────</p>
                <p className="text-emerald-400">
                  STATUS ···· REGISTRATIONS OPEN <span className="animate-pulse">▌</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
