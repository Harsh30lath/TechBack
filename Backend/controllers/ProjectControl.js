const asynchandler = require('express-async-handler');
const Project = require('../models/ProjectModel');

const addProject = asynchandler(async (req,res)=>{
    const {projectname, description} = req.body;
    if(!projectname || !description ){
        res.status(400);
        throw new Error("Please add all the Details ");
    }
    const project = await Project.create({
        projectname,
        description,
        ownerId: req.user.id
    })

    console.log(project);

    res.status(201).json({message:"Project Created successfully",project})
    

})

const allProject = asynchandler(async (req, res) => {
  const projects = await Project.find({
    $or: [
      { ownerId: req.user.id },
      { members: req.user.id },
    ],
  });

  res.status(200).json(projects);
});


const deleteProject = asynchandler( async(req,res) =>{
    const project = await Project.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error("Project doesnot Exist!");
    }

    if (project.ownerId.toString() !== req.user.id) {
  res.status(403);
  throw new Error("You are not allowed to delete this project");
}

    const delProject = await Project.findByIdAndDelete(req.params.id)
    res.status(200).json(delProject)
})

const editProject = asynchandler( async(req,res)=>{
    const edit = await Project.findById(req.params.id)
    if(!edit){
        res.status(404);
        throw new Error('Project doesnot Exist!')
    }

    if (edit.ownerId.toString() !== req.user.id) {
  res.status(403);
  throw new Error("You are not allowed to delete this project");
    }

    const updateProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    
    res.status(200).json(updateProject)

})


const getProject = asynchandler( async(req,res)=>{
    const project = await Project.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error("Project doesnot Exist. Please create one!")
    }

    const find = await Project.findById(req.params.id)
    res.status(200).json(find);
})

module.exports = {addProject,deleteProject,allProject,editProject,getProject}