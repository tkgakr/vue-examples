import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), 'vue-examples-signature-audit-'),
)
const cacheDir = path.join(root, '.npm-cache')

fs.mkdirSync(tempDir, { recursive: true })
fs.copyFileSync(
  path.join(root, 'package.json'),
  path.join(tempDir, 'package.json'),
)
fs.copyFileSync(
  path.join(root, 'package-lock.json'),
  path.join(tempDir, 'package-lock.json'),
)
fs.writeFileSync(
  path.join(tempDir, '.npmrc'),
  [
    'package-lock=true',
    'ignore-scripts=true',
    'allow-git=none',
    'yes=false',
    'audit=true',
    'fund=false',
    '',
  ].join('\n'),
)

const env = {
  ...process.env,
  NPM_CONFIG_MIN_RELEASE_AGE: '0',
  NPM_CONFIG_USERCONFIG: path.join(tempDir, '.npmrc'),
}

const install = spawnSync(
  'npm',
  ['ci', '--ignore-scripts', '--cache', cacheDir],
  {
    cwd: tempDir,
    env,
    stdio: 'inherit',
  },
)

if (install.status !== 0) {
  process.exit(install.status ?? 1)
}

const result = spawnSync('npm', ['audit', 'signatures', '--cache', cacheDir], {
  cwd: tempDir,
  env,
  stdio: 'inherit',
})

fs.rmSync(tempDir, { force: true, recursive: true })
process.exit(result.status ?? 1)
