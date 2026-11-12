const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true, maxlength: 80 },
  department: { type: String, required: true, trim: true },
  year: { type: String, required: true, enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  category: { type: String, required: true, enum: ['Teaching', 'Infrastructure', 'Library', 'Laboratory', 'Campus Facilities', 'Canteen', 'Other'] },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true, trim: true, minlength: 5, maxlength: 2000 }
}, { timestamps: true })

module.exports = mongoose.model('Feedback', feedbackSchema)
