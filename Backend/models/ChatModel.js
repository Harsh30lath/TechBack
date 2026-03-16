const mongoose = require('mongoose')

const chatSchema =  mongoose.Schema({ 
    senderId :
    { type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      trim: true
    }  
},{timestamps : true} )

module.exports = mongoose.model("Chat", chatSchema);