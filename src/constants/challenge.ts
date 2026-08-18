/**
 * The teaser ROT13 challenge shown on the home page and solvable in the
 * terminal.
 *
 * The accepted answer is derived from the ciphertext rather than written
 * out a second time. Hard-coding both is how they drifted apart before:
 * the ciphertext decodes to `nU11` but the stored answer read `nh11`, so
 * every correct solve was rejected. Deriving it means the puzzle and its
 * answer cannot disagree.
 */

export function rot13(input: string): string {
  return input.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

/** What the player is shown. */
export const SAMPLE_CIPHER = "synt{aH11_ebg13_q3p0q3}";

/** What it decodes to: flag{nU11_rot13_d3c0d3}. */
export const SAMPLE_FLAG = rot13(SAMPLE_CIPHER);

/** Flags are compared case-insensitively and ignoring surrounding space. */
export function isSampleFlag(attempt: string): boolean {
  return attempt.trim().toLowerCase() === SAMPLE_FLAG.toLowerCase();
}
