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
    slug: "crypto-deep-dive-nonce-reuse",
    title: "Deep dive: one mistake, three broken systems",
    description:
      "Keystream reuse, ElGamal and ECDSA all fall to the same error: a value that had to be fresh was used twice.",
    date: "2026-10-21",
    tags: ["cryptography", "nonces", "deep-dive"],
  },
  {
    slug: "crypto-ch13-pki-and-a-mini-tls",
    title: "Certificate validation, and a mini TLS built from the pieces",
    description:
      "A path validator tested against a local CA and two live sites, then a handshake that defeats the man in the middle, replay and truncation.",
    date: "2026-10-21",
    tags: ["cryptography", "pki", "tls", "series"],
  },
  {
    slug: "crypto-ch12-macs-hmac-and-padding-oracles",
    title: "HMAC, length extension and a padding oracle that reads your session",
    description:
      "Why hashing the key and message together fails, a 10,182-query padding oracle against MAC-then-encrypt, and signed webhooks.",
    date: "2026-10-21",
    tags: ["cryptography", "hmac", "series"],
  },
  {
    slug: "crypto-ch11-hash-functions-and-passwords",
    title: "Hash functions: avalanche, collisions and 37,000x slower passwords",
    description:
      "CRC32 passes the avalanche test and is still useless. Birthday collisions measured, and Argon2id against SHA-256 for password storage.",
    date: "2026-10-21",
    tags: ["cryptography", "hashing", "series"],
  },
  {
    slug: "crypto-ch10-digital-signatures",
    title: "RSA signatures byte for byte, and three ways to forge the textbook kind",
    description:
      "A from-scratch signature identical to OpenSSL's, forgeries that need no key, and the certificate chains of two live sites.",
    date: "2026-10-21",
    tags: ["cryptography", "signatures", "series"],
  },
  {
    slug: "crypto-ch9-elliptic-curves-and-ecdsa",
    title: "Elliptic curves by hand, and the repeated number that breaks ECDSA",
    description:
      "Adding points on a 17-element field, ECC against RSA and DH on speed and size, and recovering a private key from a reused nonce.",
    date: "2026-10-21",
    tags: ["cryptography", "ecc", "series"],
  },
  {
    slug: "crypto-deep-dive-mitm-authentication",
    title: "Deep dive: encryption without authentication protects you from the wrong person",
    description:
      "Mallory reads and edits a perfectly encrypted conversation. Short authentication strings, signed transcripts, and a bug in my own first draft.",
    date: "2026-10-21",
    tags: ["cryptography", "mitm", "deep-dive"],
  },
  {
    slug: "crypto-deep-dive-rsa-common-factors",
    title: "Deep dive: the RSA keys that fell to a GCD",
    description:
      "Two keys sharing a prime are both broken by a gcd. How weak randomness at first boot exposed real internet keys, reproduced on a toy fleet with batch GCD.",
    date: "2026-10-21",
    tags: ["cryptography", "rsa", "deep-dive"],
  },
  {
    slug: "crypto-ch8-diffie-hellman-and-authenticated-key-exchange",
    title: "Diffie-Hellman, ElGamal and an authenticated key exchange for chat",
    description:
      "Breaking a 40-bit group in 1.7 seconds, hijacking unauthenticated DH, fixing it with signatures, and a tested key-exchange design.",
    date: "2026-10-21",
    tags: ["cryptography", "diffie-hellman", "series"],
  },
  {
    slug: "crypto-ch7-rsa-padding-and-weak-keys",
    title: "RSA by hand, why padding matters, and keys that share primes",
    description:
      "A 61-and-53 key pair, three breaks of textbook RSA, 5,100x faster exponentiation, and recovering keys with a gcd.",
    date: "2026-10-21",
    tags: ["cryptography", "rsa", "series"],
  },
  {
    slug: "crypto-ch6-hybrid-encryption-and-mitm",
    title: "Hybrid encryption, and a man in the middle that nothing detects",
    description:
      "RSA decryption is about 15,000 times slower than AES-GCM, so wrap a key instead. And a simulation where Bob reads a message Mallory rewrote.",
    date: "2026-10-21",
    tags: ["cryptography", "public-key", "series"],
  },
  {
    slug: "crypto-ch5-modes-and-authentication",
    title: "The ECB penguin, GCM tamper detection and a TLS audit",
    description:
      "4,674 of 4,800 blocks repeat under ECB. Why unauthenticated CTR turns 100 dollars into 900, auditing real TLS, and a tamper-evident encrypted log.",
    date: "2026-10-21",
    tags: ["cryptography", "modes", "series"],
  },
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
