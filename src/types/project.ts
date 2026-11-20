export type ProjectVisual =
  | "nexora"
  | "tasks"
  | "shortener"
  | "market"
  | "chatbot";

export interface Project {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  visual: ProjectVisual;
}

export type ProjectFilter = "All" | "Full Stack" | "Frontend" | "Backend";
