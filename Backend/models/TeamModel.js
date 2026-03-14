const mongoose = require("mongoose")

const TeamSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true,"Team name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true,"Team Description is required"],
        trim: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        role:     { type: String, enum: ["admin", "member"], default: "member" }
    }],
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Team",TeamSchema)