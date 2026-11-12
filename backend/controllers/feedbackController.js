const Feedback = require('../models/Feedback')

exports.getFeedback = async (_req, res) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 }).limit(500)
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch feedback' })
  }
}

exports.createFeedback = async (req, res) => {
  try {
    const { studentName, department, year, category, rating, message } = req.body
    if (!studentName || !department || !year || !category || !message || rating === undefined) {
      return res.status(400).json({ message: 'Please complete all required fields.' })
    }
    const item = await Feedback.create({ studentName, department, year, category, rating, message })
    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({ message: error.name === 'ValidationError' ? error.message : 'Unable to submit feedback' })
  }
}

exports.deleteFeedback = async (req, res) => {
  try {
    const item = await Feedback.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Feedback not found' })
    res.json({ message: 'Feedback deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid feedback ID' })
  }
}
