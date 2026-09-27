import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, ExternalLink, Search, Trophy, Users, Clock, Target } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import CursorRing from "./CursorRing";
import PodiumMedal from "./sections/PodiumMedal";
import { CERTS_URL } from "../constants";
import { SCOREBOARD, SCOREBOARD_SOURCE } from "../constants/scoreboard";
import { sound } from "../hooks/utils/audio";

const fmt = (n: number) => n.toLocaleString("en-US");
const TOP = SCOREBOARD[0].points;

/* Podium in ceremony order: silver, gold, bronze. */
const PODIUM = [
  { s: SCOREBOARD[1], tier: "silver" as const, size: 64 },
  { s: SCOREBOARD[0], tier: "gold" as const, size: 84 },
  { s: SCOREBOARD[2], tier: "bronze" as const, size: 64 },
];

function CertificateButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CERTS_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => sound.playHover()}
      onClick={() => sound.playClick()}
      className={`btn btn-gold whitespace-nowrap ${className}`}
    >
      <Award className="h-4 w-4" aria-hidden="true" /> Claim certificate
    </a>
  );
}

/**
 * The final standings of the Grand Finale: podium, certificate call to
 * action, and every team's rank and score. Data is the official CTFtime
 * scoreboard, baked in at build time (src/constants/scoreboard.ts).
 */
export default function ScoreboardPage() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const prev = document.title;
    document.title = "Final Scoreboard — Null Origin CTF 2026";
    return () => {
      document.title = prev;
    };
  }, []);

  const q = query.trim().toLowerCase();
  const rows = useMemo(
    () => (q ? SCOREBOARD.filter((r) => r.team.toLowerCase().includes(q)) : SCOREBOARD),
    [q]
  );

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <CursorRing />
      <CosmicBackground />
      <div className="above-cosmos flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 py-3 sm:py-4">
          <div className="shell">
            <div className="flex items-center justify-between gap-3 rounded-2xl px-4 sm:px-5 py-2.5 glass-nav sb-nav">
              <Link
                to="/"
                className="flex items-center gap-3 group shrink-0"
                onClick={() => sound.playClick()}
                aria-label="Null Origin — back to the main site"
              >
                <img
                  src="/mask.webp"
                  alt=""
                  width="36"
                  height="36"
                  className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(255,51,85,0.45)] group-hover:scale-110 transition-transform"
                />
                <span className="hidden min-[400px]:flex flex-col leading-none">
                  <span className="font-display font-extrabold text-[15px] tracking-[0.14em] text-white">NULL ORIGIN</span>
                  <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--faint)] mt-1">CTF · 2026</span>
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="hidden sm:inline-flex btn btn-ghost !py-2.5 !px-4 !text-[13px] whitespace-nowrap"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back to site
                </Link>
                <CertificateButton className="!py-2.5 !px-4 !text-[13px]" />
              </div>
            </div>
          </div>
        </header>

        <main id="main" className="flex-1">
          {/* ── Title ── */}
          <section className="shell pt-10 sm:pt-14 text-center">
            <span className="eyebrow eyebrow--center">Official results</span>
            <h1 tabIndex={-1} className="h-display outline-none mt-5 text-[clamp(2.4rem,7vw,4.6rem)]">
              Final Scoreboard
            </h1>
            <p className="lead mt-4 max-w-[46ch] mx-auto">
              The Grand Finale of Null Origin CTF 2026 — 12 hours on one board, 25 September 2026.
            </p>
            <ul className="sb-facts" aria-label="Grand Finale in numbers">
              <li><Users className="h-4 w-4" aria-hidden="true" /> {SCOREBOARD.length} teams</li>
              <li><Clock className="h-4 w-4" aria-hidden="true" /> 12 hours</li>
              <li><Target className="h-4 w-4" aria-hidden="true" /> Top score {fmt(TOP)}</li>
            </ul>
          </section>

          {/* ── Podium ── */}
          <section className="shell mt-12" aria-labelledby="sb-podium-h">
            <h2 id="sb-podium-h" className="sr-only">Podium</h2>
            <ol className="sb-podium">
              {PODIUM.map(({ s, tier, size }) => (
                <li key={s.rank} className={`sb-step sb-step--${tier}`}>
                  <PodiumMedal tier={tier} rank={s.rank} size={size} />
                  <p className="sb-step__team">{s.team}</p>
                  <p className="sb-step__pts">
                    {fmt(s.points)} <span>pts</span>
                  </p>
                  <p className="sb-step__rank">{s.rank === 1 ? "Champions" : `${s.rank === 2 ? "2nd" : "3rd"} place`}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Certificates ── */}
          <section className="shell mt-12">
            <div className="sb-cert">
              <div className="sb-cert__icon" aria-hidden="true">
                <Award className="h-7 w-7" />
              </div>
              <div className="sb-cert__text">
                <p className="sb-cert__title">Your certificate is ready</p>
                <p className="sb-cert__desc">
                  Claim your official Null Origin CTF 2026 certificate on CyberHX Credentials — and verify it
                  there anytime.
                </p>
              </div>
              <CertificateButton className="sb-cert__btn" />
            </div>
          </section>

          {/* ── Full standings ── */}
          <section className="shell mt-14" aria-labelledby="sb-table-h">
            <div className="sb-table-head">
              <h2 id="sb-table-h" className="sb-table-title">All teams</h2>
              <label className="sb-search">
                <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="sr-only">Find your team</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find your team"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={60}
                />
              </label>
            </div>

            <div className="sb-table-wrap">
              <table className="sb-table">
                <caption className="sr-only">
                  Null Origin CTF 2026 Grand Finale final standings, {SCOREBOARD.length} teams
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="sb-col-rank">Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col" className="sb-col-pts">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.rank} className={r.rank <= 3 ? `sb-row sb-row--${r.rank}` : "sb-row"}>
                      <td className="sb-col-rank">
                        <span className="sb-rank">{r.rank}</span>
                      </td>
                      <td>
                        <div className="sb-team">
                          <span className="sb-team__name">{r.team}</span>
                          {r.country && (
                            <span className="sb-team__cc" title={r.country}>
                              {r.country}
                            </span>
                          )}
                          {r.rank <= 3 && <Trophy className="sb-team__cup h-3.5 w-3.5" aria-hidden="true" />}
                        </div>
                        <div className="sb-bar" aria-hidden="true">
                          <span style={{ width: `${Math.max(1.5, (r.points / TOP) * 100)}%` }} />
                        </div>
                      </td>
                      <td className="sb-col-pts">{fmt(r.points)}</td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="sb-empty">
                        No team matches “{query.trim()}”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="sb-source">
              Official standings as published on{" "}
              <a href={SCOREBOARD_SOURCE} target="_blank" rel="noopener noreferrer">
                CTFtime <ExternalLink className="inline h-3 w-3" aria-hidden="true" />
              </a>
              . Ties are broken by the earliest solve.
            </p>
          </section>

          <div className="shell mt-12 mb-16 flex flex-wrap justify-center gap-3">
            <CertificateButton />
            <Link to="/" className="btn btn-ghost" onClick={() => sound.playClick()} onMouseEnter={() => sound.playHover()}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Null Origin
            </Link>
          </div>
        </main>

        <footer className="border-t-2 border-[var(--line-soft)]">
          <div className="shell py-8 text-center">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--faint)]">
              © 2026 Null Origin CTF · Team CyberXoX · Powered by CyberHX
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
