const asynchandler = require('express-async-handler')
const Todo = require('../models/TodoModel')

const todoCreate = asynchandler( async(req,res)=>{

    const {title,status,dueDate} = req.body;
    if( !title ||  !dueDate){
        res.status(404);
        throw new Error("Please fill all details")
    }

    const create = await Todo.create({
        title,
        status,
        dueDate,
        userId: req.user.id
    })

    console.log(create);
    res.status(200).json(create)

})

const tododelete = asynchandler( async(req,res) =>{
    const deltodo = await Todo.findById(req.params.id);
    if(!deltodo){
        res.status(404);
        throw new Error("There is no Todo on this day")
    }

    if(deltodo.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error('Todo doesnot exist')
    }

    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(todo);

})

const todoupdate = asynchandler( async(req,res) =>{
    const uptodo = await Todo.findById(req.params.id);
    if(!uptodo){
        res.status(404);
        throw new Error("There is no Todo on this day")
    }

    if(uptodo.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error('Todo doesnot exist')
    }

    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(todo);

})

const todoread = asynchandler( async(req,res)=>{
    const read = await Todo.findById(req.params.id);
    if(!read){
        res.status(404);
        throw new Error("Todo doesnot Exist. Please create one!")
    }

    
    res.status(200).json(read);
})

const todoreadAll = asynchandler(async (req, res) => {
    const read = await Todo.find({ userId: req.user.id });
    if (!read) {
        res.status(404);
        throw new Error("Todo doesnot Exist. Please create one!")
    }
    res.status(200).json(read); // ✅ send raw, let frontend format
})

module.exports = {todoCreate,tododelete,todoupdate, todoread,todoreadAll};