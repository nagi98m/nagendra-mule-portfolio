# Dependency Security Review

Review date: 2026-07-22

## Current status

- Next.js `16.2.11` is the current stable npm release and is already installed with matching `eslint-config-next`.
- `npm audit --omit=dev` reports three transitive findings through Next.js: two high-severity Sharp findings and one moderate PostCSS finding.
- The installed nested versions are `sharp@0.34.5` and `postcss@8.4.31`.
- Patched versions are Sharp `0.35.0` or later and PostCSS `8.5.10` or later.
- The stable Next.js dependency ranges do not currently select those patched versions.

## Decision

No dependency override, prerelease framework update, or forced audit remediation was applied. `npm audit fix --force` proposes Next.js `9.3.3`, which is a major breaking downgrade and is not an acceptable fix. Forcing Sharp across its `0.x` semver boundary would also exceed the range declared by the installed stable Next.js package.

The portfolio does not accept user-provided image or CSS processing, which reduces direct exposure, but the audit findings remain open and must not be described as resolved.

## Monitoring and release gate

Before deployment:

1. Run `npm view next version`, `npm outdated`, and `npm audit --omit=dev` again.
2. Prefer a stable Next.js patch/minor release whose declared dependencies use Sharp `>=0.35.0` and PostCSS `>=8.5.10`.
3. Upgrade Next.js and `eslint-config-next` together.
4. Reinstall dependencies and run the complete local validation suite.
5. If no compatible stable fix exists, explicitly review and accept or defer the remaining risk; never use `npm audit fix --force` for this finding.

Advisories:

- `https://github.com/advisories/GHSA-f88m-g3jw-g9cj`
- `https://github.com/advisories/GHSA-qx2v-qp2m-jg93`
