const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    projectname:{
        type: String,
        required:[true,"Please enter Project Name"],
    },
    description:{
        type: String,
        required:[true,"Please enter Description"],
    },
    status:{
        type: String,
        enum: ['active','completed','archived'],
        default:'active',
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Project",ProjectSchema)