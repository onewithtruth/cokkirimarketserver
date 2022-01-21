const models = require("../models/index");
const axios = require("axios");

module.exports = {
  get: (req, res) => {
      res.status(200).send('GET: /post')
  }
  
  
};
