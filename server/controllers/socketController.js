const models = require("../models/index");
const axios = require("axios");
const { Op } = require("sequelize");

module.exports = {
  post: async (req, res) => {
    // console.log(req.body)
    
    if(req.body.payload){
      let postLists;
      let categoryLists;

      if (req.body.payload.category_id === 0) {
               
        postLists = await models.post.findAll({
          where: {
            title: {
              [Op.like]: '%' + req.body.payload.query + '%'
            }
          }
        })

        res.status(201).send({data: postLists, message: "ok"})

      } 

    } else {
        res.status(500).json({ message: '기타 오류' })
    }
  }
  
  
};
