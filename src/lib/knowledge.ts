import { about, experience, site, writing } from "@/data/site";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { skillGroups, strengths } from "@/data/skills";
import type { Entry } from "@/lib/search";

/**
 * Everything the assistant is allowed to say. It is assembled from the same data files that render the site, so the
 * assistant can't drift from the page. Deliberately excluded: phone number and student ID (they are not in the data).
 */
export function buildKnowledge(): Entry[] {
  const answers: Entry[] = [
    {
      id: "availability",
      kind: "Answer",
      title: "Is Daniel available for work?",
      text: `${site.availability}. The quickest way to start a conversation is email: ${site.email}.`,
      href: "/#contact",
      keywords: "hire hiring available availability gig gigs freelance job internship opportunity work looking open",
    },
    {
      id: "contact",
      kind: "Answer",
      title: "How do I contact Daniel?",
      text: `Email ${site.email}, or find Daniel on ${site.socials.map((s) => s.label).join(", ")}.`,
      href: "/#contact",
      keywords: "contact email reach message talk social linkedin github twitter instagram threads",
    },
    {
      id: "cv",
      kind: "Answer",
      title: "Where is the CV?",
      text: "The CV is a PDF you can download. It is a redacted copy without a phone number or student ID.",
      href: site.cvPath ?? "/#contact",
      keywords: "cv resume download pdf",
    },
    {
      id: "about",
      kind: "Answer",
      title: "Who is Daniel?",
      text: about.paragraphs[0],
      href: "/#about",
      keywords: "who about introduce background student university nile education study degree",
    },
    {
      id: "experience",
      kind: "Answer",
      title: `Experience: ${experience[0].role} at ${experience[0].org}`,
      text: `${experience[0].period}. ${experience[0].points[0]}`,
      href: "/#about",
      keywords: "experience internship intern bitnob siwes work history job",
    },
    {
      id: "writing",
      kind: "Answer",
      title: "Does Daniel write?",
      text: `Yes. ${writing.map((w) => `${w.platform} (${w.handle}): ${w.blurb}`).join(" ")} This site also has a blog with a hands-on applied cryptography series.`,
      href: "/blog",
      keywords: "write writing blog articles medium substack essays posts read",
    },
    {
      id: "projects-overview",
      kind: "Answer",
      title: "What has Daniel built?",
      text: `${projects.map((p) => `${p.title} (${p.status})`).join(", ")}. Each project has a summary, stack and highlights on the projects page.`,
      href: "/projects",
      keywords: "built build made created projects portfolio work apps shipped",
    },
    {
      id: "crypto-series",
      kind: "Answer",
      title: "What does the cryptography series cover?",
      text: "A hands-on applied cryptography series: 13 chapters from classical ciphers and AES to RSA, Diffie-Hellman, elliptic curves, signatures, hashing, MACs, PKI and a mini TLS. Every solution is tested and every number is measured; the code is public on GitHub.",
      href: "/blog",
      keywords: "cryptography crypto series chapters applied course learn tutorial github repo",
    },
    {
      id: "private-details",
      kind: "Answer",
      title: "Phone number or student ID?",
      text: `Not shared on this site. Email ${site.email} and Daniel can follow up with the right channel.`,
      href: "/#contact",
      keywords: "phone number call whatsapp telephone student id matric address",
    },
  ];

  const skills: Entry = {
    id: "skills",
    kind: "Skills",
    title: "Skills and tools",
    text: `${skillGroups.map((g) => `${g.group}: ${g.items.join(", ")}`).join(". ")}. Strengths: ${strengths.join(", ")}.`,
    href: "/#about",
    keywords: "skills stack tech technologies languages tools frameworks know use proficient strengths",
  };

  const projectEntries: Entry[] = projects.map((p) => ({
    id: `project-${p.slug}`,
    kind: "Project",
    title: p.title,
    text: `${p.summary} ${p.highlights[0] ?? ""} Role: ${p.role}. Stack: ${p.stack.join(", ")}. Status: ${p.status}.`,
    href: "/projects",
    keywords: `project built build ${p.stack.join(" ")}`,
  }));

  const postEntries: Entry[] = posts.map((p) => ({
    id: `post-${p.slug}`,
    kind: "Post",
    title: p.title,
    text: p.description,
    href: `/blog/${p.slug}`,
    keywords: `blog post article ${p.tags.join(" ")}`,
  }));

  return [...answers, skills, ...projectEntries, ...postEntries];
}

export const suggestedQuestions = [
  "Is Daniel available for work?",
  "What has Daniel built?",
  "What does the cryptography series cover?",
  "Which technologies does Daniel use?",
  "How do I get the CV?",
];
