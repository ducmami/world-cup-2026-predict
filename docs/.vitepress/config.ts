import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))

function buildPredictSidebar() {
  const dir = join(__dirname, '../predicts')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md' && !f.includes(' copy'))
    .map((f) => {
      const { data } = matter(readFileSync(join(dir, f), 'utf-8'))
      const slug = f.replace(/\.md$/, '')
      return {
        text: (data.title ?? data.match ?? slug) as string,
        link: `/predicts/${slug}`,
      }
    })
    .sort((a, b) => b.link.localeCompare(a.link))
}

export default defineConfig({
  base: '/',
  title: 'World Cup 2026 — Dự đoán',
  description: 'Phân tích & dự đoán các trận World Cup 2026',
  lang: 'vi-VN',
  themeConfig: {
    nav: [
      { text: 'Trang chủ', link: '/' },
      { text: 'Dự đoán', link: '/predicts/' },
    ],
    sidebar: {
      '/predicts/': [
        { text: 'Tất cả bài', link: '/predicts/' },
        ...buildPredictSidebar(),
      ],
    },
  },
})
