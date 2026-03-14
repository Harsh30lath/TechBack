const asynchandler = require("express-async-handler");
const Team = require("../models/TeamModel");
const User = require("../models/UserModel");
const Chat = require('../models/ChatModel')

const getChatHistory = asynchandler(async(req,res)=>{
    const team = await Team.findById(req.params.teamId);
    if(!team){
        res.status(400);
        throw new Error("Team doesnot exist please create one");
    }

    const isMember = team.members.some(e =>
        e.userId.toString() === req.user.id
    )
    const isOwner = team.ownerId.toString() === req.user.id

    if(!isMember && !isOwner){
        res.status(400);
        throw new Error("Member doesnot exist!!");
    }

    const messages = await Chat.find({ teamId: req.params.teamId })
     .populate("sender", "fullname email")


    res.status(200).json(messages);


})

const addMembers = async (req, res) => {
  const { teamId } = req.params;
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const team = await Team.findById(teamId);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  team.members.push(userId);
  await team.save();

  res.json({ message: "Member added" });
};

const getMembers = asynchandler( async(req,res)=>{
    const { teamId } = req.params;

    const team = await Team.findById(teamId)
    .populate("members","username email");

    if(!team){
        res.status(404);
        throw new Error("Team Not Found");
    }

    res.status(200).json(team.members);
})

const removeMembers = asynchandler( async(req,res)=>{
    
    const {teamId,userId} = req.params;

    const team = await Team.findById(teamId)
    if(!team){
        res.status(404);
        throw new Error("Team not Found")
    }

    if(!team.members.includes(userId)){
        res.status(400);
        throw new Error("User is not a member of this team")
    }

    team.members = team.members.filter(
        (id) => id.toString() !== userId
    );

    await team.save();

    res.status(200).json("member removed");

})


module.exports = {addMembers,getMembers,removeMembers,getChatHistory}

