import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const predictsDir = join(__dirname, '../docs/predicts')
const indexPath = join(predictsDir, 'index.md')

const entries = readdirSync(predictsDir)
  .filter((f) => f.endsWith('.md') && f !== 'index.md' && !f.includes(' copy'))
  .map((f) => {
    const content = readFileSync(join(predictsDir, f), 'utf-8')
    const { data } = matter(content)
    const slug = f.replace(/\.md$/, '')
    const title = data.title ?? data.match ?? slug
    const date = data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? '')
    return { date, title, slug }
  })
  .sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug))

const table = entries
  .map((e) => `| ${e.date} | ${e.title} | [Đọc →](/predicts/${e.slug}) |`)
  .join('\n')

const output = `<!-- AUTO-GENERATED — do not edit manually -->
<!-- Run \`npm run generate\` to refresh -->

# Tất cả bài dự đoán

| Ngày | Trận | |
|------|------|---|
${table}
`

writeFileSync(indexPath, output)
console.log(`Generated docs/predicts/index.md with ${entries.length} entries.`)
