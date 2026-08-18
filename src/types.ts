export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: "Cryptography" | "Web Exploitation" | "Reverse Engineering" | "Forensics" | "OSINT";
  points: number;
  solved: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  flag: string; // SHA-256 or exact match (for teasers, exact match in lowercase/uppercase is great)
  hint: string;
  files?: string[];
  content?: string; // The puzzle payload to show to the user
}

export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "warning" | "system";
  timestamp?: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  points: number;
  solvedCount: number;
  lastSolveTime: string;
  isCurrentUser?: boolean;
}

export interface VirtualFile {
  name: string;
  content?: string;
  isDir?: boolean;
  children?: { [key: string]: VirtualFile };
}
