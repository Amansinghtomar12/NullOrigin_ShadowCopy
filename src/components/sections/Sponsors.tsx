import { Target, Users, Sparkles, Handshake, Mail, Check, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { sound } from "../../hooks/utils/audio";
import { PARTNER_EMAIL, PARTNERS } from "../../constants";

const WHY_SPONSOR = [
  { icon: <Target className="h-4 w-4" />, title: "A vetted audience", desc: "Reach hundreds of motivated security practitioners and students in one focused window." },
  { icon: <Users className="h-4 w-4" />, title: "Recruiting pipeline", desc: "Surface top performers and connect with talent that is hard to reach anywhere else." },
  { icon: <Sparkles className="h-4 w-4" />, title: "Brand alongside skill", desc: "Position your brand next to genuine offensive-security excellence, not generic ad space." },
];

type Partner = (typeof PARTNERS)[number];

/**
 * A confirmed partner, given real estate rather than a logo tile: artwork
 * on one side, who they are and what the arrangement covers on the other.
 *
 * Only partners we actually have appear on this page — there are no
 * reserved or placeholder slots, because an empty tier grid advertises
 * what we lack rather than who backs us.
 */
function PartnerFeature({ name, logo, href, tier, plate, blurb, about, includes }: Partner) {
  return (
    <div className="slot slot--filled slot--feature flex-col lg:flex-row items-stretch gap-0 p-0 text-left">
      <span className="sheen" />
      <span className="slot-corner-tr" />
      <span className="slot-corner-bl" />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — ${tier} of Null Origin CTF`}
        className="group relative grid place-items-center shrink-0 px-8 py-10 lg:w-[36%] bg-[var(--ink)] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[rgba(57,255,106,.28)]"
        onMouseEnter={() => sound.playHover()}
        onClick={() => sound.playClick()}
      >
        <span className={plate ? "sponsor-plate" : undefined}>
          <img
            src={logo}
            alt={name}
            className="sponsor-logo transition-transform group-hover:scale-105"
          />
        </span>
      </a>

      <div className="relative flex-1 p-6 sm:p-8">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--green)] flex items-center gap-2">
          <span className="dot" aria-hidden="true" /> Confirmed · {tier}
        </p>
        <p className="font-display text-[22px] tracking-wide text-white mt-3 leading-snug">
          {blurb}
        </p>
        <p className="text-[15px] leading-relaxed text-[var(--muted)] mt-3">{about}</p>

        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-red-400 mt-6 mb-3">
          What this partnership covers
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-[var(--muted)]">
              <Check className="h-4 w-4 mt-[5px] shrink-0 text-[var(--green)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline mt-7"
          onMouseEnter={() => sound.playHover()}
        >
          Visit {name} <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="section relative">
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(255,51,85,0.06),transparent_70%)]" />
      <div className="shell relative">
        <Reveal>
          <SectionHeading
            tag="Partnership"
            title="Sponsors & Partners"
            sub="The people backing this edition of Null Origin."
          />
        </Reveal>

        <div className="space-y-6 mt-12">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <PartnerFeature {...p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="glass glass-strong p-6 sm:p-10 mt-10">
            <div className="grid sm:grid-cols-3 gap-5">
              {WHY_SPONSOR.map((w) => (
                <div key={w.title} className="tilt3d d3">
                  <div className="tilt3d__inner">
                    <div className="grid place-items-center h-11 w-11 rounded-full bg-red-500/10 border-2 border-red-500/25 text-red-400">
                      {w.icon}
                    </div>
                    <p className="font-display text-[20px] tracking-wide text-white mt-4">{w.title}</p>
                    <p className="text-[15px] text-[var(--muted)] leading-relaxed mt-1.5">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hairline my-8" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="text-center md:text-left">
                <p className="font-display text-white text-[24px] tracking-wide">
                  Want to back Null Origin?
                </p>
                <p className="lead mt-1.5">
                  Custom packages and category sponsorships available. We will send the full brief.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 shrink-0">
                <a
                  href={`mailto:${PARTNER_EMAIL}?subject=Null%20Origin%20CTF%20—%20Sponsorship`}
                  className="btn btn-primary"
                  onMouseEnter={() => sound.playHover()}
                >
                  <Handshake className="h-4 w-4" /> Become a sponsor
                </a>
                <a
                  href={`mailto:${PARTNER_EMAIL}?subject=Null%20Origin%20CTF%20—%20Partnership%20deck%20request`}
                  className="btn btn-ghost"
                  onMouseEnter={() => sound.playHover()}
                >
                  <Mail className="h-4 w-4" /> Request the deck
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
