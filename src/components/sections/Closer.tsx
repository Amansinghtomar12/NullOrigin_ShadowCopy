import { Globe, Handshake, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "../ui";
import { sound } from "../../hooks/utils/audio";
import { PARTNER_EMAIL, ORG_SITE, REGISTER_URL, SOCIALS } from "../../constants";

export default function Closer() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal>
          <div className="glass glass-strong rounded-[28px] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            <span className="status mx-auto"><span className="dot" /> Now accepting partners</span>
            <h2 className="h-display text-[clamp(1.7rem,4vw,2.6rem)] mt-5">
              Let's build <span className="text-red-500">Null Origin</span> together.
            </h2>
            <p className="lead mt-4 max-w-xl mx-auto">
              Whether you want to compete, sponsor, or partner with the community — we would love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href={`mailto:${PARTNER_EMAIL}?subject=Null%20Origin%20CTF%20—%20Sponsorship`}
                className="btn btn-primary"
                onMouseEnter={() => sound.playHover()}
              >
                <Handshake className="h-4 w-4" /> Become a sponsor
              </a>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                onMouseEnter={() => sound.playHover()}
              >
                Register your team <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-[12px] text-[var(--muted)]">
              <a
                href={`mailto:${PARTNER_EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-red-500" /> {PARTNER_EMAIL}
              </a>
              <a
                href={ORG_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-red-500" /> cyberhx.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 mt-7">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid place-items-center h-10 w-10 rounded-xl border border-[var(--line)] bg-white/[0.02] text-[var(--muted)] hover:text-white hover:border-red-700/40 hover:-translate-y-0.5 transition-all"
                  onMouseEnter={() => sound.playHover()}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={s.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
