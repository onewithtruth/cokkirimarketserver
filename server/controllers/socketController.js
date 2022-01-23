const models = require("../models");
const axios = require("axios");


module.exports = {
    get: (req, res) => {
        console.log(req.body.payload)
        res.status(200).send('GET: /post')
    },
    
    post: async (req, res) => {
        // console.log(req.body.payload)

        let myId = req.body.payload.user_id
        // console.log(myId)

        let postAuthorId = await models.post.findOne({
          attributes: ['user_id'],
          where: {
            "id": req.body.payload.post_id
          }
        });
        postAuthorId = postAuthorId.dataValues.user_id
        // console.log(postAuthorId)

        let chatIdList = await models.post_has_chat.findAll({
          where: {
            "post_id": req.body.payload.post_id
          }
        });
        
        chatIdList = chatIdList.map((elem) => {
          return elem.dataValues.chat_id
        })

        console.log(chatIdList)
        res.status(200).send('POST: /post')
    },

    my: (req, res) => {
        res.status(200).send('POST: /my')
    },
};