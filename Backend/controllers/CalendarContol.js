const asynchandler = require('express-async-handler');
const Calendar = require('../models/CalendarModel');

const getAll = asynchandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  const events = await Calendar.find({ userId: req.user.id });

  const formatted = events.map(e => ({
    id: e._id,
    title: e.title,
    date: e.date
  }));

  res.json(formatted);
});


const create = asynchandler(async(req,res)=>{
    const {title,date} = req.body;
    if(!title || !date ){
        res.status(404);
        throw new Error('Please enter all details')
    }

    const add = await Calendar.create({
        userId: req.user.id,
        title,
        date
    })
    console.log(add);
    res.status(201).json(add);
})

const update = asynchandler(async(req,res)=>{

    const change = await Calendar.findById(req.params.id);
    if(!change){
        res.status(404);
        throw new Error('Event doesnot exist')
    }

    if(change.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not allowed to update this project");
    }

    const update = await Calendar.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    console.log(update);
    res.status(201).json(update);
})

const delCalendar = asynchandler(async(req,res)=>{
    const delCal = await Calendar.findById(req.params.id);
    if(!delCal){
        res.status(404);
        throw new Error('Event doesnot exist')
    }

    if(delCal.userId.toString() !== req.user.id){
        res.status(404);
        throw new Error("You are not allowed to delete this project");
    }

    const Cal = await Calendar.findByIdAndDelete(req.params.id);
    res.status(201).json(Cal);
})

module.exports = {create,update,delCalendar,getAll}