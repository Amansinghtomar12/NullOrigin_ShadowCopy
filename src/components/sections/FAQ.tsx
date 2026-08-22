import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { sound } from "../../hooks/utils/audio";

const FAQS = [
  { q: "Is it really 24 hours non-stop?", a: "No — it's 24 hours of competition split into two 12-hour rounds. Round one is the online Qualifier on 18 September. The top teams then advance to the 12-hour Grand Finale on 25–26 September. Nobody plays a full day straight." },
  { q: "Who can participate?", a: "Anyone — students, professionals and hobbyists from anywhere in the world. There are no restrictions." },
  { q: "Is it free to register?", a: "Yes. Null Origin CTF is completely free to enter." },
  { q: "What is the team size?", a: "1 to 4 members per team. Solo participation is also welcome." },
  { q: "Do I need prior CTF experience?", a: "Not at all. Challenges range from Easy to Expert, so it is friendly to newcomers and rewarding for veterans." },
  { q: "Can organisations sponsor or partner?", a: "Absolutely. Title, Gold and Community tiers are open now — email partners@cyberhx.com and we will share the full brief." },
  { q: "Where does the competition run?", a: "On a dedicated, security-hardened CTF platform — entirely separate from this showcase page." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="shell max-w-3xl">
        <Reveal><SectionHeading tag="Support" title="Frequently Asked" /></Reveal>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="glass rounded-[var(--radius-sm)] overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                  onClick={() => { setOpen(open === i ? null : i); sound.playClick(); }}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[15px] font-semibold text-white">{f.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      open === i ? "rotate-180 text-red-500" : "text-[var(--faint)]"
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className={`faq-body ${open === i ? "faq-body--open" : ""}`}
                >
                  <div>
                    <p className="px-5 pb-5 text-[15px] text-[var(--muted)] leading-relaxed border-t border-[var(--line)] pt-4">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
