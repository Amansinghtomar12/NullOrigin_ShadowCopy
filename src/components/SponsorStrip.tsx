import { TITLE_SPONSOR } from "../constants";
import { sound } from "../hooks/utils/audio";

/**
 * Slim partner band that sits immediately under the hero, so the title
 * sponsor is visible without scrolling to the Sponsors section.
 */
export default function SponsorStrip() {
  const { name, logo, href, tier } = TITLE_SPONSOR;

  return (
    <aside
      aria-label={`${tier}: ${name}`}
      className="relative border-b-[3px] border-black bg-[var(--bg2)]"
    >
      <div className="shell py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4">
          <span className="font-display uppercase text-[10px] tracking-[2px] text-[var(--muted)] flex items-center gap-2.5 whitespace-nowrap">
            <span className="dot" aria-hidden="true" />
            {tier}
          </span>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — ${tier} of Null Origin CTF`}
            className="group inline-flex items-center"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
          >
            <img
              src={logo}
              alt={name}
              className="sponsor-logo sponsor-logo--strip transition-transform group-hover:scale-105"
            />
          </a>

          <a
            href="#sponsors"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--muted)] hover:text-[var(--green)] transition-colors whitespace-nowrap"
            onMouseEnter={() => sound.playHover()}
          >
            See all partners →
          </a>
        </div>
      </div>
    </aside>
  );
}
