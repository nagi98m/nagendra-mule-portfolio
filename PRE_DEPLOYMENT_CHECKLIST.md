# Pre-Deployment Checklist

Portfolio V1 is locally validated but has not been deployed. Complete unchecked items for the exact deployment candidate.

## Completed Locally

- [x] Verified GitHub configured as `https://github.com/nagi98m` and live link checked
- [x] Professional identity consistently presents Python Backend and Generative AI as the primary focus
- [x] Missing resume, LinkedIn, public email, and credential links fail safely without placeholder URLs
- [x] Frontend canonical site and backend API origins are environment-driven
- [x] Backend CORS supports expected localhost origins and rejects wildcard `*`
- [x] Backend binds to `0.0.0.0`, accepts `PORT`, and packages `app/` plus `data/`
- [x] `/health`, suggestions, grounded extractive answers, citations, unsupported questions, configured-provider flow, and provider errors tested
- [x] Contact delivery remains explicitly unavailable; no email-provider secret variables are advertised
- [x] ESLint, TypeScript, production build, 12 backend tests, Chrome E2E, responsive tests, and local API/SEO/CORS smoke tests passed
- [x] Secret-pattern scan, ignored-file rules, external-link attributes, and privacy-safe analytics reviewed
- [x] Dockerfile and `.dockerignore` statically reviewed

## Missing User Data

- [ ] Add approved PDF as `public/resume/Nagendra-Mule-Python-GenAI-Engineer-Resume.pdf`
- [ ] Set `resumeUrl` in `src/config/profile.ts`, then verify every resume action and `resume_download`
- [ ] Supply the verified LinkedIn HTTPS URL, strongly recommended before recruiter sharing
- [ ] Supply a public contact email if direct email contact should be displayed
- [ ] Add AWS credential verification URLs only when verified and available (optional for V1)

## Dependency Risks

- [x] `npm audit --omit=dev`, `npm outdated`, installed dependency tree, and latest stable Next.js version reviewed
- [ ] Resolve or explicitly accept the two high Sharp and one moderate PostCSS transitive findings before release
- [ ] Recheck for a stable Next.js release using Sharp `>=0.35.0` and PostCSS `>=8.5.10`
- [ ] If dependencies change, reinstall and rerun the entire validation suite
- [x] Breaking downgrade, prerelease framework, unsupported override, and `npm audit fix --force` rejected

See `DEPENDENCY_SECURITY.md` for the exact advisory record.

## Backend Deployment

- [ ] Create or attach an appropriate source repository/remote, or configure an approved provider upload workflow
- [ ] Select and authenticate a Docker-capable Python hosting provider
- [ ] Build the backend image in a Docker-capable environment; Docker CLI is unavailable on the audited workstation
- [ ] Deploy FastAPI with `PORT` supplied by the platform
- [ ] Set temporary/final `ALLOWED_ORIGINS` to explicit HTTPS frontend origins only
- [ ] Verify production HTTPS `/health`, `/api/suggestions`, and `/api/chat`
- [ ] Record the production backend HTTPS URL
- [ ] Review production logs for startup errors and secret leakage

## Frontend Deployment

- [ ] Obtain the initial platform-provided frontend HTTPS URL
- [ ] Set `NEXT_PUBLIC_API_URL` to the deployed backend HTTPS origin
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the deployed frontend HTTPS origin
- [ ] Set optional LinkedIn/public-email variables only when verified
- [ ] Build and deploy the Next.js application from the repository root
- [ ] Update backend `ALLOWED_ORIGINS` to the exact deployed frontend origin and restart/redeploy backend
- [ ] Confirm the HTTPS frontend never calls an HTTP backend
- [ ] Record the production frontend HTTPS URL

## Production Validation

- [ ] Run every check in `PRODUCTION_SMOKE_TEST.md` against actual deployed URLs
- [ ] Verify resume response and all resume actions if the PDF is configured
- [ ] Verify GitHub and optional LinkedIn/credential links
- [ ] Test all three case studies, Recruiter Quick View, AI suggestions, answers, citations, unsupported/error states, and contact behavior
- [ ] Test 320px, 375px, 390px, and 768px layouts without overflow
- [ ] Verify canonical metadata, structured data, sitemap, robots, Open Graph, and project metadata contain no localhost URL
- [ ] Confirm no unexpected console, hydration, mixed-content, CORS, API, or asset errors
- [ ] Confirm an unapproved production origin is rejected by CORS
- [ ] Mark Portfolio V1 production-validated only after all applicable checks pass
