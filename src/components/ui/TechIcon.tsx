import {
  Braces,
  BrainCircuit,
  Cloud,
  CloudCog,
  Network,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siGithubactions,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMongoose,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  siZod,
} from "simple-icons";

import { cn } from "@/lib/utils";

const brandPaths: Record<string, string> = {
  html: siHtml5.path,
  css: siCss.path,
  js: siJavascript.path,
  ts: siTypescript.path,
  react: siReact.path,
  next: siNextdotjs.path,
  tailwind: siTailwindcss.path,
  node: siNodedotjs.path,
  express: siExpress.path,
  zod: siZod.path,
  jwt: siJsonwebtokens.path,
  mongodb: siMongodb.path,
  postgres: siPostgresql.path,
  prisma: siPrisma.path,
  mongoose: siMongoose.path,
  git: siGit.path,
  github: siGithub.path,
  docker: siDocker.path,
  cicd: siGithubactions.path,
  postman: siPostman.path,
  "advanced-ts": siTypescript.path,
};

const lucideIcons: Record<string, LucideIcon> = {
  api: Braces,
  auth: ShieldCheck,
  aws: Cloud,
  system: Network,
  cloud: CloudCog,
  ai: BrainCircuit,
  workflow: Workflow,
};

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  const brandPath = brandPaths[name];

  if (brandPath) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={cn("size-5", className)}
      >
        <path d={brandPath} />
      </svg>
    );
  }

  const Icon = lucideIcons[name] ?? Braces;

  return (
    <Icon
      className={cn("size-5", className)}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}
