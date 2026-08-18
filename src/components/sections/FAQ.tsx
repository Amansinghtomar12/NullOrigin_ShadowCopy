import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { sound } from "../../hooks/utils/audio";

const FAQS = [
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
                >
                  <span className="text-[13.5px] font-semibold text-white">{f.q}</span>
                  {open === i
                    ? <ChevronUp className="h-4 w-4 text-red-500 shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-[var(--faint)] shrink-0" />
                  }
                </button>
                {open === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-[13px] text-[var(--muted)] leading-relaxed border-t border-[var(--line)] pt-4">
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
