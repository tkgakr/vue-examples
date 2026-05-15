import fs from 'node:fs'

const lockfilePath = 'package-lock.json'
const allowedHosts = new Set(['registry.npmjs.org'])
const lockfile = JSON.parse(fs.readFileSync(lockfilePath, 'utf8'))
const packages = lockfile.packages ?? {}
const errors = []

for (const [location, entry] of Object.entries(packages)) {
  if (location === '') continue

  if (!entry.resolved) {
    errors.push(`${location}: missing resolved URL`)
    continue
  }

  let resolved
  try {
    resolved = new URL(entry.resolved)
  } catch {
    errors.push(`${location}: invalid resolved URL "${entry.resolved}"`)
    continue
  }

  if (resolved.protocol !== 'https:') {
    errors.push(`${location}: resolved URL must use https`)
  }

  if (!allowedHosts.has(resolved.hostname)) {
    errors.push(`${location}: unexpected resolved host "${resolved.hostname}"`)
  }

  if (!entry.integrity) {
    errors.push(`${location}: missing integrity hash`)
  }
}

if (errors.length > 0) {
  console.error('Lockfile validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `Validated ${Object.keys(packages).length - 1} lockfile package entries.`,
)
