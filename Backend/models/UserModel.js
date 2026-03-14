const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"Please Enter Your Name"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Name"],
    },
    confirmPassword:{
        type:String,
        required:[true,"Please Enter Your Name"],
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamp: true,
}
)

module.exports = mongoose.model("User",userSchema);