import { Challenge, LeaderboardUser, VirtualFile } from "./types";

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "crypto_01",
    title: "Kryptos Decoder",
    description: "We intercepted a coded transmission on our subnet. It is encrypted with a simple ROT13 caesar rotation cipher. Find the decoded message to capture the flag.",
    category: "Cryptography",
    points: 100,
    solved: false,
    difficulty: "Easy",
    flag: " ",
    hint: "ROT13 rotates letters by 13 positions in the alphabet. A becomes N, B becomes O, etc. Numbers and symbols are unchanged.",
    content: "Encrypted Transmission:\nsynt{aH11_ebg13_q3p0q3}"
  },
  {
    id: "web_02",
    title: "Invisible Source",
    description: "Hacker systems often leave breadcrumbs in standard HTML/JS comment blocks inside the public assets. Inspect the page files or examine the page source to find the hidden comment flag.",
    category: "Web Exploitation",
    points: 150,
    solved: false,
    difficulty: "Easy",
    flag: "flag{h1dd3n_1n_th3_s0urc3s_992}",
    hint: "Right-click and 'Inspect' or look at the index.html file in our file system using the terminal. Look for a green HTML/XML comment block.",
    content: "Target asset: index.html\nSearch the document comments for standard flag markers like CTF_FLAG."
  },
  {
    id: "rev_03",
    title: "Passcode Reverse Eng",
    description: "We recovered a node authentication script `auth_pass.js`. It validates a user-submitted passcode using strict string index checks. Find the passcode and execute it to yield the flag.",
    category: "Reverse Engineering",
    points: 250,
    solved: false,
    difficulty: "Medium",
    flag: "flag{r3v3rs3_p4ssc0d3_unl0ck3d}",
    hint: "Use 'cat auth_pass.js' to see the criteria. Character at index 2 XOR 42 equals 69. Solve for index 0 to 5. Type 'verify <passcode>' in the terminal.",
    content: "Validate constraints:\n- passcode.length === 6\n- passcode[0] === 'N'\n- passcode[1] === 'u'\n- passcode[2].charCodeAt(0) ^ 42 === 69\n- passcode[3] === 'l'\n- passcode[4] === 'O'\n- passcode[5] === '!'"
  },
  {
    id: "osint_04",
    title: "The Agent's Footprint",
    description: "Null Origin assets are mapped to a secure location node. A YAML configuration leak shows our admin's physical network node city. Find the origin location name in the server configs.",
    category: "OSINT",
    points: 120,
    solved: false,
    difficulty: "Easy",
    flag: "flag{reykjavik_vortex}",
    hint: "Explore the virtual file system. Check files in logs/ or config/ directories using terminal commands like 'ls' and 'cat'.",
    content: "Search files to locate standard configuration parameters. Flag format: flag{lowercase_city_name_vortex}."
  },
  {
    id: "forensics_05",
    title: "Memory Hex Dump",
    description: "We extracted a fragmented trace from the volatile RAM of a server under threat. It contains sequential hex segments. Unpack the hex bytes to reconstruct the flag.",
    category: "Forensics",
    points: 300,
    solved: false,
    difficulty: "Hard",
    flag: "flag{null_byte_conquest}",
    hint: "Each pair of numbers represents a byte in hexadecimal (base 16). Parse these values to standard ASCII text (e.g. 66 is 'f').",
    content: "Captured Hex packet sequence:\nPart 1: 66 6c 61 67 7b\nPart 2: 6e 75 6c 6c\nPart 3: 5f 62 79 74\nPart 4: 65 5f 63 6f 6e 71 75 65 73 74 7d"
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, username: "da3m0n_klr", points: 920, solvedCount: 5, lastSolveTime: "4 mins ago" },
  { rank: 2, username: "xX_l33t_h4ck_Xx", points: 770, solvedCount: 4, lastSolveTime: "12 mins ago" },
  { rank: 3, username: "shadow_net", points: 670, solvedCount: 3, lastSolveTime: "1 hr ago" },
  { rank: 4, username: "pwn_master_99", points: 520, solvedCount: 3, lastSolveTime: "2 hrs ago" },
  { rank: 5, username: "zero_day_hunter", points: 400, solvedCount: 2, lastSolveTime: "3 hrs ago" },
  { rank: 6, username: "anon_sec", points: 270, solvedCount: 2, lastSolveTime: "5 hrs ago" }
];

