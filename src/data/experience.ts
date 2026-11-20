import type { TimelineMilestone } from "@/types/profile";

export const journey: TimelineMilestone[] = [
  {
    id: "web-foundations",
    index: "01",
    phase: "Foundations",
    title: "Started learning web development",
    description:
      "Began with the fundamentals of the web — semantic HTML, responsive CSS, and the small decisions that make an interface feel considered.",
  },
  {
    id: "javascript-typescript",
    index: "02",
    phase: "Languages",
    title: "Explored JavaScript and TypeScript",
    description:
      "Moved from syntax into language behaviour: the DOM, asynchronous JavaScript, types, and writing code that is easier to reason about.",
  },
  {
    id: "full-stack",
    index: "03",
    phase: "Applications",
    title: "Started building full-stack applications",
    description:
      "Connected React and Next.js frontends to Node.js and Express APIs, learning how data, state and interfaces meet in a real application.",
  },
  {
    id: "backend-data",
    index: "04",
    phase: "Architecture",
    title: "Learned backend architecture and database management",
    description:
      "Explored authentication, REST API structure, MongoDB and PostgreSQL, Prisma and Mongoose — and why data modelling matters early.",
  },
  {
    id: "devops-cloud",
    index: "05",
    phase: "Infrastructure",
    title: "Started exploring DevOps, Docker and cloud technologies",
    description:
      "Taking the next step beyond the application: containers, deployment workflows, CI/CD and the infrastructure that supports a product.",
  },
  {
    id: "cse-degree",
    index: "06",
    phase: "Now",
    title: "Studying CSE and strengthening software engineering fundamentals",
    description:
      "Currently in my 1st semester of Computer Science and Engineering at Port City International University, pairing academic foundations with continuous project work.",
    current: true,
  },
];
