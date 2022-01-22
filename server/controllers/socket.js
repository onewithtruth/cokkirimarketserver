const models = require("../models/index");
const axios = require("axios");

module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`아이디: ${socket.id} 님이 ${data} 번 채팅방에 입장 하였습니다`);
    });
  
    socket.on("send_message", async (data) => {
      socket.to(data.room).emit("receive_message", data);
      console.log(data)

      await models.chat.create({
        "user_id": 1,
        "text": data.message
      })
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

};