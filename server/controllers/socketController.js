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
        // console.log(postLists[0].dataValues)
        postLists = postLists.filter((function(elem){
          return elem.title.indexOf(req.body.payload.query) !== -1;
        }));

        res.status(201).send({data: postLists, message: "ok"})

      } else {

        categoryLists = await models.post_has_categories.findAll({
          where: {
            categories_id: req.body.payload.category_id
          }
        })
        categoryLists = categoryLists.map((elem) => {
          return elem.dataValues.post_id
        })
        // console.log(categoryLists)
        
        postLists = await models.post.findAll({
          where: {
            id: {
              [Op.or]: categoryLists
            }
          }
        })
        // console.log(postLists[0].dataValues)
        postLists = postLists.filter((function(elem){
          return elem.title.indexOf(req.body.payload.query) !== -1;
        }));
        res.status(200).send({data: postLists, message: "ok"})

      }

    } else {
        res.status(500).json({ message: '기타 오류' })
    }
  }
  
  
};
