export type Post = {
  slug: string; // must match a file in src/content/blog/<slug>.mdx
  title: string;
  description: string;
  date: string; // ISO date, YYYY-MM-DD
  tags: string[];
};

/** Add a post: create src/content/blog/<slug>.mdx and add its entry here (newest first). */
export const posts: Post[] = [
  {
    slug: "crypto-ch4-aes-and-file-encryption",
    title: "AES by hand, then a file encryptor done right",
    description:
      "Tracing one AES round against the FIPS-197 example, benchmarking AES-NI, and building an AES-256-GCM file tool that detects truncation and reordering.",
    date: "2026-10-21",
    tags: ["cryptography", "aes", "series"],
  },
  {
    slug: "crypto-ch3-des-meet-in-the-middle",
    title: "DES, meet-in-the-middle, and why 2DES isn't twice as strong",
    description:
      "A traced Feistel round, a meet-in-the-middle attack that needs 2^17 operations instead of 2^32, and measured 3DES vs AES throughput.",
    date: "2026-10-21",
    tags: ["cryptography", "des", "series"],
  },
  {
    slug: "crypto-ch2-stream-ciphers",
    title: "Stream ciphers: the one-time pad, nonce reuse and a broken LFSR",
    description:
      "Why reusing a keystream is catastrophic, how to detect it with one bit of statistics, and recovering an LFSR from 48 known bits.",
    date: "2026-10-21",
    tags: ["cryptography", "stream-ciphers", "series"],
  },
  {
    slug: "crypto-ch1-classical-ciphers",
    title: "Breaking classical ciphers: why secrecy can't live in the algorithm",
    description:
      "A substitution cipher has 2^88 keys and still falls to 400 characters of ciphertext. What that teaches about Kerckhoffs's principle and key length.",
    date: "2026-10-21",
    tags: ["cryptography", "classical-ciphers", "series"],
  },
  {
    slug: "how-this-site-is-built",
    title: "How this portfolio is built",
    description:
      "The stack, the design system and the handful of decisions behind this site, including the ones I'd revisit.",
    date: "2026-10-21",
    tags: ["nextjs", "design", "meta"],
  },
];

export function formatDate(iso: string) {
  // Fixed locale and UTC so server and client always agree.
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
