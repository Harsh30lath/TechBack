const mongoose = require('mongoose')

const chatSchema =  mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  }
}, { timestamps: true })

module.exports = mongoose.model("Chat", chatSchema);