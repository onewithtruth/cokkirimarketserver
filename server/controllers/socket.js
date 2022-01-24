const models = require("../models/index");
const axios = require("axios");

module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`아이디: ${socket.id} 님이 post_id:${data} 채팅방에 입장 하였습니다`);
    });
  
    socket.on("send_message", async (data) => {
      // console.log(data)
      socket.to(data.room).emit("receive_message", data);

      let textAuthorId = await models.user.findOne({
        attributes: ["id"],
        where: {
          nickname: data.author,
        },
      });
  
      textAuthorId = textAuthorId.dataValues.id;
      // console.log(textAuthorId)

      let newChatData = await models.chat.create({
        "user_id": textAuthorId,
        "text": data.message,
        "room": data.room
      })
      // console.log(newChatData.dataValues.id);

      await models.post_has_chat.create({
        "post_id": data.room,
        "chat_id": newChatData.dataValues.id
      })

    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });


    socket.on("server_log", () => {
      socket.emit("server_msg", "123");
    })
  });

};