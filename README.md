# Single-service Calculator (Next.js on Railway) — with sqrt + square

One Next.js app that includes:
- Frontend UI
- Backend API Route: `POST /api/calc`
- Operations: +, -, *, /, sqrt, x²

## Local
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Railway (single service)
1. Push to GitHub
2. Railway → New Project → Deploy from GitHub repo
3. Service settings:
   - Root Directory: `/` (repo root)
   - Build: `npm run build`
   - Start: `npm start`
4. Generate a domain → open it.
