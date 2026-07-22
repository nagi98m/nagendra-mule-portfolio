import type { SkillGroup, SocialLinks } from "@/types/portfolio";
import { profileConfig } from "@/config/profile";

export const portfolio = {
  name: profileConfig.name,
  initials: profileConfig.initials,
  role: profileConfig.role,
  experience: profileConfig.experience,
  location: profileConfig.location,
  availability: "Open to backend, GenAI & AI platform roles",
  summary:
    "I engineer production AI platforms where dependable Python services, agentic workflows, enterprise security, and cloud infrastructure work as one system.",
  about:
    "Backend and AI engineer with 4.9 years of experience delivering enterprise software across the full lifecycle—from API and data design to agent orchestration, authentication, observability, and cloud deployment. Recent work centers on Generative AI platforms, RAG patterns, and reliable agentic workflows built on production-grade Python foundations.",
  resumeUrl: profileConfig.resumeUrl,
  socials: profileConfig.socials satisfies SocialLinks,
};

export const experience = [
  {
    role: "Python & GenAI Engineer",
    company: "StaidLogic LLC",
    period: "Oct 2023 — Present",
    summary: "Building enterprise AI platforms and secure cloud-native backend services.",
    achievements: [
      "Engineered AI-driven QA workflows with FastAPI, LangChain, and LangGraph, reducing manual QA effort by approximately 60%.",
      "Designed asynchronous REST and WebSocket services backed by PostgreSQL and SQLAlchemy for long-running agentic workflows and real-time progress.",
      "Implemented Microsoft SSO, OAuth2, JWT, and role-based access controls for enterprise-grade platform security.",
      "Delivered serverless AWS services, production monitoring, analytics pipelines, and conversational automation integrations.",
    ],
  },
  {
    role: "Python Developer",
    company: "Signovate Technologies",
    period: "Nov 2021 — Oct 2023",
    summary: "Delivered backend APIs, automation services, and GCP cloud migrations.",
    achievements: [
      "Built Python backends using Django REST Framework, Flask, SQLAlchemy, MySQL, and RESTful integration patterns.",
      "Containerized and migrated services to Cloud Run and App Engine with Cloud SQL, Cloud Storage, and BigQuery integrations.",
      "Developed Selenium and Scrapy automation for catalog, operations, and data-processing workflows.",
      "Contributed across requirements, implementation, testing, deployment, and iterative Agile delivery.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "Primary expertise", skills: [{ name: "Python", primary: true }, { name: "FastAPI", primary: true }, { name: "Generative AI", primary: true }, { name: "LangGraph", primary: true }, { name: "LangChain", primary: true }, { name: "RAG", primary: true }, { name: "AWS", primary: true }, { name: "PostgreSQL", primary: true }] },
  { category: "Strong working experience", skills: [{ name: "Flask" }, { name: "Django REST Framework" }, { name: "Async SQLAlchemy" }, { name: "REST APIs" }, { name: "Microservices" }, { name: "WebSockets" }, { name: "Docker" }, { name: "GCP" }, { name: "OAuth2" }, { name: "JWT" }, { name: "Microsoft SSO" }, { name: "RBAC" }, { name: "Pytest" }] },
  { category: "Additional / familiar", skills: [{ name: "CrewAI" }, { name: "FAISS" }, { name: "ChromaDB" }, { name: "Pinecone", qualifier: "Familiar" }, { name: "Redis" }, { name: "React", qualifier: "Basic" }, { name: "Next.js", qualifier: "Familiar" }, { name: "TypeScript", qualifier: "Basic" }, { name: "JavaScript", qualifier: "Basic" }] },
];

export const impact = [
  { value: "60%", title: "Less manual QA effort", description: "Through AI-powered requirement and test automation workflows." },
  { value: "04", title: "AWS certifications", description: "Across cloud, AI, data engineering, and solutions architecture." },
  { value: "Multi-source", title: "AI ingestion", description: "Requirement workflows spanning Jira, VersionOne, Excel, and enterprise documents." },
  { value: "Enterprise", title: "Security by design", description: "Microsoft SSO, OAuth2/JWT authorization, RBAC, and managed secrets." },
];

export const certifications = profileConfig.certifications;

export const labProjects = [
  { repositoryName: "Agentic RAG Platform", status: "Planned", featured: true, description: "A production-minded reference architecture for cited, traceable retrieval and workflow orchestration.", stack: ["Python", "FastAPI", "LangGraph", "RAG", "Vector DB"], githubUrl: null, liveDemoUrl: null },
  { repositoryName: "AI Requirement Analyzer", status: "Planned", featured: true, description: "A privacy-safe pipeline from requirements through validation, enhancement, and test cases.", stack: ["Python", "FastAPI", "LLM", "RAG"], githubUrl: null, liveDemoUrl: null },
  { repositoryName: "Production FastAPI Starter", status: "Planned", featured: true, description: "An opinionated service foundation for secure, observable, asynchronous APIs.", stack: ["FastAPI", "Async SQLAlchemy", "PostgreSQL", "JWT/RBAC", "Docker", "Pytest"], githubUrl: null, liveDemoUrl: null },
];
