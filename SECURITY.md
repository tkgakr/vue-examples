# Security Policy

## Project Scope

This repository is a local learning project for running Vue examples on a Mac. It is not intended for public release, package publishing, or multi-branch collaboration.

Development happens directly on `main`. Because this project does not use pull requests as a normal workflow, GitHub Actions, Dependency Review, pinning checks, and Dependabot automation have been removed. Security checks are run manually when they are useful for local development.

## Supply Chain Rules

- Install dependencies with `npm ci`. Do not use `npm install` for normal setup.
- npm is configured with a 7-day `min-release-age` cooldown for newly published package versions.
- npm is configured with `allow-git=none` and `yes=false` to avoid git dependency installs and automatic one-off package execution.
- Lifecycle scripts are disabled by default through `.npmrc`. Temporarily opt in only after reviewing the package and the lockfile diff.
- Do not run unpinned `npx` commands. Add repeated tools to `devDependencies`, or run one-off tools with an explicit version such as `npx example-package@1.2.3`.
- Runtime and development dependencies are pinned to exact versions in `package.json`. Review version updates manually before committing them to `main`.
- Keep `package-lock.json` committed and review lockfile-only changes carefully.
- Run `npm run check:supply-chain` after dependency changes to reject unexpected lockfile hosts, missing integrity hashes, and unapproved install scripts.
- Run `npm run audit` after dependency changes when known vulnerability checks are useful.
- Do not store npm tokens, GitHub tokens, or other raw credentials in project files.
- Keep real `.env` files out of git. Use a secret manager or short-lived credentials for real values.
- If the project scope changes to public release or package publishing, reintroduce release-specific controls such as CI checks, token handling rules, and SBOM generation.

## Checks

For regular local work:

```sh
npm ci
npm run check
```

After adding or updating dependencies:

```sh
npm run check:supply-chain
npm run audit
npm run audit:signatures
```
