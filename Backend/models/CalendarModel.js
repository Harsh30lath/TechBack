const mongoose = require('mongoose')

const CalendarSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
      index: true,
    },
    title:{
        type: String,
        required:[true,"Event name is required"]
    },
    date:{
        type: String,
        required:[true,"Start date is required"]
    }
},{
    timestamps: true
});


module.exports = mongoose.model("Calendar", CalendarSchema);