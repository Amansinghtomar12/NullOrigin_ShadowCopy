import { NAV, SOCIALS, PARTNER_EMAIL, ORG_SITE } from "../constants";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-black/60 backdrop-blur-xl">
      <div className="hairline" />
      <div className="shell py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-2 lg:col-span-1 space-y-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/mask.png"
              alt=""
              className="h-8 w-8 object-contain drop-shadow-[0_0_8px_rgba(255, 51, 85,0.4)]"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <div>
              <p className="font-display font-extrabold text-[12px] tracking-[0.12em] text-white">
                NULL ORIGIN CTF
              </p>
              <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--faint)] mt-0.5">
                Team CyberXoX
              </p>
            </div>
          </div>
          <p className="text-[12px] text-[var(--muted)] leading-relaxed max-w-xs">
            A premier online CTF powered by{" "}
            <a
              href={ORG_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300"
            >
              CyberHX
            </a>
            . Hack. Exploit. Capture.
          </p>
        </div>

        <div>
          <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-red-400 mb-3">Explore</p>
          <div className="space-y-2.5">
            {NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="block text-[12px] text-[var(--muted)] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-red-400 mb-3">Community</p>
          <div className="space-y-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[12px] text-[var(--muted)] hover:text-white transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-red-400 mb-3">Partner</p>
          <a
            href={`mailto:${PARTNER_EMAIL}`}
            className="block text-[12px] text-[var(--muted)] hover:text-white transition-colors break-all"
          >
            {PARTNER_EMAIL}
          </a>
          <div className="mt-4 status"><span className="dot" /> Portal secured</div>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="shell py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] text-[var(--faint)]">
            © {new Date().getFullYear()} NULL ORIGIN CTF · NULLORIGIN.CYBERHX.COM
          </p>
          <p className="text-[10px] text-[var(--faint)]">
            Built by Team CyberXoX ·{" "}
            <a
              href={ORG_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500/70 hover:text-red-400"
            >
              Powered by CyberHX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
