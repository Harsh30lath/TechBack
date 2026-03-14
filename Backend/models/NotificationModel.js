const mongoose = require('mongoose')

const NotSchema = mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    message:{
        type: String,
        required: [true,"Message required"],
        trim: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Msg",NotSchema);