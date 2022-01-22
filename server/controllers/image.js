require("dotenv").config();

const cloudFlareACCID = process.env.CLOUDFLARE_ACCOUNT_ID;
const cloudFlareAPITOKEN = process.env.CLOUDFLARE_API_TOKEN;
const axios = require("axios");

module.exports = {
  
  getimages: async (req, res) => {
    const options = {
      method: "GET",
      url: `https://api.cloudflare.com/client/v4/accounts/${cloudFlareACCID}/images/v1?page=1&per_page=50`,
      headers: {
        'X-Auth-Email': 'onewithtruth@gmail.com',
        'X-Auth-Key': `${cloudFlareAPITOKEN}`,
        'Content-Type': 'application/json',
      },
    }

    await axios(options)
      .then((response) => {
        // console.log(response.data.result)
        const payload = response.data.result;
        res.status(201).send({data: payload,  message: "ok"})
      })
      .catch((err) => {
        res.status(400).send({ message: '잘못된 요청입니다.' })
      });
  },

  geturl: async (req, res) => {

    const options = {
      method: "POST",
      url: `https://api.cloudflare.com/client/v4/accounts/${cloudFlareACCID}/images/v1/direct_upload`,
      headers: {
        'X-Auth-Email': 'onewithtruth@gmail.com',
        'X-Auth-Key': `${cloudFlareAPITOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  
    await axios(options)
      .then((response) => {
        // console.log(response.data.result)
        const payload = response.data.result;
        res.status(201).send({data: payload, message: "ok"}) 
      })
      .catch((err) => {
        res.status(400).send({ message: '잘못된 요청입니다.' })
      });
  }
}