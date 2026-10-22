/** Side quests: the things that aren't projects or a job. Add one here and it appears in the "Side quests" section. */
export type Quest = { title: string; tag: string; body: string; href?: string };

export const quests: Quest[] = [
  {
    title: "Loverboy",
    tag: "full-time, unpaid",
    body: "No roadmap, no deadlines and zero tests. Somehow still the most demanding thing I've taken on.",
  },
  {
    title: "The Crypto Grind",
    tag: "13 chapters · 141 tests",
    body: "Teaching myself applied cryptography by building every attack and every defence, then publishing the measured numbers.",
    href: "https://github.com/DanDeeLegend/cryptography-grind",
  },
  {
    title: "Breaking my own code on purpose",
    tag: "Padding Scheme Explorer",
    body: "I ship deliberately buggy versions next to the correct one, so the tests can show exactly how each bug fails.",
    href: "https://github.com/DanDeeLegend/padding-scheme-explorer",
  },
  {
    title: "Substack essays",
    tag: "faith · growth · reflection",
    body: "The writing that has nothing to do with code, and probably tells you more about me than the code does.",
    href: "https://substack.com/@dannii0",
  },
  {
    title: "Campus signal hunting",
    tag: "SignalMap",
    body: "Finding out which buildings on campus actually get network, one student report at a time.",
    href: "/projects",
  },
];
