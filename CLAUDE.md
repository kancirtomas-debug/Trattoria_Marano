# Claude-web-makeing — Project Instructions

## Claude Code File Map
Full catalog of all Claude Code files on this PC:
→ `C:\Users\kanci\.claude\Claude-code-set.md`

---

## This Project

| What | Detail |
|------|--------|
| **Purpose** | Generate production-ready client websites for the webzatyzden.sk web agency |
| **Generation prompt** | `C:\Users\kanci\Desktop\Claude web gen prompt\WEBSITE-GENERATION-PROMPT.md` |
| **Stack** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next-themes |
| **Deploy flow** | GitHub repo → import at klienti.webzatyzden.sk → auto-deploy to Vercel |
| **CRM integration** | Lead forms POST to `https://klienti.webzatyzden.sk/api/leads/submit` |
| **Blog system** | Reads `content/blog/*.{md,mdx}` via gray-matter |

---

## Dev Servers
Configs saved at: `C:\Users\kanci\Claude-web-makeing\.claude\launch.json`

| Name | Command | Port |
|------|---------|------|
| Next.js Dev Server | `npm run dev` | 3000 |
| Next.js Build | `npm run build` | — |
| Next.js Production Preview | `npm run start` | 3000 |

To start: ask Claude to run `preview_start` with the server name.

---

## Required Integrations (Every Generated Site)
1. **Cookie consent banner** — GDPR, stores in localStorage
2. **Lead forms** — POST to CRM API with `NEXT_PUBLIC_LEAD_API_KEY`
3. **Blog system** — `src/lib/blog.ts` reads `content/blog/`
4. **`content/blog/.gitkeep`** — MUST exist for dashboard blog publishing

---

## Key Files in This Project
| Path | Description |
|------|-------------|
| `.claude/launch.json` | Dev server configurations |
| `CLAUDE.md` | This file |
