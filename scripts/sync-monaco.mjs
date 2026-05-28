import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const sourceDir = path.join(root, 'node_modules', 'monaco-editor', 'min', 'vs')
const targetDir = path.join(root, 'public', 'monaco', 'vs')

if (!fs.existsSync(sourceDir)) {
    console.error('Monaco assets not found. Run npm install before building.')
    process.exit(1)
}

fs.mkdirSync(path.dirname(targetDir), { recursive: true })
fs.rmSync(targetDir, { recursive: true, force: true })
fs.cpSync(sourceDir, targetDir, { recursive: true })

console.log(`Synced Monaco assets to ${path.relative(root, targetDir)}`)
