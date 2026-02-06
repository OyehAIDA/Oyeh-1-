# Single-service Calculator (Next.js on Railway)

This is a **single Next.js app** that includes:
- Frontend UI
- Backend API via Next.js Route Handler: `POST /api/calc`

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
