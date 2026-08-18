import { sound } from "../hooks/utils/audio";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface HomeHeroProps {
  timeLeft: TimeLeft;
  onRegister: () => void;
}

export default function HomeHero({ timeLeft, onRegister }: HomeHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden text-center border-b-[3px] border-black"
      style={{ padding: "180px 0 50px", background: "linear-gradient(180deg, #0b1422 0%, #0e1a2c 45%, #142235 75%, #0a0a12 100%)" }}
    >
      {/* ── hero scene (moon / confetti / skyline / monitors) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* moon */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[120px] h-[120px] md:w-[170px] md:h-[170px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ffe9a8 0%, #ffc23c 45%, rgba(255,194,60,0) 72%)",
            filter: "blur(1px)",
          }}
        />

        {/* scattered confetti */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute opacity-85"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 78}%`,
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                background: i % 2 === 0 ? "var(--red)" : "#3a6ea5",
              }}
            />
          ))}
        </div>

        {/* pixel skyline */}
        <svg
          className="absolute left-0 right-0 bottom-0 w-full block h-[180px] md:h-[220px]"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <g fill="#101c2e">
            <rect x="0" y="120" width="90" height="100" />
            <rect x="90" y="90" width="70" height="130" />
            <rect x="160" y="140" width="60" height="80" />
            <rect x="220" y="70" width="80" height="150" />
            <rect x="300" y="110" width="55" height="110" />
            <rect x="355" y="60" width="90" height="160" />
            <rect x="445" y="130" width="65" height="90" />
            <rect x="510" y="95" width="75" height="125" />
            <rect x="585" y="150" width="50" height="70" />
            <rect x="635" y="40" width="100" height="180" />
            <rect x="735" y="100" width="70" height="120" />
            <rect x="805" y="135" width="60" height="85" />
            <rect x="865" y="75" width="85" height="145" />
            <rect x="950" y="115" width="55" height="105" />
            <rect x="1005" y="55" width="95" height="165" />
            <rect x="1100" y="125" width="65" height="95" />
            <rect x="1165" y="90" width="75" height="130" />
            <rect x="1240" y="145" width="55" height="75" />
            <rect x="1295" y="65" width="85" height="155" />
            <rect x="1380" y="115" width="60" height="105" />
          </g>
          <g fill="#3a6ea5" opacity=".55">
            <rect x="20" y="140" width="6" height="8" /><rect x="40" y="160" width="6" height="8" />
            <rect x="105" y="110" width="6" height="8" /><rect x="125" y="135" width="6" height="8" />
            <rect x="235" y="95" width="6" height="8" /><rect x="260" y="125" width="6" height="8" />
            <rect x="370" y="85" width="6" height="8" /><rect x="395" y="115" width="6" height="8" />
            <rect x="650" y="65" width="6" height="8" /><rect x="675" y="100" width="6" height="8" />
            <rect x="750" y="125" width="6" height="8" /><rect x="820" y="155" width="6" height="8" />
            <rect x="880" y="100" width="6" height="8" /><rect x="1020" y="80" width="6" height="8" />
            <rect x="1180" y="115" width="6" height="8" /><rect x="1310" y="90" width="6" height="8" />
          </g>
          <rect x="0" y="210" width="1440" height="10" fill="#0a121f" />
        </svg>

        {/* retro monitors */}
        <svg className="absolute bottom-2 w-[54px] hidden md:block" style={{ left: "7%" }} viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="26" fill="#1c1c2a" stroke="#000" strokeWidth="2" />
          <rect x="6" y="6" width="28" height="18" fill="#39ff6a" />
          <rect x="14" y="30" width="12" height="4" fill="#1c1c2a" />
          <rect x="10" y="34" width="20" height="3" fill="#000" />
        </svg>
        <svg className="absolute bottom-2 w-[38px] hidden md:block" style={{ left: "20%" }} viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="26" fill="#f4f6f5" stroke="#000" strokeWidth="2" />
          <circle cx="14" cy="14" r="2.5" fill="#000" />
          <circle cx="26" cy="14" r="2.5" fill="#000" />
          <rect x="13" y="20" width="14" height="3" fill="#000" />
          <rect x="14" y="30" width="12" height="4" fill="#cfd3d2" />
          <rect x="10" y="34" width="20" height="3" fill="#000" />
        </svg>
        <svg className="absolute bottom-2 w-[54px] hidden md:block" style={{ right: "8%" }} viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="26" fill="#1c1c2a" stroke="#000" strokeWidth="2" />
          <rect x="6" y="6" width="28" height="18" fill="#39c9ff" />
          <rect x="14" y="30" width="12" height="4" fill="#1c1c2a" />
          <rect x="10" y="34" width="20" height="3" fill="#000" />
        </svg>
        <svg className="absolute bottom-2 w-[30px] hidden md:block" style={{ right: "18%" }} viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="26" fill="#1c1c2a" stroke="#000" strokeWidth="2" />
          <rect x="6" y="6" width="28" height="18" fill="#ff3355" />
          <rect x="14" y="30" width="12" height="4" fill="#1c1c2a" />
          <rect x="10" y="34" width="20" height="3" fill="#000" />
        </svg>
      </div>

      {/* ── content ── */}
      <div className="relative z-10 shell">
        <div
          className="font-display uppercase mb-[22px] tracking-[2px] text-[11px] text-[var(--amber)]"
          style={{ animation: "pulse-dot 1s steps(1) infinite" }}
        >
          ▸ INSERT COIN
        </div>

        <h1
          className="h-display"
          style={{ fontSize: "clamp(28px,8vw,72px)", lineHeight: "1.1" }}
        >
          NULL
          <br />
          ORIGIN
        </h1>

        <p className="lead mx-auto mt-[34px] max-w-[50ch]">
          Select your domain. Beat the clock. Capture every flag — a 24-hour CTF across six attack
          levels.
        </p>

        <div className="flex gap-3 justify-center mt-[28px] flex-wrap px-4">
          <button
            type="button"
            onClick={() => { onRegister(); sound.playClick(); }}
            onMouseEnter={() => sound.playHover()}
            className="btn btn-primary !text-[13px] !py-[18px] !px-[28px] cursor-pointer"
          >
            ▸ START GAME
          </button>
          <a
            href="#about"
            onMouseEnter={() => sound.playHover()}
            className="btn btn-ghost !text-[13px] !py-[18px] !px-[28px]"
            style={{ background: "var(--white)", color: "#000" }}
          >
            VIEW INTRO
          </a>
        </div>

        <div className="coin-counter glass inline-flex mt-[36px] mx-4">
          <div className="coin">
            <div className="n">{timeLeft.days}</div>
            <div className="l">DAYS</div>
          </div>
          <div className="coin">
            <div className="n">{timeLeft.hours}</div>
            <div className="l">HRS</div>
          </div>
          <div className="coin">
            <div className="n">{timeLeft.minutes}</div>
            <div className="l">MIN</div>
          </div>
          <div className="coin r">
            <div className="n">{timeLeft.seconds}</div>
            <div className="l">SEC</div>
          </div>
        </div>
      </div>
    </section>
  );
}