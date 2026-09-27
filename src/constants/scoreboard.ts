/**
 * Final standings of the Null Origin CTF 2026 Grand Finale (25 Sep 2026),
 * as published on the official CTFtime scoreboard — ctftime.org/event/3454.
 * Country is the team's CTFtime country, where the team has set one.
 */
export interface Standing {
  rank: number;
  team: string;
  points: number;
  country: string;
  /** CTFtime team id. */
  ctftime: number;
}

export const SCOREBOARD_SOURCE = "https://ctftime.org/event/3454";

export const SCOREBOARD: Standing[] = [
  { rank: 1, team: "Jokers", points: 17600, country: "CN", ctftime: 21845 },
  { rank: 2, team: "roamers", points: 16850, country: "", ctftime: 449023 },
  { rank: 3, team: "AetherQuant", points: 16700, country: "", ctftime: 423649 },
  { rank: 4, team: "Cyber Titans", points: 16400, country: "", ctftime: 203231 },
  { rank: 5, team: "5_Cu_Nam_Trong_Tay", points: 16100, country: "", ctftime: 449021 },
  { rank: 6, team: "BlackCipherz", points: 15950, country: "", ctftime: 449017 },
  { rank: 7, team: "Bournvita", points: 15400, country: "IN", ctftime: 422996 },
  { rank: 8, team: "gugugaga", points: 15200, country: "", ctftime: 184706 },
  { rank: 9, team: "wth", points: 15050, country: "", ctftime: 7841 },
  { rank: 10, team: "BreakingBad", points: 14850, country: "", ctftime: 6508 },
  { rank: 11, team: "Team Pri5m", points: 14700, country: "NP", ctftime: 389645 },
  { rank: 12, team: "Noirlycan", points: 14600, country: "", ctftime: 449020 },
  { rank: 13, team: "Vyadh", points: 14400, country: "", ctftime: 449018 },
  { rank: 14, team: "Oggy V3r5e", points: 13900, country: "", ctftime: 435285 },
  { rank: 15, team: "RUY", points: 13700, country: "", ctftime: 444522 },
  { rank: 16, team: "H4CK3R'$ LOBBY", points: 13600, country: "IN", ctftime: 439630 },
  { rank: 17, team: "Inikan", points: 13400, country: "ID", ctftime: 448146 },
  { rank: 18, team: "Junkiessss", points: 13100, country: "", ctftime: 449019 },
  { rank: 19, team: "pissyboy67", points: 12900, country: "", ctftime: 449031 },
  { rank: 20, team: "Bl4ck_Kloud", points: 12300, country: "", ctftime: 415965 },
  { rank: 21, team: "byteMe", points: 11900, country: "", ctftime: 28473 },
  { rank: 22, team: "0xa", points: 11700, country: "", ctftime: 17351 },
  { rank: 23, team: "D4RK SH3LL", points: 11500, country: "", ctftime: 447092 },
  { rank: 24, team: "Street_Hackers", points: 11100, country: "IN", ctftime: 430998 },
  { rank: 25, team: "The Rise of the Eternal Wolves of the Blue Sky", points: 8800, country: "AZ", ctftime: 439103 },
  { rank: 26, team: "CuB_Networks", points: 8600, country: "", ctftime: 449027 },
  { rank: 27, team: "JackSpeor", points: 8550, country: "", ctftime: 17195 },
  { rank: 28, team: "Resonance", points: 7900, country: "US", ctftime: 105394 },
  { rank: 29, team: "djsimpsondoh", points: 7750, country: "NZ", ctftime: 434731 },
  { rank: 30, team: "0x05AD", points: 7600, country: "TR", ctftime: 449028 },
  { rank: 31, team: "Ambr0s1a!", points: 6950, country: "UA", ctftime: 405490 },
  { rank: 32, team: "pc4pghost", points: 6100, country: "VN", ctftime: 447928 },
  { rank: 33, team: "Skånepatrullen", points: 6050, country: "SE", ctftime: 443257 },
  { rank: 34, team: "NO1TrustUS", points: 5650, country: "", ctftime: 449026 },
  { rank: 35, team: "H3XR41D", points: 4800, country: "IN", ctftime: 427599 },
  { rank: 36, team: "D3kh1_K1chu_P4r1_k1n4", points: 4450, country: "BD", ctftime: 448277 },
  { rank: 37, team: "Fourleaf Clovers", points: 3850, country: "", ctftime: 448833 },
  { rank: 38, team: "RootHunters", points: 2600, country: "CO", ctftime: 268068 },
  { rank: 39, team: "Downer", points: 2250, country: "", ctftime: 449059 },
  { rank: 40, team: "SParK", points: 1750, country: "", ctftime: 59494 },
  { rank: 41, team: "WHITE_SOULE", points: 50, country: "", ctftime: 366816 },
  { rank: 42, team: "b6a_lover", points: 50, country: "HK", ctftime: 418254 },
];
