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
      className="relative border-y border-[rgba(255,51,85,.22)]"
    >
      <div className="shell py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center flex-wrap gap-x-12 gap-y-6">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — ${p.tier} of Null Origin CTF`}
              className="group inline-flex flex-col items-center gap-2.5"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors">
                {p.tier}
              </span>
              <span className={`grid h-[54px] place-items-center ${p.plate ? "sponsor-plate" : ""}`}>
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
            style={{ marginTop: "26px" }}
            className="font-mono text-[12px] font-bold tracking-[0.16em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
            onMouseEnter={() => sound.playHover()}
          >
            See all partners →
          </a>
        </div>
      </div>
    </aside>
  );
}
