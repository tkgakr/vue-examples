import fs from 'node:fs'

const lockfile = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'))
const allowedInstallScripts = new Set([
  'node_modules/esbuild',
  'node_modules/fsevents',
])

const packages = lockfile.packages ?? {}
const installScriptPackages = Object.entries(packages)
  .filter(([, entry]) => entry.hasInstallScript)
  .map(([location]) => location)

const unexpected = installScriptPackages.filter(
  (location) => !allowedInstallScripts.has(location),
)

if (unexpected.length > 0) {
  console.error('Unexpected packages with install scripts:')
  for (const location of unexpected) console.error(`- ${location}`)
  console.error(
    'Review the package and add it to scripts/check-install-scripts.mjs only if it is expected.',
  )
  process.exit(1)
}

console.log(
  `Validated ${installScriptPackages.length} package entries with install scripts.`,
)
