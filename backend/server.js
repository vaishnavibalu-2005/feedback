require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const feedbackRoutes = require('./routes/feedbackRoutes')

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(v => v.trim()) : true }))
app.use(express.json({ limit: '20kb' }))

app.get('/', (_req, res) => res.json({ message: 'CampusVoice API is running' }))
app.use('/api/feedback', feedbackRoutes)

const PORT = process.env.PORT || 5000

async function startServer() {
  if (process.env.MONGODB_URI) {
    await connectDB()
  } else {
    console.warn('MONGODB_URI is not set. Add it in backend/.env to enable database storage.')
  }
  app.listen(PORT, () => console.log(`CampusVoice API running on port ${PORT}`))
}

startServer().catch(error => {
  console.error('Server startup failed:', error.message)
  process.exit(1)
})
