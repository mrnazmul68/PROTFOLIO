export interface NavItem {
  label: string;
  href: string;
  section: string;
}

export type SocialKey =
  | "github"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "email";

export type SocialProfileKey = Exclude<SocialKey, "email">;

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

export interface TimelineMilestone {
  id: string;
  index: string;
  phase: string;
  title: string;
  description: string;
  current?: boolean;
}

export interface Service {
  index: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: "frontend" | "backend" | "fullstack" | "performance";
}

export type SkillStatus = "working" | "exploring";

export interface Skill {
  name: string;
  icon: string;
  status: SkillStatus;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}
