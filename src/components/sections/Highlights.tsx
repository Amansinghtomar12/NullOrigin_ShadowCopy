import { FormEvent, useState } from "react";
import {
  Flag, ShieldCheck, Network, Sparkles, ArrowUpRight,
  Lock, Code, Binary, Search, Fingerprint, Bug, Cpu, CheckCircle,
} from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { sound } from "../../hooks/utils/audio";
import { SAMPLE_CIPHER, isSampleFlag } from "../../constants/challenge";
import { UNSTOP_EVENT_URL } from "../../constants";

const PILLARS = [
  { icon: <Flag className="h-5 w-5" />, title: "Capture The Flag", desc: "Two rounds of Jeopardy-style battle — a 12-hour Qualifier, then a 12-hour Finale for the teams that make the cut — across six domains." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Realistic Challenges", desc: "Hand-crafted scenarios modelled on real vulnerabilities — not contrived puzzles — written by active practitioners." },
  { icon: <Network className="h-5 w-5" />, title: "Global Community", desc: "Compete alongside students, professionals and researchers worldwide, with an active Discord before, during and after." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Built To Last", desc: "Run on a custom, security-hardened platform engineered for fair play, integrity and a smooth competitor experience." },
];

const DOMAINS = [
  { icon: <Lock className="h-4 w-4" />, name: "Cryptography", desc: "Ciphers, hashes, RSA & encryption." },
  { icon: <Code className="h-4 w-4" />, name: "Web Exploitation", desc: "SQLi, XSS, SSRF, IDOR." },
  { icon: <Binary className="h-4 w-4" />, name: "Reverse Engineering", desc: "Disassemble & uncover logic." },
  { icon: <Search className="h-4 w-4" />, name: "OSINT", desc: "Track digital footprints." },
  { icon: <Fingerprint className="h-4 w-4" />, name: "Forensics", desc: "Memory, disk & network artifacts." },
  { icon: <Bug className="h-4 w-4" />, name: "Binary Exploitation", desc: "Overflows, ROP — own the box." },
];

function SampleChallenge() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const verify = (e: FormEvent) => {
    e.preventDefault();
    if (isSampleFlag(input)) {
      setStatus("correct");
      sound.playSuccess();
    } else {
      setStatus("incorrect");
      sound.playError();
      setTimeout(() => setStatus("idle"), 2500);
    }
  };
  return (
    <div className="glass rounded-[var(--radius)] h-full overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--line)]">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-400/90 flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5" /> Sample challenge
        </span>
        <span className="font-mono text-[11px] tracking-[0.16em] px-2 py-0.5 rounded bg-amber-900/25 text-amber-400 border border-amber-800/40">
          EASY
        </span>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-[15px] text-[var(--muted)]">Decrypt the transmission to capture the flag.</p>
        <div className="rounded-xl border border-[var(--line)] bg-[rgba(10,3,7,0.42)] p-3.5 font-mono text-[13px] text-emerald-300 break-all select-all tracking-wide">
          {SAMPLE_CIPHER}
        </div>
        <form onSubmit={verify} className="space-y-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); sound.playKey(); }}
            placeholder="flag{...}"
            autoComplete="off"
            spellCheck={false}
            className={`w-full rounded-xl bg-[rgba(10,3,7,0.35)] border px-3.5 py-2.5 text-[13px] text-white placeholder-[var(--faint)] font-mono transition-all focus:outline-none ${
              status === "incorrect"
                ? "border-red-700"
                : status === "correct"
                ? "border-emerald-700"
                : "border-[var(--line)] focus:border-red-600"
            }`}
          />
          <button type="submit" className="btn btn-ghost w-full !py-2.5">Verify flag</button>
        </form>
        {status === "correct" && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[13px] text-emerald-400 font-semibold bg-emerald-950/25 border border-emerald-800/40 p-3 rounded-xl">
              <CheckCircle className="h-4 w-4" /> Flag accepted — nicely done.
            </div>
            {/* The reward for solving: the door to the real competition. */}
            <a
              href={UNSTOP_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full !py-2.5 !text-[15px]"
              onMouseEnter={() => sound.playHover()}
            >
              You're ready — register on Unstop <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
        {status === "incorrect" && (
          <div className="flex items-center gap-2 text-[13px] text-red-400 bg-red-950/25 border border-red-900/40 p-2.5 rounded-xl font-mono">
            ✗ Not quite — hint: ROT13.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Highlights() {
  return (
    <section id="highlights" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            tag="Why it matters"
            title="Event Highlights"
            sub="A serious competition with the polish of a professional security conference."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="glass glass-hover rounded-[var(--radius)] p-6 h-full">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-[18px] tracking-wide text-white mt-4">{p.title}</h3>
                <p className="text-[15px] text-[var(--muted)] leading-relaxed mt-2">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid lg:grid-cols-12 gap-6 mt-6">
          <Reveal className="lg:col-span-7">
            <div className="glass rounded-[var(--radius)] p-6 h-full">
              <p className="eyebrow">Challenge domains</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {DOMAINS.map((d) => (
                  <div key={d.name} className="d3 flex items-start gap-3 rounded-xl border border-[var(--line)] bg-white/[0.015] p-3.5 transition-colors hover:border-red-700/40">
                    <div className="grid place-items-center h-9 w-9 rounded-lg bg-white/[0.03] text-red-400 shrink-0">
                      {d.icon}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-white tracking-wide">{d.name}</p>
                      <p className="text-[13px] text-[var(--faint)] mt-0.5">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <SampleChallenge />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
