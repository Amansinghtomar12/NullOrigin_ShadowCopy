import { PARTNERS } from "../constants";
import { sound } from "../hooks/utils/audio";

/**
 * Slim partner band under the hero, so who backs the event is visible
 * without scrolling to the Sponsors section.
 */
export default function SponsorStrip() {
  return (
    <aside
      aria-label="Our partners"
      className="relative border-b-[3px] border-[rgba(255,51,85,.28)] bg-[var(--bg2)]"
    >
      <div className="shell py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-x-10 gap-y-5">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — ${p.tier} of Null Origin CTF`}
              className="group inline-flex flex-col items-center gap-2"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span className="font-mono text-[9px] font-bold tracking-[0.22em] uppercase text-[var(--faint)] group-hover:text-[var(--green)] transition-colors">
                {p.tier}
              </span>
              <span className={p.plate ? "sponsor-plate" : undefined}>
                <img
                  src={p.logo}
                  alt={p.name}
                  className="sponsor-logo sponsor-logo--strip transition-transform group-hover:scale-105"
                />
              </span>
            </a>
          ))}

          <a
            href="#sponsors"
            className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--muted)] hover:text-[var(--green)] transition-colors whitespace-nowrap"
            onMouseEnter={() => sound.playHover()}
          >
            See all partners →
          </a>
        </div>
      </div>
    </aside>
  );
}
