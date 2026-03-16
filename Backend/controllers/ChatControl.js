const asynchandler = require("express-async-handler");
const Chat = require("../models/ChatModel");

const getall = asynchandler(async (req, res) => {

  const chat = await Chat.find().populate("senderId",'fullname email');

  res.json(chat);

});

module.exports = { getall };