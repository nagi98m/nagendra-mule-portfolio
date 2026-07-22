export type SocialLinks = {
  github: string | null;
  linkedin: string | null;
  email: string | null;
};

export type ArchitectureStep = {
  label: string;
  detail?: string;
};

export type Project = {
  slug: string;
  seoTitle: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  problem: string;
  solution: string;
  role: string[];
  implementation: string[];
  decisions: string[];
  features: string[];
  challenges: string[];
  security: string[];
  impact: string[];
  takeaways: string[];
  technologies: string[];
  architecture: ArchitectureStep[];
  visibility: "private" | "public";
  github: string | null;
  demo: string | null;
  accent: "cyan" | "violet" | "amber";
};

export type SkillGroup = {
  category: string;
  skills: { name: string; primary?: boolean; qualifier?: string }[];
};
