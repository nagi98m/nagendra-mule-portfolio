# Portfolio Blueprint

## Proposed sitemap

- `/` — recruiter-first portfolio home
  - Home
  - Engineering impact
  - About
  - Technical expertise
  - Industry experience
  - Featured projects
  - Experience
  - Certifications
  - Contact
- `/projects/nexusai-enterprise-copilot` — flagship internal platform case study
- `/projects/tag-ai-platform` — AI-powered QA automation case study
- `/projects/ivacs` — enterprise voice AI case study
- `/projects/ecommerce-cloud-platform` — e-commerce and GCP migration case study
- `/resume-admin` — disabled-by-default local owner tool
- Future `/writing/[slug]` routes — publish only when an approved article has real content

Writing and testimonials are represented in the content model but remain absent from public navigation until approved content exists.

## Visual design system

- Dark graphite base with layered navy surfaces.
- Emerald is the primary status/action accent; cobalt, violet, and amber are secondary project accents.
- Geist Sans is used for prose and Geist Mono for metrics, labels, system steps, and evidence.
- Cards use restrained borders, modest elevation, and compact spacing instead of glass or neon effects.
- Motion is limited to entrance disclosure and short interaction feedback, with a reduced-motion override.
- Focus indicators, semantic landmarks, keyboard-operable controls, and AA-oriented contrast are required.

## Component structure

```text
RootLayout
├── Navbar
├── Home
│   ├── Hero
│   ├── RecruiterQuickView
│   ├── EngineeringImpact
│   ├── About
│   ├── Skills
│   ├── IndustryExperience
│   ├── FeaturedProjects
│   ├── Writing (conditional)
│   ├── Experience
│   ├── Credentials
│   └── Contact
├── ProjectPage
│   ├── ArchitectureDiagram
│   └── evidence-based detail sections
├── Footer
└── AIResumeAssistant (lazy client boundary)
```

## Content-data schema

- `src/config/profile.ts` — identity, public links, location, certifications, resume state.
- `src/data/portfolio.ts` — positioning, experience, capability groups, and certification content.
- `src/data/projects.ts` — case studies, diagrams, evidence, optional links, and optional evaluation fields.
- `src/data/industry.ts` — business-domain mapping to public case-study routes.
- `src/data/writing.ts` — MDX-ready article metadata; unpublished entries are never rendered.
- `src/data/testimonials.ts` — approved testimonial schema; an empty list renders no section.
- `src/types/portfolio.ts` — shared content contracts.

Unknown evidence is stored as `null` or an empty list and hidden by presentation components.

## Missing-information checklist

- Approved resume PDF and optional DOCX.
- Verified LinkedIn URL.
- Four AWS Credly verification URLs, issue dates, and expiration dates where applicable.
- Public project repositories or sanitized artifact URLs.
- NexusAI evaluation results: precision@k, citation correctness, groundedness, task completion, latency, cost, token use, and hallucination rate.
- Approved technical articles with complete content and publication URLs.
- Approved testimonials.
- Optional production contact-form endpoint.
- Production FastAPI URL and completed production AI assistant smoke test.

## Claims requiring verification

Do not display these as facts until evidence is supplied:

- Sub-second latency.
- Thousands of daily transactions.
- High availability or zero-downtime deployment.
- Exact user, document, concurrency, traffic, cost, or savings figures.
- Exact retrieval or agent evaluation results beyond the repository's portfolio-assistant evaluation.
- Public availability of proprietary source code or demos.

Currently approved visible outcomes are limited to:

- 60% reduction in manual QA effort for TAG.
- Voice automation across three industry verticals.
- Four listed AWS certifications without unverified credential badges.
- Professional experience beginning in November 2021.
- NexusAI Hybrid RAG using ChromaDB and BM25.
- TAG authentication using Microsoft SSO, JWT, and RBAC.
- IVACS use of Amazon Connect, Lex, and Lambda.
- NexusAI validation with 121 automated backend tests and Playwright smoke coverage.
