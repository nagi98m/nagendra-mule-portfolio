export type SocialLinks = {
  github: string | null;
  linkedin: string | null;
  email: string | null;
};

export type ArchitectureStep = {
  label: string;
  detail?: string;
};

export type EvidenceLink = {
  label: string;
  url: string;
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
  operatingEnvironment?: string;
  workflow?: ArchitectureStep[];
  tradeoffs?: string[];
  reliability?: string[];
  testing?: string[];
  deployment?: string[];
  projectType?: "Internal Platform" | "Enterprise Platform" | "Cloud Platform" | null;
  evaluation?: { label: string; value: string }[] | null;
  whatIDWouldDoDifferently?: string[] | null;
  artifacts?: EvidenceLink[];
  visibility: "private" | "public";
  github: string | null;
  demo: string | null;
  accent: "cyan" | "violet" | "amber";
  featured?: boolean;
  headlineMetric?: {
    value: string;
    label: string;
  };
};

export type SkillLevel = "Production" | "Working" | "Familiar";

export type SkillGroup = {
  category: string;
  summary: string;
  context: string;
  relatedProjects: string[];
  skills: { name: string; level: SkillLevel }[];
};

export type WritingArticle = {
  slug: string;
  title: string;
  summary: string | null;
  published: boolean;
  publishedAt: string | null;
  url: string | null;
};

export type Testimonial = {
  quote: string;
  person: string;
  role: string;
  company: string | null;
  approved: boolean;
};
