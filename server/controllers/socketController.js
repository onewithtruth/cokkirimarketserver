const models = require("../models");
const { Op } = require("sequelize");

module.exports = {
  chatroomlist: async (req, res) => {
    console.log(req.body)
    res.status(200).send({message: "ok"});
    // if (req.body.payload.user_id) {

    //   let myId = req.body.payload.user_id
  

    //   let chatIdList = await models.chat.findAll({
    //     where: { user_id: myId },
    //   });
    //   chatIdList = chatIdList.map(function (elem) {
    //     return elem.dataValues.id;
    //   });
  

    //   let postIdList = await models.post_has_chat.findAll({
    //     where: {
    //       chat_id: {
    //         [Op.or]: chatIdList,
    //       },
    //     },
    //   });
    //   postIdList = postIdList.map(function (elem) {
    //     return elem.dataValues.post_id;
    //   });
    //   let setPostIdList = new Set(postIdList);
    //   let uniquePostIdList = [...setPostIdList];
      

    //   let postAuthorIdList = await models.post.findAll({
    //     attributes: ["user_id"],
    //     where: {
    //       id: {
    //         [Op.or]: uniquePostIdList,
    //       },
    //     },
    //   });
    //   postAuthorIdList = postAuthorIdList.map(function(elem) {
    //     return elem.dataValues.user_id;
    //   })
    

    //   let chatListInfo = await models.post.findAll({
    //     attributes: ["id", "user_id", "image_src", "title"],
    //     where: {
    //       id: {
    //         [Op.or]: postAuthorIdList,
    //       },
    //     },
    //   })
    //   chatListInfo = chatListInfo.map(function(elem) {
    //     return {
    //       post_id: elem.dataValues.id,
    //       user_id: elem.dataValues.user_id,
    //       title: elem.dataValues.title,
    //       image_src: elem.dataValues.image_src,
    //     }
    //   })
    //   console.log(chatListInfo);
      
      
  
    //   res.status(200).send({data: chatListInfo, message: "ok"});

    // } else {

    //   res.status(400).send({ message: "잘못된 요청입니다." });

    // }
    
  },

  chatroom: async (req, res) => {
    // console.log(req.body.payload)
    if (req.body.payload.email) {
      let postAuthorId = await models.post.findOne({
        attributes: ["user_id"],
        where: {
          id: req.body.payload.post_id,
        },
      });

      postAuthorId = postAuthorId.dataValues.user_id;

      let myId = await models.user.findOne({
        attributes: ["id"],
        where: {
          email: req.body.payload.email,
        },
      });

      myId = myId.dataValues.id;
      // console.log(postAuthorId)

      let chatIdList = await models.post_has_chat.findAll({
        where: {
          post_id: req.body.payload.post_id,
        },
      });

      chatIdList = chatIdList.map((elem) => {
        return elem.dataValues.chat_id;
      });

      let chatList = await models.chat.findAll({
        where: {
          id: {
            [Op.or]: chatIdList,
          },
        },
      });

      let postAuthorEmail = await models.user.findOne({
        attributes: ["email"],
        where: { id: postAuthorId },
      });
      postAuthorEmail = postAuthorEmail.dataValues.email;

      let myEmail = await models.user.findOne({
        attributes: ["email"],
        where: { id: myId },
      });
      myEmail = myEmail.dataValues.email;
      // console.log(chatList);

      chatList = chatList.map(function (elem) {
        return {
          room: req.body.payload.post_id,
          author:
            elem.dataValues.user_id === postAuthorId
              ? postAuthorEmail
              : myEmail,
          message: elem.dataValues.text,
          time: "",
        };
      });

      res.status(200).send({ data: chatList, message: "ok" });
    } else {
      res.status(400).send({ message: "잘못된 요청입니다." });
    }
  },

  my: (req, res) => {
    res.status(200).send("POST: /my");
  },
};
