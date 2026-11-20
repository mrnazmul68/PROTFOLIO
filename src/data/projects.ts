import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "nexora-ecommerce",
    index: "01",
    title: "Nexora E-Commerce",
    subtitle: "A considered storefront, end to end.",
    category: "Full Stack",
    description:
      "A modern e-commerce platform with product discovery, authentication, shopping cart functionality, and a scalable backend architecture.",
    longDescription:
      "Nexora is a full-stack commerce build focused on the core shopping journey: discovering products, creating an account, and managing a cart. The frontend pairs a responsive Next.js interface with a TypeScript and Express API, while MongoDB provides the data layer. The project explores how a clear component system and a separated backend can make a storefront easier to extend.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    highlights: [
      "Product discovery and browsing experience",
      "Account authentication flow",
      "Shopping cart interactions",
      "API-backed product data",
      "Responsive component system",
    ],
    liveUrl: "https://nexora-mart-five.vercel.app",
    repoUrl: null,
    featured: true,
    visual: "nexora",
  },
  {
    slug: "task-manager",
    index: "02",
    title: "Task Manager",
    subtitle: "Order, focus, repeat.",
    category: "Full Stack",
    description:
      "A full-stack task management application focused on secure authentication, task organization, and backend architecture.",
    longDescription:
      "A full-stack task management project built to explore the shape of a real authenticated application. It combines a TypeScript frontend with an Express API, MongoDB persistence, JWT-based authentication, and Redis as part of the backend toolchain. The focus is on protected routes, clear task organisation, and maintainable server-side structure.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "JWT",
    ],
    highlights: [
      "Authentication-focused application structure",
      "Per-user task organisation",
      "Protected API routes",
      "MongoDB data modelling",
      "Redis in the backend stack",
    ],
    liveUrl: null,
    repoUrl: null,
    featured: true,
    visual: "tasks",
  },
  {
    slug: "url-shortener",
    index: "03",
    title: "URL Shortener",
    subtitle: "Long links, made quiet.",
    category: "Backend",
    description:
      "A URL shortening service with efficient URL management and a PostgreSQL-powered backend.",
    longDescription:
      "A compact URL shortening service built with Node.js, TypeScript, Express, PostgreSQL, and Prisma. The project is an exercise in API design and relational data: accepting a destination URL, generating a short code, persisting it, and resolving redirects through a clean backend structure.",
    technologies: [
      "Node.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
    ],
    highlights: [
      "Short-code generation and redirect flow",
      "Relational schema designed with Prisma",
      "PostgreSQL persistence",
      "Input validation and API error handling",
      "Focused, minimal service interface",
    ],
    liveUrl: "https://snip-chi-one.vercel.app/",
    repoUrl: null,
    featured: true,
    visual: "shortener",
  },
  {
    slug: "supermarket-simulator",
    index: "04",
    title: "Supermarket Simulator",
    subtitle: "A small world you can wander.",
    category: "Frontend",
    description:
      "An interactive first-person supermarket simulation where users can explore shelves, collect products, manage a shopping cart, and complete checkout.",
    longDescription:
      "An interactive first-person supermarket simulation built for the browser. Users can move through the store, explore shelves, pick up products, manage a shopping cart, and complete a checkout flow. The project brings together React and TypeScript with Three.js for the 3D environment, Zustand for state, and Tailwind CSS for the surrounding interface.",
    technologies: ["React", "TypeScript", "Three.js", "Zustand", "Tailwind CSS"],
    highlights: [
      "First-person store exploration",
      "Shelf and product interaction",
      "Shopping cart state management",
      "Checkout flow",
      "Browser-based 3D environment",
    ],
    liveUrl: null,
    repoUrl: null,
    featured: true,
    visual: "market",
  },
  {
    slug: "ai-chatbot",
    index: "05",
    title: "AI Chatbot",
    subtitle: "A conversation-first interface.",
    category: "Full Stack",
    description:
      "A conversational web application exploring a focused chat experience, responsive interface design, and practical AI integration.",
    longDescription:
      "An AI chatbot project built as a focused web experience. The application centres on a clean conversation interface and a responsive layout, using Next.js, React, TypeScript, and Tailwind CSS. It is a practical space for exploring how AI-powered interactions can feel clear and considered rather than cluttered.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Focused conversational interface",
      "Responsive chat layout",
      "Clear interaction states",
      "Component-driven frontend",
    ],
    liveUrl: "https://ai-bot-theta-ten.vercel.app/",
    repoUrl: null,
    featured: false,
    visual: "chatbot",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
