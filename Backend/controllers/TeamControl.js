const asynchandler = require('express-async-handler');
const Team = require('../models/TeamModel')
const Chat = require('../models/TeamModel')

const Teamcreate =asynchandler( async(req,res)=>{
    const {name,description} = req.body;
    if(!name || !description){
        req.status(400);
        throw new Error("Please fill all details")
    }

    const create = await Team.create({
        name,
        description,
        members: [],
        ownerId: req.user.id
    })

    res.status(201).json({
    message: "Team created successfully",
    teamId: create._id,       
    create,
  });
})


const allTeam = asynchandler(async (req, res) => {
  const projects = await Team.find({
    $or: [
      { ownerId: req.user.id },
      { members: req.user.id },
    ],
  });

  res.status(200).json(projects);
});


const deleteTeam = asynchandler( async(req,res) =>{
    const project = await Team.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error("Project doesnot Exist!");
    }

    if (project.ownerId.toString() !== req.user.id) {
  res.status(403);
  throw new Error("You are not allowed to delete this project");
}

    const delProject = await Team.findByIdAndDelete(req.params.id)
    res.status(200).json(delProject)
})

const editTeam = asynchandler( async(req,res)=>{
    const edit = await Team.findById(req.params.id)
    if(!edit){
        res.status(404);
        throw new Error('Project doesnot Exist!')
    }

    if (edit.ownerId.toString() !== req.user.id) {
  res.status(403);
  throw new Error("You are not allowed to delete this project");
    }

    const updateProject = await Team.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    
    res.status(200).json(updateProject)

})


const getTeam = asynchandler( async(req,res)=>{
    const project = await Team.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error("Project doesnot Exist. Please create one!")
    }

    const find = await Team.findById(req.params.id)
    res.status(200).json(find);
})


module.exports = {Teamcreate,getTeam,deleteTeam,editTeam,allTeam};