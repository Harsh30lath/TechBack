const express = require('express');
const app = express();
const http = require('http')
const SocketIO = require('socket.io')
const cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./Config/DBconnect')
const UserRoute = require('./routes/UserRoute')
const ProjectRoute = require('./routes/ProjectRoute')
const CalendarRoute = require('./routes/CalendarRoute')
const TodoRoute = require('./routes/TodoRoute')
const cookieParser = require('cookie-parser');
const Chat = require('./models/ChatModel');
const ChatRoute = require('./routes/ChatRoute')


connectDB();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "*",
  credentials: true
}));
 
const server = http.createServer(app);
const io = SocketIO (server,{
    cors:{
        origin:"*" ,//add origin here,
        credentials: true
    }
})

io.on('connection',(socket)=>{
  console.log('User connected : ', socket.id);

  socket.on('Chat',async (data) =>{
    const {senderId, message} = data;
    const send  = await Chat.create({senderId, message});
    io.emit('Chat',send)
  })

  socket.on('disconnect',() =>{
    console.log('User disconnected : ',socket.id);
  })
})

app.use('/api/user',UserRoute);
app.use('/api/project',ProjectRoute);
app.use('/api/calendar',CalendarRoute);
app.use('/api/todo',TodoRoute);
app.use('/api/chat',ChatRoute);


server.listen(5000,()=>{
    console.log("Server is Serving");
})