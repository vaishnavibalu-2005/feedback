# CampusVoice — Student Feedback Frontend

## Run locally
1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env` if needed and set `VITE_API_URL=http://localhost:5000/api`.
5. Run `npm run dev`.

## Build
Run `npm run build`. Vite creates the production files in `dist`.

## Vercel
- Root Directory: `frontend` (when deploying from the combined repository)
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api`

The admin dashboard in this demo has no login. Add authentication and authorization before production use.
