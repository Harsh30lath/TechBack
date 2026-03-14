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
const TeamRoute = require('./routes/TeamRoute')
const Team = require('./models/TeamModel')
const Msg = require('./models/NotificationModel')
const cookieParser = require('cookie-parser');
const Chat = require('./models/ChatModel');



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

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("chat", async ({ teamId, message, senderId }) => {
  try {
    const saved = await Chat.create({ teamId, sender: senderId, message });
    const populated = await saved.populate("sender", "fullname email");

    io.to(teamId).emit("chat", {
      _id:       populated._id,
      message:   populated.message,
      sender:    populated.sender,
      teamId:    populated.teamId,
      createdAt: populated.createdAt,
    });
  } catch (err) {
    console.error("chat error:", err.message);
    socket.emit("error", { message: "Failed to send message" });
  }
});

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});


app.use('/api/user',UserRoute);
app.use('/api/project',ProjectRoute);
app.use('/api/calendar',CalendarRoute);
app.use('/api/todo',TodoRoute);
app.use('/api/team',TeamRoute);


server.listen(5000,()=>{
    console.log("Server is Serving");
})