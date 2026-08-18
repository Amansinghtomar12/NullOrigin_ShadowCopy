import { ReactNode } from "react";
import { Target, Users, Sparkles, Crown, Trophy, Network, Handshake, Mail, Plus, Check, ExternalLink, Award } from "lucide-react";
import { Reveal, SectionHeading } from "../ui";
import { sound } from "../../hooks/utils/audio";
import { PARTNER_EMAIL, CERT_PARTNER } from "../../constants";

const WHY_SPONSOR = [
  { icon: <Target className="h-4 w-4" />, title: "A vetted audience", desc: "Reach hundreds of motivated security practitioners and students in one focused window." },
  { icon: <Users className="h-4 w-4" />, title: "Recruiting pipeline", desc: "Surface top performers and connect with talent that is hard to reach anywhere else." },
  { icon: <Sparkles className="h-4 w-4" />, title: "Brand alongside skill", desc: "Position your brand next to genuine offensive-security excellence, not generic ad space." },
];

function ReservedSlot({ size = "md", code }: { size?: "title" | "md" | "sm"; code: string }) {
  const h = size === "title" ? "slot--title" : size === "sm" ? "min-h-[104px]" : "min-h-[124px]";
  const sm = size === "sm";
  return (
    <div className={`slot ${h} px-3`}>
      {size === "title" && <span className="sheen" />}
      <span className="slot-corner-tr" />
      <span className="slot-corner-bl" />
      <div className="flex flex-col items-center gap-1.5">
        <span className={`grid place-items-center rounded-full border border-red-700/40 bg-red-500/5 text-red-400/80 ${sm ? "h-7 w-7" : "h-8 w-8"}`}>
          <Plus className={sm ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </span>
        {!sm && <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">Logo placeholder</span>}
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--faint)]">{code}</span>
      </div>
    </div>
  );
}

/**
 * A confirmed partner, given real estate rather than a logo tile: artwork
 * on one side, who they are and what the arrangement covers on the other.
 * Open tiers below still use the dashed placeholder treatment.
 */
function PartnerFeature({ name, logo, href, tier, blurb, about, includes }: {
  name: string; logo: string; href: string; tier: string;
  blurb: string; about: string; includes: string[];
}) {
  return (
    <div className="slot slot--filled slot--feature flex-col lg:flex-row items-stretch gap-0 p-0 text-left">
      <span className="sheen" />
      <span className="slot-corner-tr" />
      <span className="slot-corner-bl" />

      {/* logo panel */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — ${tier} of Null Origin CTF`}
        className="group relative grid place-items-center shrink-0 px-8 py-10 lg:w-[38%] bg-[var(--ink)] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black"
        onMouseEnter={() => sound.playHover()}
        onClick={() => sound.playClick()}
      >
        <img
          src={logo}
          alt={name}
          className="sponsor-logo transition-transform group-hover:scale-105"
        />
      </a>

      {/* content panel */}
      <div className="relative flex-1 p-6 sm:p-8">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--green)] flex items-center gap-2">
          <span className="dot" aria-hidden="true" /> Confirmed · {tier}
        </p>
        <p className="font-display text-white text-[15px] tracking-wide mt-3 leading-snug">
          {blurb}
        </p>
        <p className="text-[13px] leading-relaxed text-[var(--muted)] mt-3">{about}</p>

        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-red-400 mt-6 mb-3">
          What this partnership covers
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-[var(--muted)]">
              <Check className="h-3.5 w-3.5 mt-[3px] shrink-0 text-[var(--green)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost mt-7"
          onMouseEnter={() => sound.playHover()}
        >
          Visit {name} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function TierHeader({ code, name, perks, allocated, total, icon }: {
  code: string; name: string; perks: string; allocated: number; total: number; icon: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">{icon}</span>
        <div>
          <p className="font-mono text-[9.5px] tracking-[0.26em] uppercase text-red-400">{code}</p>
          <p className="font-display font-bold text-[15px] tracking-wide text-white leading-tight">{name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11.5px] text-[var(--muted)]">{perks}</p>
        <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[var(--faint)] mt-1">{allocated} / {total} allocated</p>
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
          <SectionHeading tag="Partnership" title="Sponsors & Partners" sub="INE joins this edition as our certification partner. Sponsorship tiers are open — your brand could anchor the next one." />
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {WHY_SPONSOR.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="glass glass-hover rounded-[var(--radius)] p-5 h-full">
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/[0.03] border border-[var(--line)] text-red-400">{w.icon}</div>
                <p className="font-semibold text-white text-[14px] mt-4">{w.title}</p>
                <p className="text-[12.5px] text-[var(--muted)] leading-relaxed mt-1.5">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="glass glass-strong rounded-[26px] p-6 sm:p-8 mt-6">
            <TierHeader code="Confirmed" name="Certification Partner" perks="Certificates for our top teams" allocated={1} total={1} icon={<Award className="h-4 w-4" />} />
            <PartnerFeature {...CERT_PARTNER} />
            <div className="mt-9">
              <TierHeader code="Tier 00" name="Title Partner" perks="Naming · keynote · top logo placement" allocated={0} total={1} icon={<Crown className="h-4 w-4" />} />
              <ReservedSlot size="title" code="Your brand here" />
            </div>
            <div className="mt-9">
              <TierHeader code="Tier 01" name="Gold Sponsors" perks="Prominent logo · category sponsorship" allocated={0} total={3} icon={<Trophy className="h-4 w-4" />} />
              <div className="grid sm:grid-cols-3 gap-4">
                <ReservedSlot code="Gold · 01" /><ReservedSlot code="Gold · 02" /><ReservedSlot code="Gold · 03" />
              </div>
            </div>
            <div className="mt-9">
              <TierHeader code="Tier 02" name="Community Partners" perks="Logo · social shout-outs · cross-promo" allocated={0} total={6} icon={<Network className="h-4 w-4" />} />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {["01", "02", "03", "04", "05", "06"].map((n) => <ReservedSlot key={n} size="sm" code={n} />)}
              </div>
            </div>
            <div className="hairline my-8" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="text-center md:text-left">
                <p className="font-display font-bold text-white text-[17px] tracking-wide">Anchor the next edition of Null Origin.</p>
                <p className="lead mt-1.5">Custom packages and category sponsorships available. We will send the full brief.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a href={`mailto:${PARTNER_EMAIL}?subject=Null%20Origin%20CTF%20—%20Sponsorship`} className="btn btn-primary" onMouseEnter={() => sound.playHover()}>
                  <Handshake className="h-4 w-4" /> Become a sponsor
                </a>
                <a href={`mailto:${PARTNER_EMAIL}?subject=Null%20Origin%20CTF%20—%20Partnership%20deck%20request`} className="btn btn-ghost" onMouseEnter={() => sound.playHover()}>
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
