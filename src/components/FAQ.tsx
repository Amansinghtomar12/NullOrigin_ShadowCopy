import { useState } from "react";
import { ChevronDown, MessageCircle, Calendar, HelpCircle, Shield, Terminal, Code2, Trophy } from "lucide-react";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const FAQS = [
  { q: "WHAT IS NULL ORIGIN CTF?", a: "Null Origin is a 24-hour online Capture The Flag (CTF) competition where participants solve cybersecurity challenges across Web Security, Cryptography, Forensics, Reverse Engineering, OSINT, Binary Exploitation and Miscellaneous categories." },
  { q: "WHO CAN PARTICIPATE?", a: "Anyone! Open to students, professionals, and cybersecurity enthusiasts worldwide. Team size: 1–4 members including the team leader." },
  { q: "IS THIS AN ONLINE EVENT?", a: "Yes, Null Origin CTF is fully online. You can participate from anywhere in the world." },
  { q: "CAN I PARTICIPATE SOLO?", a: "Yes! You can register and compete solo (team of 1) or form a team of up to 4 members." },
  { q: "HOW DO I REGISTER?", a: "Click the 'Register Your Team' button on this page or visit the event on Unstop. Registration deadline is June 26, 2026." },
  { q: "WHAT CATEGORIES WILL BE INCLUDED?", a: "Web Security, Cryptography, Reverse Engineering, Digital Forensics, OSINT, Binary Exploitation, and Miscellaneous Challenges." },
  { q: "ARE THERE ANY PRIZES?", a: "Prize details will be announced soon. Stay connected on Discord and WhatsApp for updates." },
  { q: "WILL PARTICIPANTS RECEIVE CERTIFICATES?", a: "Yes! All participants will receive participation certificates. Top performers will receive special achievement certificates." },
];

const TIMELINE = [
  {
    tag: "Registration",
    label: "Registrations Open",
    date: "Now · Live",
    desc: "Secure your spot for Null Origin CTF.",
    bullets: ["Free to enter", "Team formation (1–4 members)", "Access to prep resources"],
    Icon: Shield,
    color: "#22c55e",
    dot: "#22c55e",
    done: true,
  },
  {
    tag: "Deadline",
    label: "Registration Closes",
    date: "26 Jun 2026",
    desc: "Last chance to register your team.",
    bullets: ["Team finalisation", "No registrations after deadline"],
    Icon: Calendar,
    color: "#f59e0b",
    dot: "#3b82f6",
    done: false,
  },
  {
    tag: "Round 1",
    label: "Qualifiers Begin",
    date: "11 Jul 2026 · 10:00 AM IST",
    desc: "12-hour online CTF qualifier round.",
    bullets: ["Solve challenges across all categories", "Real-time leaderboard", "Top teams qualify for Finals"],
    Icon: Terminal,
    color: "#ff3355",
    dot: "#ff3355",
    done: false,
  },
  {
    tag: "Round 1 End",
    label: "Qualifiers End",
    date: "11 Jul 2026 · 10:00 PM IST",
    desc: "Qualifier round closes. Results announced.",
    bullets: ["Scores finalised", "Finalists notified"],
    Icon: Code2,
    color: "#a855f7",
    dot: "#a855f7",
    done: false,
  },
  {
    tag: "Finale",
    label: "Final Round & Awards",
    date: "TBA",
    desc: "Top teams compete in the grand finale.",
    bullets: ["Final challenge set", "Prizes & certificates awarded", "Hall of Fame"],
    Icon: Trophy,
    color: "#f59e0b",
    dot: "#f59e0b",
    done: false,
  },
];

