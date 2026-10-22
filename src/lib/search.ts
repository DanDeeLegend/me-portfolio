/**
 * Tiny keyword search used by the "Ask" assistant. No network, no model: it ranks the site's own content with a
 * BM25-style score so answers can only ever come from text that is already on the site.
 */
export type Entry = {
  id: string;
  kind: "Answer" | "Project" | "Post" | "Skills";
  title: string;
  /** What the assistant shows as the answer. */
  text: string;
  href: string;
  /** Extra words that should match this entry but don't appear in its text (e.g. "hire" for availability). */
  keywords?: string;
};

export type Hit = { entry: Entry; score: number };

const STOP = new Set(
  "a an and are as at be by can do does for from has have how i in is it me my of on or so the this to was what when where which who why with you your about tell daniel he his him".split(" "),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9#+.\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.\-]+|[.\-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

/** Crude suffix stripping so "projects", "building" and "built" can meet their roots. */
function stem(t: string): string {
  if (t.length > 5 && t.endsWith("ing")) return t.slice(0, -3);
  if (t.length > 4 && t.endsWith("ed")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("ies")) return t.slice(0, -3) + "y";
  if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) return t.slice(0, -1);
  return t;
}

export function buildIndex(entries: Entry[]) {
  const docs = entries.map((entry) => {
    const fields = [
      { tokens: tokenize(entry.title), w: 3 },
      { tokens: tokenize(entry.keywords ?? ""), w: 3 },
      { tokens: tokenize(entry.text), w: 1 },
    ];
    const tf = new Map<string, number>();
    let len = 0;
    for (const f of fields) {
      for (const t of f.tokens) {
        tf.set(t, (tf.get(t) ?? 0) + f.w);
        len += 1;
      }
    }
    return { entry, tf, len };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const avg = docs.reduce((a, d) => a + d.len, 0) / Math.max(docs.length, 1);
  return { docs, df, avg, n: docs.length };
}

export type Index = ReturnType<typeof buildIndex>;

const K1 = 1.4;
const B = 0.6;

export function search(index: Index, query: string, limit = 4): Hit[] {
  const terms = [...new Set(tokenize(query))];
  if (terms.length === 0) return [];
  const hits: Hit[] = [];
  for (const d of index.docs) {
    let score = 0;
    let matched = 0;
    for (const t of terms) {
      const f = d.tf.get(t);
      if (!f) continue;
      matched += 1;
      const idf = Math.log(1 + (index.n - (index.df.get(t) ?? 0) + 0.5) / ((index.df.get(t) ?? 0) + 0.5));
      score += idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / index.avg)));
    }
    if (matched > 0) hits.push({ entry: d.entry, score: score * (0.6 + 0.4 * (matched / terms.length)) });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Below this the best hit is probably a coincidence, so the assistant says it doesn't know instead of guessing. */
export const MIN_CONFIDENT_SCORE = 1.2;
