/**
 * Hand-drawn championship medal: brand-red ribbon, metallic coin with a
 * machined inner ring, the rank struck into the face in the display font,
 * and a soft specular sweep. Flat icon fonts can't do metal — gradients
 * can, and SVG keeps it crisp at any size in both themes.
 */

type Tier = "gold" | "silver" | "bronze";

const METALS: Record<
  Tier,
  { face: [string, string, string]; ring: string; digit: string; glow: string }
> = {
  gold: {
    face: ["#ffeaa9", "#ffc23c", "#a86a12"],
    ring: "#8a5a10",
    digit: "#6e4308",
    glow: "rgba(255, 194, 60, 0.55)",
  },
  silver: {
    face: ["#f5f8fb", "#c3ccd6", "#7e8994"],
    ring: "#657078",
    digit: "#4c565e",
    glow: "rgba(205, 220, 235, 0.4)",
  },
  bronze: {
    face: ["#f6c690", "#cd8544", "#7e4f22"],
    ring: "#6d431c",
    digit: "#583517",
    glow: "rgba(205, 133, 68, 0.45)",
  },
};

export default function PodiumMedal({ tier, rank, size }: { tier: Tier; rank: number; size: number }) {
  const m = METALS[tier];
  const id = `medal-${tier}`;

  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      aria-hidden="true"
      style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,.45)) drop-shadow(0 0 18px ${m.glow})` }}
    >
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m.face[0]} />
          <stop offset="0.5" stopColor={m.face[1]} />
          <stop offset="1" stopColor={m.face[2]} />
        </linearGradient>
        <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4d6a" />
          <stop offset="1" stopColor="#8a1029" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ribbon: two folded bands meeting behind the coin */}
      <path d="M30 0 L46 0 L54 46 L38 52 Z" fill={`url(#${id}-ribbon)`} />
      <path d="M70 0 L54 0 L46 46 L62 52 Z" fill={`url(#${id}-ribbon)`} opacity="0.82" />
      <path d="M46 0 L54 0 L50 12 Z" fill="#5c0a1c" opacity="0.55" />

      {/* coin */}
      <circle cx="50" cy="78" r="36" fill={m.ring} />
      <circle cx="50" cy="78" r="33" fill={`url(#${id}-face)`} />
      <circle cx="50" cy="78" r="26" fill="none" stroke={m.ring} strokeWidth="2" opacity="0.55" />
      <circle cx="50" cy="78" r="26" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.25" />

      {/* struck rank */}
      <text
        x="50"
        y="80"
        textAnchor="middle"
        dominantBaseline="central"
        fill={m.digit}
        style={{ font: "400 34px 'Bangers', system-ui, cursive", letterSpacing: "0.02em" }}
      >
        {rank}
      </text>

      {/* specular sweep */}
      <ellipse cx="38" cy="62" rx="18" ry="10" fill={`url(#${id}-shine)`} transform="rotate(-24 38 62)" />
    </svg>
  );
}
