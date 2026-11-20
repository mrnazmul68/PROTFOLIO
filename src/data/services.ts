import type { Service } from "@/types/profile";

export const services: Service[] = [
  {
    index: "01",
    title: "Frontend Development",
    description:
      "Responsive interfaces built around clarity, pacing and a genuine attention to interaction detail.",
    capabilities: [
      "Responsive interfaces",
      "Modern React applications",
      "Interactive user experiences",
    ],
    icon: "frontend",
  },
  {
    index: "02",
    title: "Backend Development",
    description:
      "Structured APIs and server-side logic that give an application a dependable foundation.",
    capabilities: [
      "REST API development",
      "Authentication systems",
      "Database integration",
    ],
    icon: "backend",
  },
  {
    index: "03",
    title: "Full Stack Development",
    description:
      "Complete web applications, from the first interface decision to the final API route.",
    capabilities: [
      "Complete web application development",
      "Frontend and backend integration",
      "Scalable application architecture",
    ],
    icon: "fullstack",
  },
  {
    index: "04",
    title: "Website Optimization",
    description:
      "Making existing experiences faster, more resilient and easier to maintain over time.",
    capabilities: [
      "Performance improvements",
      "Responsive design",
      "Code quality and maintainability",
    ],
    icon: "performance",
  },
];
