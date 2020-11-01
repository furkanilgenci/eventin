const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    time: {
      type: Date,
    },
    organizer: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      address: String,
      coordinates: [Number],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
