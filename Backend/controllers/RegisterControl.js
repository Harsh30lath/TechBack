const asynchandler = require('express-async-handler');
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const login = asynchandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please Fill required Details");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign({
            user:{
                email: user.email,
                id: user.id 
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1d"}
        )
        const refreshtoken = jwt.sign(
            {id : user.id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'4h'}
        )
        user.refreshToken = refreshtoken
        await user.save()

        const options = {
            httpOnly: true,
            secure: false,
            sameSite:"strict"
        }

        return res.status(200)
        .cookie('accesstoken',accesstoken,options)
        .cookie('refreshtoken',refreshtoken,options)

        .json("User loggedIn",""); 



    }else{
        res.status(401);
        throw new Error("Password invalid!");
    }

})


const register = asynchandler(async (req,res)=>{
    const {fullname , email , password, confirmPassword  } = req.body 
    if(!fullname || !email || !password || !confirmPassword ){
        res.status(400);
        throw new Error("Please Fill required Details");
    }
    const userexist = await User.findOne({email});
    if(userexist){
        res.status(400);
        throw new Error('User already Exist')
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword)
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword
    })
    console.log(user);

     if(user){
        res.status(201).json({_id : user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not Valid");
    }
});


const current = asynchandler(async(req,res) =>{
    const user = await User.findById(req.user.id).select("fullname email");
    res.json(user)
});

const logout = asynchandler(async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { refreshToken: undefined }
    },
    { new: true }
  );

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  };

  return res
    .status(200)
    .clearCookie("refreshtoken", options)
    .json({ message: "User logged out" });

});

const getAllUsers = asynchandler(async (req, res) => {
  // Return all users except the current user
  const users = await User.find(
    { _id: { $ne: req.user.id } },
    "fullname email "          // only send safe fields
  );
  res.status(200).json(users);
});

module.exports = {login,register,current,logout,getAllUsers}