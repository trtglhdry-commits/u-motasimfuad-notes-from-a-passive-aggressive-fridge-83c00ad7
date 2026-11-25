import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One passive-aggressive note from a smart fridge to its owner.
// First-person fridge voice: petty, specific, and smug about what it
// keeps cold. The leftovers gag turns on the fridge doing the
// committing the owner never does.
const NOTE =
  "The leftovers from Tuesday have applied for permanent residency. I approved the application \u2014 someone in this house has to commit to something.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Runtime gate guard: the sealed scorer only accepts UTF-8 text of
// 1-200 characters, not only whitespace, on a single line. Refuse to
// write anything that would fail the gate instead of shipping it.
if (
  NOTE.length < 1 ||
  NOTE.length > 200 ||
  NOTE.trim().length === 0 ||
  NOTE.includes("\n")
) {
  throw new Error("entry violates the 1-200 character single-line gate");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), NOTE + "\n", "utf8");