interface AccordionItemProps { q: string; a: string; open: boolean; onToggle: () => void; }
function AccordionItem({ q, a, open, onToggle }: AccordionItemProps) {
  return (
    <div
      className="border transition-all duration-200 cursor-pointer select-none"
      style={{
        borderColor: open ? "rgba(255, 51, 85,0.5)" : "rgba(63,63,70,0.8)",
        background: open ? "rgba(255, 51, 85,0.04)" : "rgba(9,9,11,0.7)",
      }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <span
          className="text-[12px] md:text-[13px] font-black tracking-widest transition-colors"
          style={{ fontFamily: "'Press Start 2P', monospace", color: open ? "#ff3355" : "#d4d4d8" }}
        >
          {q}
        </span>
        <ChevronDown
          className="shrink-0 h-4 w-4 transition-transform duration-300"
          style={{ color: open ? "#ff3355" : "#52525b", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      {open && (
        <div className="px-5 pb-5">
          <div className="w-full h-[1px] mb-4" style={{ background: "rgba(255, 51, 85,0.2)" }} />
          <p className="text-[12px] text-zinc-400 leading-relaxed font-sans tracking-wide uppercase">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 space-y-20">

      {/* ── TIMELINE ── */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(255, 51, 85,0.15)", border: "1px solid rgba(255, 51, 85,0.3)" }}>
            <Calendar className="h-3.5 w-3.5 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] text-red-400 tracking-widest uppercase font-black">Null Origin CTF</p>
            <h2 className="text-xl md:text-2xl font-black tracking-wider text-zinc-100" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              EVENT TIMELINE
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, rgba(255, 51, 85,0.6), rgba(63,63,70,0.3), transparent)" }} />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              const Icon = item.Icon;
              return (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* Card */}
                  <div className={`w-full md:w-[45%] ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                    <div
                      className="rounded-lg p-5 transition-all group hover:scale-[1.01]"
                      style={{
                        background: "rgba(9,9,11,0.85)",
                        border: `1px solid ${item.done ? "rgba(34,197,94,0.35)" : "rgba(63,63,70,0.6)"}`,
                        boxShadow: item.done ? "0 0 20px rgba(34,197,94,0.08)" : "none",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                          style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}>
                          <Icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                        </div>
                        <span className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase"
                          style={{ background: `${item.color}18`, border: `1px solid ${item.color}35`, color: item.color }}>
                          {item.tag}
                        </span>
                        {item.done && (
                          <span className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase"
                            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
                            ● LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] font-black tracking-wider text-zinc-100 mb-1"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}>{item.label}</p>
                      <p className="text-[11px] text-zinc-500 mb-3 font-sans">{item.desc}</p>
                      <ul className="space-y-1">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="flex items-center gap-2 text-[11px] text-zinc-500">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot + date */}
                  <div className="hidden md:flex flex-col items-center gap-2 w-[10%] shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 z-10"
                      style={{
                        background: item.dot,
                        borderColor: item.dot,
                        boxShadow: `0 0 12px ${item.dot}80`,
                      }} />
                  </div>

                  {/* Date side */}
                  <div className={`hidden md:flex w-[45%] ${isLeft ? "md:pl-10 justify-start" : "md:pr-10 justify-end"}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                      <span className="text-[13px] font-black tracking-wider"
                        style={{ color: item.color, fontFamily: "'Press Start 2P', monospace" }}>
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Mobile date */}
                  <div className="md:hidden flex items-center gap-2 mt-2">
                    <Calendar className="h-3 w-3 text-zinc-600" />
                    <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STAY CONNECTED ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(255, 51, 85,0.15)", border: "1px solid rgba(255, 51, 85,0.3)" }}>
            <MessageCircle className="h-3.5 w-3.5 text-red-500" />
          </div>
          <h2 className="text-xl font-black tracking-wider text-zinc-100" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            STAY CONNECTED
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="https://discord.gg/cyberhx" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-md text-[12px] font-black tracking-widest transition-all border uppercase"
            style={{ background: "rgba(88,101,242,0.12)", borderColor: "rgba(88,101,242,0.35)", color: "#7289da" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(88,101,242,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(88,101,242,0.12)"; }}>
            <DiscordIcon />
            Join Discord
          </a>
          <a href="https://wa.me/919569472058" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-md text-[12px] font-black tracking-widest transition-all border uppercase"
            style={{ background: "rgba(37,211,102,0.10)", borderColor: "rgba(37,211,102,0.30)", color: "#25d366" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.22)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.10)"; }}>
            <WhatsAppIcon />
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* ── FAQ ACCORDION ── */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(255, 51, 85,0.15)", border: "1px solid rgba(255, 51, 85,0.3)" }}>
            <HelpCircle className="h-3.5 w-3.5 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] text-red-400 tracking-widest uppercase font-black">Need answers?</p>
            <h2 className="text-xl md:text-2xl font-black tracking-wider text-zinc-100" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              INTEL_FAQS
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-w-4xl">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>

    </section>
  );
}