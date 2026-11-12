# CampusVoice — Student Feedback Backend

## Run locally
1. Install Node.js (LTS).
2. Open this folder in a terminal and run `npm install`.
3. Copy `.env.example` to `.env`.
4. Replace `MONGODB_URI` with your MongoDB Atlas connection string.
5. Run `npm run dev`.

API base URL: `http://localhost:5000/api`

## API endpoints
- `GET /api/feedback` — list feedback
- `POST /api/feedback` — submit feedback
- `DELETE /api/feedback/:id` — delete feedback

## Render
- Root Directory: `backend` (when deploying from the combined repository)
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `MONGODB_URI` and `CLIENT_URL` (set CLIENT_URL to your deployed frontend origin)

Important: The demo's read and delete endpoints are not protected by admin authentication. Add authentication/authorization before using this with real student data.
