# Security Policy

## Supply Chain Rules

- Install dependencies with `npm ci`. Do not use `npm install` for normal setup.
- npm is configured with a 7-day `min-release-age` cooldown for newly published package versions.
- npm is configured with `allow-git=none` and `yes=false` to avoid git dependency installs and automatic one-off package execution.
- Lifecycle scripts are disabled by default through `.npmrc`. Temporarily opt in only after reviewing the package and the lockfile diff.
- Do not run unpinned `npx` commands. Add repeated tools to `devDependencies`, or run one-off tools with an explicit version such as `npx example-package@1.2.3`.
- Runtime and development dependencies are pinned to exact versions in `package.json`. Dependabot should be used for reviewed upgrades.
- Keep `package-lock.json` committed and review lockfile-only changes carefully.
- Run `npm run check:supply-chain` to reject unexpected lockfile hosts, missing integrity hashes, and unapproved install scripts.
- GitHub Actions workflows must set minimal `permissions` and pin external actions to a full commit SHA. The pinact workflow verifies this on pull requests.
- Dependency Review blocks pull requests that introduce dependencies with moderate or higher known vulnerabilities.
- Do not store npm tokens, GitHub tokens, or other raw credentials in project files.
- Keep real `.env` files out of git. Use a secret manager or short-lived credentials for real values.
- Prefer GitHub OIDC trusted publishing over long-lived npm publish tokens if this project ever publishes packages.
- Generate an SBOM with `npm run --silent sbom` for releases or incident response.

## Checks

```sh
npm ci
npm run check
npm run check:supply-chain
npm run --silent sbom
npm run audit
npm run audit:signatures
```
