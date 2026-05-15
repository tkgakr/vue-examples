# Security Policy

## Supply Chain Rules

- Install dependencies with `npm ci`. Do not use `npm install` for normal setup.
- npm is configured with a 7-day `min-release-age` cooldown for newly published package versions.
- Lifecycle scripts are disabled by default through `.npmrc`. Temporarily opt in only after reviewing the package and the lockfile diff.
- Do not run unpinned `npx` commands. Add repeated tools to `devDependencies`, or run one-off tools with an explicit version such as `npx example-package@1.2.3`.
- Keep `package-lock.json` committed and review lockfile-only changes carefully.
- GitHub Actions workflows must set minimal `permissions` and pin external actions to a full commit SHA. The pinact workflow verifies this on pull requests.
- Dependency Review blocks pull requests that introduce dependencies with moderate or higher known vulnerabilities.
- Do not store npm tokens, GitHub tokens, or other raw credentials in project files.
- Prefer GitHub OIDC trusted publishing over long-lived npm publish tokens if this project ever publishes packages.

## Checks

```sh
npm ci
npm run check
npm run audit
npm run audit:signatures
```
