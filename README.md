# Nagendra Mule — AI Engineer Portfolio

A recruiter-focused portfolio that demonstrates Python backend, Generative AI, RAG, cloud architecture, and enterprise delivery through detailed case studies and a live, cited AI Resume Assistant.

Repository: `https://github.com/nagi98m/nagendra-mule-portfolio`

## Architecture

```text
Next.js Portfolio
├── Project Case Studies
├── Recruiter Quick View
├── AI Engineering Lab
└── AI Resume Chat
          │
          ▼
       FastAPI
          │
          ▼
  Validation + RAG Retriever
          │
     ┌────┴────┐
     │         │
   Resume   Portfolio + Projects
     │         │
     └────┬────┘
          │
       FAISS index
          │
          ▼
 OpenAI-compatible LLM
 (or grounded local fallback)
```

The frontend uses Next.js 16, React 19, strict TypeScript, Tailwind CSS 4, Motion, Lucide, and Zod. The backend uses Python 3.11+, FastAPI, Pydantic, deterministic local embeddings, FAISS, HTTPX, and pytest.

The assistant is intentionally a focused RAG pipeline rather than a multi-agent system. It retrieves approved professional facts and returns source metadata. Without an LLM key it remains fully usable through grounded extractive answers.

## Project structure

```text
src/
  app/                     Pages, case studies, SEO, contact API
  components/ai/           Chat interface and Ask AI actions
  components/analytics/    Privacy-safe event hooks
  components/sections/     Homepage and Recruiter Quick View
  config/profile.ts        Central personal/profile configuration
  data/                    Typed portfolio and project content
backend/
  app/                     FastAPI, retrieval, providers, security
  data/resume/             Approved resume knowledge
  data/portfolio/          Experience and credential knowledge
  data/projects/           Approved case-study knowledge
  tests/                   API, retrieval, and safety tests
  Dockerfile
public/resume/              Approved resume asset location
```

## Frontend setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Frontend: `http://localhost:3000`

Frontend environment variables:

- `NEXT_PUBLIC_SITE_URL`: canonical production origin
- `NEXT_PUBLIC_LINKEDIN_URL`: blank hides LinkedIn links
- `NEXT_PUBLIC_CONTACT_EMAIL`: blank hides the direct email address
- `NEXT_PUBLIC_API_URL`: FastAPI origin; blank falls back to `http://localhost:8000` for local development

The verified GitHub URL is centralized in `src/config/profile.ts`. Every `NEXT_PUBLIC_` value is embedded in browser assets at build time and must never contain a secret.

## Backend setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --port 8000
```

Backend API: `http://localhost:8000`
Swagger documentation: `http://localhost:8000/docs`

Backend environment variables:

- `LLM_API_KEY`: provider secret; leave blank for local extractive mode
- `LLM_MODEL`: model identifier required when a key is supplied
- `LLM_BASE_URL`: OpenAI-compatible API base URL
- `LLM_AUTH_HEADER`: `Authorization` for OpenAI/Groq-compatible APIs or a provider-specific header such as `api-key`
- `ALLOWED_ORIGINS`: comma-separated exact frontend origins; wildcard `*` is rejected
- `PORT`: container/runtime port, default `8000`
- `RETRIEVAL_TOP_K`: retrieved source limit
- `CHAT_RATE_LIMIT` and `CHAT_RATE_WINDOW_SECONDS`: basic abuse controls

This provider configuration supports OpenAI-compatible services without coupling retrieval or API logic to a specific vendor. Azure deployments may additionally require a deployment-specific base URL.

## Knowledge indexing

Approved source documents are JSON arrays inside `backend/data`. Each record contains:

- Stable ID
- User-facing source label and section
- Portfolio URL when available
- Approved factual text
- Category/project metadata

The backend loads these records at startup, creates deterministic local embeddings, and builds an in-memory FAISS cosine-similarity index. No resume text or embedding is sent to an external service during indexing.

To update knowledge:

1. Update the relevant JSON source without adding confidential information.
2. Keep each record focused on one semantic topic.
3. Add a stable source label, section, and public portfolio URL.
4. Restart the backend to rebuild the index.
5. Run `pytest` to confirm retrieval and unsupported-question behavior.

## Tests and production checks

```powershell
npm run lint
npm run typecheck
npm run build

cd backend
.\.venv\Scripts\python.exe -m pytest -q
```

Tests cover health reporting, Pydantic limits, FAISS retrieval, source metadata, unsupported questions, prompt-injection handling, and upstream provider failures. Tests never invoke a paid model.

With the production frontend running on port 3000 and FastAPI on port 8000, run the real-browser suite:

```powershell
npm run test:e2e
```

It uses the locally installed Chrome by default and verifies the homepage, 320/375/390/768px layouts, mobile navigation and touch targets, Recruiter Quick View, successful/unsupported/error chat states, TAG citations, all three case studies, contact validation/fallback, and configured or missing profile links. Set `BROWSER_PATH` if Chrome is installed elsewhere.

