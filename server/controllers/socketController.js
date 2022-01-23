const models = require("../models");
const { Op } = require("sequelize");

module.exports = {
  chatroomlist: async (req, res) => {
    console.log(Number(req.body.payload.user_id))
    if (req.body.payload.user_id) {

      let myId = Number(req.body.payload.user_id)
  

      let chatIdList = await models.chat.findAll({
        where: { user_id: myId },
      });
      chatIdList = chatIdList.map(function (elem) {
        return elem.dataValues.id;
      });

      if (chatIdList[0] === undefined) {

        res.status(200).send({data: [], message: "empty chat list"});
        
      } else {
        
        let postIdList = await models.post_has_chat.findAll({
          where: {
            chat_id: {
              [Op.or]: chatIdList,
            },
          },
        });
        postIdList = postIdList.map(function (elem) {
          return elem.dataValues.post_id;
        });
        let setPostIdList = new Set(postIdList);
        let uniquePostIdList = [...setPostIdList];
        
        
        // let postAuthorIdList = await models.post.findAll({
        //   attributes: ["user_id"],
        //   where: {
        //     id: {
        //       [Op.or]: uniquePostIdList,
        //     },
        //   },
        // });
        // postAuthorIdList = postAuthorIdList.map(function(elem) {
        //   return elem.dataValues.user_id;
        // })
        
        
  
        // let chatListInfo = await models.post.findAll({
        //   attributes: ["id", "user_id", "image_src", "title"],
        //   where: {
        //     id: {
        //       [Op.or]: postAuthorIdList,
        //     },
        //   },
        // })
  
        let chatListInfo = await models.post.findAll({
          include: [
            { model: models.post_has_categories,
              include: { model: models.categories, as: "category", attributes: ["category"] },
              as: "post_has_categories", attributes: ["categories_id"] },
              { model: models.user, as: "user", attributes: ["nickname"] },
          ],
          order: [ [ 'createdAt', 'DESC' ]],
          where: {
            id: {
              [Op.or]: uniquePostIdList
            }
          }
        })      
        
    
        res.status(200).send({data: chatListInfo, message: "ok"});

      }


    } else {

      res.status(400).send({ message: "잘못된 요청입니다." });

    }
    
  },

  chatroom: async (req, res) => {
    // console.log(req.body.payload)
    if (req.body.payload.user_id) {
      
      let postAuthorId = await models.post.findOne({
        attributes: ["user_id"],
        where: {
          id: req.body.payload.post_id,
        },
      });

      postAuthorId = postAuthorId.dataValues.user_id;

      // let myId = await models.user.findOne({
      //   attributes: ["id"],
      //   where: {
      //     email: req.body.payload.email,
      //   },
      // });

      let myId = Number(req.body.payload.user_id);
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




      let postAuthorNickname = await models.user.findOne({
        attributes: ["nickname"],
        where: { id: postAuthorId },
      });
      postAuthorNickname = postAuthorNickname.dataValues.nickname;

      let myNickname = await models.user.findOne({
        attributes: ["nickname"],
        where: { id: myId },
      });
      myNickname = myNickname.dataValues.nickname;
      // console.log(chatList);

      chatList = chatList.map(function (elem) {
        return {
          room: req.body.payload.post_id,
          author:
            elem.dataValues.user_id === postAuthorId
              ? postAuthorNickname
              : myNickname,
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
