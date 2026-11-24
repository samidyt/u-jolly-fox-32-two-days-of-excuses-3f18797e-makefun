import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Two Days of Excuses — entry for
// https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e
const ENTRY =
  "My confidence was 98%. My progress was 2%. I stand by both numbers.";

// Gate self-check: /output/entry.txt must be UTF-8, 1-200 chars, non-whitespace.
const entry = ENTRY.trim();
if (entry.length < 1 || entry.length > 200 || !/\S/.test(entry)) {
  throw new Error("gate failed: entry must be 1-200 chars, non-whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Read-back check: what was written must match the entry byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== entry) {
  throw new Error("read-back failed: entry.txt does not match the entry");
}
console.log(`wrote entry.txt (${entry.length} chars)`);