## Profile and credential integration

All public profile configuration lives in `src/config/profile.ts` and can use the public environment variables above.

### Resume

1. Add the approved PDF as `public/resume/Nagendra-Mule-Python-GenAI-Engineer-Resume.pdf`.
2. Set `resumeUrl` in `src/config/profile.ts` to `/resume/Nagendra-Mule-Python-GenAI-Engineer-Resume.pdf`.
3. Rebuild and run E2E tests. Resume actions automatically switch from the disabled state to real download links and emit `resume_download`.

### LinkedIn and public email

- Set `NEXT_PUBLIC_LINKEDIN_URL` to the exact HTTPS profile URL. Blank values render no LinkedIn action.
- Set `NEXT_PUBLIC_CONTACT_EMAIL` only to an address intended for public display. Blank values keep direct-email and recruiter quick-contact actions hidden.

### AWS credentials

Add verified credential URLs to the matching entries in `src/config/profile.ts`. A `Verify credential` action renders only for a non-null URL; no placeholder IDs or broken buttons are shown.

### Contact delivery

The contact route validates input, applies a honeypot and a basic rate limit, and currently returns an honest unavailable response. No email-provider variables are advertised because delivery is not implemented. A future provider must be integrated and tested server-side in `src/app/api/contact/route.ts` before its secret variables are documented or configured.

## Docker

Build and run the backend only:

```powershell
docker build -t nagendra-ai-resume ./backend
docker run --rm -p 8000:8000 --env-file backend/.env nagendra-ai-resume
```

The container binds to `0.0.0.0` and uses the hosting platform's `PORT`, defaulting to `8000`. It copies both `app/` and `data/`, so FAISS initializes from the approved knowledge base during application startup. The production startup command outside Docker is:

```text
uvicorn app.main:app --host 0.0.0.0 --port <platform-port>
```

Generic backend hosting requirements are Python 3.11+, HTTPS termination, persistent process/container support, enough memory to initialize NumPy and FAISS, environment-variable injection, and an HTTP health check against `/health`. The frontend remains compatible with a Vercel-style Next.js deployment.

## Deployment

```text
Browser -> Production Next.js frontend -> HTTPS FastAPI backend
        -> RAG retriever -> approved knowledge base -> optional LLM provider
```

1. Review `DEPENDENCY_SECURITY.md` and resolve or explicitly accept the monitored upstream risk.
2. Deploy the FastAPI container to a Python/container host and verify `/health`.
3. Set `ALLOWED_ORIGINS` to the exact final frontend HTTPS origin.
4. Configure an OpenAI-compatible provider only if desired; blank credentials retain local extractive mode.
5. Deploy the Next.js app with `NEXT_PUBLIC_API_URL` pointing to the HTTPS backend and `NEXT_PUBLIC_SITE_URL` set to the final frontend origin.
6. Run `PRE_DEPLOYMENT_CHECKLIST.md` and `PRODUCTION_SMOKE_TEST.md` against the real URLs.

Both production origins must use HTTPS. An HTTPS frontend configured with an HTTP backend will be blocked as mixed content and is not a valid deployment.

## GitHub project showcase

AI Engineering Lab entries live in `src/data/portfolio.ts` and support repository name, description, stack, GitHub URL, demo URL, status, and featured state. Keep URLs `null` and status `Planned` or `Building` until real public repositories exist.

## Privacy and security

- The assistant answers only from the approved knowledge directory.
- It refuses prompt/system-secret extraction requests.
- Input is normalized and limited to 800 characters.
- CORS, request rate limits, safe upstream errors, and source-based grounding are enabled.
- API keys remain server-side and `.env` files are ignored.
- Analytics hooks record only event names and safe metadata; chat questions and answers are never tracked.
- The in-memory limiter is suitable for a single instance. Use a shared Redis-backed limiter for multi-instance production deployment.

Run `npm audit --omit=dev` before each release. Current findings and the rejected force remediation are recorded in `DEPENDENCY_SECURITY.md`.

## Remaining profile inputs

- Approved resume PDF
- LinkedIn URL
- Public contact email
- Four AWS credential verification URLs
- Final production domain
- Production backend URL
- Contact email-provider integration
- Real GitHub repository and demo URLs for planned lab projects

## Troubleshooting

- **Chat says unavailable:** confirm FastAPI is running and `NEXT_PUBLIC_API_URL` matches its origin.
- **Browser reports a CORS error:** add the exact frontend origin, including scheme and port, to `ALLOWED_ORIGINS`, then restart FastAPI.
- **Chat answers locally without an LLM key:** this is expected; `local-extractive` mode remains grounded and cited.
- **Resume remains disabled:** verify the exact filename and `resumeUrl` configuration.
- **Contact returns 503:** expected until a real email provider is implemented; delivery is never simulated.
- **Chrome E2E cannot launch:** set `BROWSER_PATH` to the installed Chrome or Chromium executable.
