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
    summary: "Building secure enterprise knowledge, agentic workflow, and cloud-native backend platforms.",
    achievements: [
      "Built NexusAI Hybrid RAG with ChromaDB dense retrieval, BM25 keyword search, reranking, OCR, verified citations, and multi-format enterprise ingestion.",
      "Implemented a LangGraph supervisor with typed agent handoffs, risk policy, human approval, and separation of duties before MCP tool execution.",
      "Engineered TAG requirement-to-automation workflows with FastAPI, LangChain, PostgreSQL, and WebSockets, reducing manual QA effort by approximately 60%.",
      "Applied JWT, Argon2, multi-tenant RBAC, source ACLs, prompt-injection detection, PII redaction, audit logging, Prometheus, and Grafana controls.",
      "Validated critical NexusAI workflows with 121 automated backend tests and Playwright browser smoke tests.",
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

export const certifications = profileConfig.certifications;
