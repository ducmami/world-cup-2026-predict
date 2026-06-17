# World Cup 2026 — Dự đoán

Phân tích chiến thuật và dự đoán kết quả các trận đấu World Cup 2026.

**Site:** https://ducmami.github.io/world-cup-2026-predict/

## Local development

```bash
npm install
npm run docs:dev
```

## Build

```bash
npm run docs:build
```

## Thêm bài dự đoán mới

1. Tạo file `.md` trong `docs/predicts/` theo quy ước đặt tên: `YYYY-MM-DD_team_a_team_b.md`
2. Thêm frontmatter:

```yaml
---
title: Team A vs Team B
match: Team A vs Team B
date: YYYY-MM-DD
created: YYYY-MM-DD HH:MM
---
```

3. Chạy `npm run generate` để cập nhật danh sách bài (tự động chạy khi `docs:build` / `docs:dev`)
4. Push lên `main` — GitHub Actions sẽ tự deploy
