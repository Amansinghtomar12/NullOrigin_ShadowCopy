import { useEffect } from "react";

/**
 * Small touches aimed at the actual audience of this site.
 *
 * CTF players open devtools on principle, so the console greets them
 * properly and leaves a warm-up flag (base64, one step, deliberately
 * easy — it is a handshake, not a challenge). And when the tab loses
 * focus, the title flips to a "connection idle" line, so the site keeps
 * its voice even in a tab strip.
 */

// btoa("flag{c0ns0l3_r3c0n_p4ys_0ff}")
const WARMUP = "ZmxhZ3tjMG5zMGwzX3IzYzBuX3A0eXNfMGZmfQ==";

const BANNER = String.raw`
  _   _ _   _ _     _        ___  ____  ___ ____ ___ _   _
 | \ | | | | | |   | |      / _ \|  _ \|_ _/ ___|_ _| \ | |
 |  \| | | | | |   | |     | | | | |_) || | |  _ | ||  \| |
 | |\  | |_| | |___| |___  | |_| |  _ < | | |_| || || |\  |
 |_| \_|\___/|_____|_____|  \___/|_| \_\___\____|___|_| \_|
`;

export function useOperatorTouches() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c${BANNER}%c\n  Curiosity is the job. Nice instinct, operator.\n\n  warm-up ›› %c${WARMUP}%c  (one decode, you know which)\n`,
      "color:#ff3355;font-family:monospace",
      "color:#a2a9b0;font-family:monospace",
      "color:#ffc23c;font-family:monospace",
      "color:#a2a9b0;font-family:monospace"
    );
  }, []);

  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden
        ? "⟨ connection idle — NULL ORIGIN ⟩"
        : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);
}
