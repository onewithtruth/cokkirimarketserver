const models = require("../models");
const { Op } = require("sequelize");

module.exports = {
  chatroomlist: async (req, res) => {
    // console.log(req.body)
    if (req.body.payload.user_id) {
      
      //나의 아이디
      let myId = Number(req.body.payload.user_id)
      
      //내가 작성한 포스트 아이디 리스트
      let myPostIdList = await models.post.findAll({
        where: {user_id: myId}
      });
      myPostIdList = myPostIdList.map(function(elem) {
        return elem.dataValues.id
      });
      // console.log(myPostIdList)


      //내가 작성한 포스트 아이디 리스트와 연관된 채팅 리스트
      let chatIdListRelatedmyPost = []
      if (myPostIdList[0] !== undefined) {
        chatIdListRelatedmyPost = await models.post_has_chat.findAll({
          attributes: ["chat_id"],
          where: {
            post_id: {
              [Op.or]: myPostIdList,
            },
          },
        });
        chatIdListRelatedmyPost = chatIdListRelatedmyPost.map(function(elem) {
          return elem.dataValues.chat_id
        });
      }
      // console.log(chatIdListRelatedmyPost)

      //내가 작성한 모든 채팅아이디 리스트
      let mychatIdList = await models.chat.findAll({
        where: { user_id: myId },
      });
      mychatIdList = mychatIdList.map(function (elem) {
        return elem.dataValues.id;
      });
      // console.log(mychatIdList)



      //두 채팅 아이디 리스트를 merge 한다.
      let totalChatIdList = [...chatIdListRelatedmyPost, ...mychatIdList];
      let setTotalChatIdList = new Set(totalChatIdList);
      let uniqueTotalChatIdList = [...setTotalChatIdList];
      // console.log(uniqueTotalChatIdList)

      if (uniqueTotalChatIdList[0] === undefined) {

        let myNickname = await models.user.findOne({
          attributes: ["nickname"],
          where: {
            id: myId
          }
        });

        myNickname = myNickname.dataValues.nickname
        let chatListInfoOutput = []

        res.status(200).send({data: {chatListInfoOutput, myNickname}, message: "empty chat list"});
        
      } else {

        //전체 체팅과 연관된 포스트 목록을 구한다
        // let postIdList = await models.post_has_chat.findAll({
        //   where: {
        //     chat_id: {
        //       [Op.or]: uniqueTotalChatIdList,
        //     },
        //   },
        // });
        // postIdList = postIdList.map(function(elem) {
        //   return elem.dataValues.post_id;
        // });
        // let setPostIdList = new Set(postIdList);
        // let uniquePostIdList = [...setPostIdList];
        // console.log(uniquePostIdList);
        
        // 전체 체팅과 연관된 room 목록을 구한다
        let chatRoomList = await models.chat.findAll({
          attributes: ["room"],
          where: {
            id: {
              [Op.or]: uniqueTotalChatIdList,
            }
          }
        })
        chatRoomList = chatRoomList.map(function(elem) {
          return elem.dataValues.room;
        })
        let setUserIdList = new Set(chatRoomList);
        let uniquechatRoomList = [...setUserIdList]
        // console.log(uniquechatRoomList)
        
        //나와 연관된 채팅을 쓴 채팅 리스트 를 구한다( uniquePostIdList 로부터).
        let chatListInfoRaw =  await models.chat.findAll({
          include: [
            { model: models.user, as: "user", attributes: ["nickname"] },
            { model: models.post, as: "post_id_post_post_has_chats", 
              include: [{ model: models.user, as: "user", attributes: ["nickname"] }],
            attributes: ["title", "image_src", "user_id"] }
          ],
          where: {
            "room": { 
              [Op.or]: uniquechatRoomList
            },
          },
        })
        // console.log(chatListInfoRaw.length)

        let chatListInfoOutput = [];
        let chatListInfoOutputChecker = [];
        // console.log(chatListInfoOutput.includes(chatListInfoRaw[0].dataValues.room === true))
        for (let i = 0; i < chatListInfoRaw.length; i++) {
          if (!chatListInfoOutputChecker.includes(chatListInfoRaw[i].dataValues.room)) {
            chatListInfoOutputChecker.push(chatListInfoRaw[i].dataValues.room);
            chatListInfoOutput.push(chatListInfoRaw[i]);
          }
        }
        console.log(chatListInfoOutput.length)

        let myNickname = await models.user.findOne({
          attributes: ["nickname"],
          where: {
            id: myId
          }
        });

        myNickname = myNickname.dataValues.nickname
        
    
        res.status(200).send({data: {chatListInfoOutput, myNickname}, message: "ok"});

      }


    } else {

      res.status(400).send({ message: "잘못된 요청입니다." });

    }
    
  },

  chatroom: async (req, res) => {
    // console.log(Number(req.body.payload.seller_id))

    if (req.body.payload.seller_id) {
      
      function getPostid(room) {
        let sharpIndex = room.indexOf("#");
        return room.slice(0, sharpIndex);
      };
      function getBuyeremail(room) {
        let sharpIndex = room.indexOf("#");
        return room.slice(sharpIndex + 1);
      };

      let postId = getPostid(req.body.payload.room)
      let buyerEmail = getBuyeremail(req.body.payload.room)

      let buyerId = await models.user.findOne({
        attributes: ["id"],
        where: {
          "email": buyerEmail,
        },
      });

      buyerId = Number(buyerId.dataValues.id);
      console.log(buyerId)
      let sellerId = Number(req.body.payload.seller_id);
      console.log(sellerId)
      
      
      
      
      let chatList = await models.chat.findAll({
        where: {
          room: req.body.payload.room,
        },
      });        
      // console.log(chatList)
      

      let sellerNickname = await models.user.findOne({
        attributes: ["nickname"],
        where: { id: sellerId },
      });
      sellerNickname = sellerNickname.dataValues.nickname;

      let buyerNickname = await models.user.findOne({
        attributes: ["nickname"],
        where: { id: buyerId },
      });
      // console.log(sellerNickname);
      buyerNickname = buyerNickname.dataValues.nickname;

      chatList = chatList.map(function (elem) {
        return {
          room: req.body.payload.room,
          author:
            elem.dataValues.user_id === buyerId
              ? buyerNickname
              : sellerNickname,
          user_id: elem.dataValues.user_id === buyerId
              ? buyerId
              : sellerId,
          message: elem.dataValues.text,
          time: "",
        };
      });
      
      res.status(200).send({data: chatList, message: "ok" });
      
    } else {
      res.status(400).send({ message: "잘못된 요청입니다." });
    }
  },

  my: (req, res) => {
    res.status(200).send("POST: /my");
  },
};
