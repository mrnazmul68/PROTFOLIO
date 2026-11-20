import type { SkillGroup } from "@/types/profile";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces, interactions and the details in between.",
    skills: [
      { name: "HTML5", icon: "html", status: "working" },
      { name: "CSS3", icon: "css", status: "working" },
      { name: "JavaScript", icon: "js", status: "working" },
      { name: "TypeScript", icon: "ts", status: "working" },
      { name: "React.js", icon: "react", status: "working" },
      { name: "Next.js", icon: "next", status: "working" },
      { name: "Tailwind CSS", icon: "tailwind", status: "working" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs, authentication and the logic behind the screen.",
    skills: [
      { name: "Node.js", icon: "node", status: "working" },
      { name: "Express.js", icon: "express", status: "working" },
      { name: "REST APIs", icon: "api", status: "working" },
      { name: "Authentication", icon: "auth", status: "working" },
      { name: "Zod", icon: "zod", status: "working" },
      { name: "JWT", icon: "jwt", status: "working" },
    ],
  },
  {
    id: "database",
    title: "Database",
    description: "Structured data, clear relationships, reliable access.",
    skills: [
      { name: "MongoDB", icon: "mongodb", status: "working" },
      { name: "PostgreSQL", icon: "postgres", status: "working" },
      { name: "Prisma", icon: "prisma", status: "working" },
      { name: "Mongoose", icon: "mongoose", status: "working" },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    description: "The workflow around the work.",
    skills: [
      { name: "Git", icon: "git", status: "working" },
      { name: "GitHub", icon: "github", status: "working" },
      { name: "Docker", icon: "docker", status: "exploring" },
      { name: "AWS", icon: "aws", status: "exploring" },
      { name: "CI/CD", icon: "cicd", status: "exploring" },
      { name: "Postman", icon: "postman", status: "working" },
    ],
  },
  {
    id: "exploring",
    title: "Currently Exploring",
    description: "Deliberate next steps in the learning path.",
    skills: [
      { name: "System Design", icon: "system", status: "exploring" },
      { name: "Advanced TypeScript", icon: "advanced-ts", status: "exploring" },
      { name: "Cloud Infrastructure", icon: "cloud", status: "exploring" },
      { name: "AI / ML Integration", icon: "ai", status: "exploring" },
    ],
  },
];

export const marqueeSkills = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Express",
  "Tailwind CSS",
  "MongoDB",
  "Prisma",
  "Docker",
  "GSAP",
  "System Design",
];