export const VIRTUAL_FS: VirtualFile = {
  name: "root",
  isDir: true,
  children: {
    "welcome.txt": {
      name: "welcome.txt",
      content: "=========================================================\n       _  _  _  _       _       _  _  _  _  _       _      \n      (_)(_)(_)(_)     (_)     (_)(_)(_)(_)(_)     (_)     \n      (_)        (_)   (_)     (_)  (_)  (_)       (_)     \n      (_)        (_)   (_)     (_)  (_)  (_)       (_)     \n      (_)        (_)   (_)  _  (_)  (_)  (_)       (_)  _  \n      (_)_ _ _ _(_)    (_)(_)(_)(_) (_)  (_)       (_)(_)(_)\n     (_)(_)(_)(_)        (_)(_)(_)  (_)  (_)         (_)(_)\n=========================================================\n\nWelcome back, Operator.\n\nYou have successfully logged into the Null Origin CTF portal.\nThis terminal is directly connected to the Alpha network teaser node.\n\nType 'challenges' to view open vulnerabilities.\nType 'help' to view available operations."
    },
    "index.html": {
      name: "index.html",
      content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Null Origin Teaser Site</title>\n</head>\n<body>\n    <!-- \n       CTF_FLAG: flag{h1dd3n_1n_th3_s0urc3s_992}\n       Note for developers: Please remove this comment before deploying the actual production site! \n    -->\n    <div class=\"hacker-container\">\n        <h1>SYSTEM INITIALIZED</h1>\n        <p>Pre-registration is active.</p>\n    </div>\n</body>\n</html>"
    },
    "auth_pass.js": {
      name: "auth_pass.js",
      content: "/**\n * Null Origin Authentication Node Passcode Validator\n */\nfunction validatePasscode(passcode) {\n  if (passcode.length !== 6) {\n    return false;\n  }\n  if (passcode[0] !== 'N') return false;\n  if (passcode[1] !== 'u') return false;\n  // Decrypt of 69 under key 42:\n  if ((passcode[2].charCodeAt(0) ^ 42) !== 69) return false;\n  if (passcode[3] !== 'l') return false;\n  if (passcode[4] !== 'O') return false;\n  if (passcode[5] !== '!') return false;\n  \n  return \"SUCCESS: Flag is flag{r3v3rs3_p4ssc0d3_unl0ck3d}\";\n}\n\n// Usage: verify <passcode>\n// Example: verify test12"
    },
    "configs": {
      name: "configs",
      isDir: true,
      children: {
        "sys_config.yaml": {
          name: "sys_config.yaml",
          content: "server:\n  domain: \"null-origin.org\"\n  version: \"3.1.2-alpha\"\n  main_port: 8080\n  ingress_city: \"reykjavik\"\n  security:\n    algorithm: \"AES-256-GCM\"\n    salt: \"0x7F4A23\"\n    nodes: 5\n\nlocation_data:\n  facility: \"Iceland-Geothermal-Vortex-C\"\n  geotarget: \"64.1466, -21.9426\"\n  node_signature: \"flag{reykjavik_vortex}\"\n\n# System configuration completed."
        },
        "network.json": {
          name: "network.json",
          content: "{\n  \"gateway\": \"10.0.0.1\",\n  \"active_subnets\": [\"10.0.1.0/24\", \"10.0.2.0/24\"],\n  \"firewall_status\": \"active\",\n  \"bypass_mode\": false\n}"
        }
      }
    },
    "logs": {
      name: "logs",
      isDir: true,
      children: {
        "connections.log": {
          name: "connections.log",
          content: "2026-06-12 05:01:23 UTC - connection from 192.168.1.52 - OK\n2026-06-12 05:04:12 UTC - connection from 95.84.120.45 - BLOCKED (Port scan)\n2026-06-12 05:05:40 UTC - connection from 10.0.1.15 - ACCESS DETECTED (root)\n2026-06-12 05:08:14 UTC - Syslog updated."
        },
        "flag_hint.txt": {
          name: "flag_hint.txt",
          content: "Need help solving the Hex Dump? \nHex bytes represent numbers in Hexadecimal form. Convert each pair using an ASCII hex lookup tool or standard base-16 conversions. \nHeader of CTF flags is always 'flag{' which is equivalent to hex bytes 66 6c 61 67 7b."
        }
      }
    }
  }
};
