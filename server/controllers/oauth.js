require("dotenv").config();

const axios = require("axios");
const jwt = require('jsonwebtoken')
const {user, refreshtoken} = require('../models')

module.exports = {
  
  oauthgithub: async (req, res) => {
    // console.log(req.body)

    const accessTokenOptions = {
      method: "POST",
      url: "https://github.com/login/oauth/access_token",
      headers: {
        "Accept": "application/json"
      },
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.body.authorizationCode,
      },
    }

    let githubResponse = await axios(accessTokenOptions).catch((err) => {
      res.status(400).send({ message: '잘못된 요청입니다.' })
    });
    // console.log(githubResponse.data.error === "bad_verification_code");
    if (githubResponse.data.error === "bad_verification_code") {
      res.status(203).send({ message: 'code from other source' })
    } else {
      let githubAccessToken = githubResponse.data.access_token;
      console.log(githubAccessToken);
      const userInfoOptions = {
        method: "GET",
        url: 'https://api.github.com/user',
        headers: {
          authorization: `token ${githubAccessToken}`,
        }
      }
      
      let githubUserdataResponse = await axios(userInfoOptions);
      let { email } = githubUserdataResponse.data
    
      const existingUser = await user.findOne({
        where: {
          "email": email
        }
      });
      
      const tokenMaker = async (user) => {
        const payload = {
          id: user.dataValues.id,
          email: user.dataValues.email,
          createdAt: user.dataValues.createdAt,
          updatedAt: user.dataValues.updatedAt
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: "5m"});
        const refreshToken =  jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "1d"});
        const newResponse = {accessToken: accessToken, email: user.dataValues.email};
        // console.log(refreshToken)
        res.status(201).cookie("refreshToken", refreshToken, {
          domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .send({data: newResponse, message: "ok" });
        
        const existingRefreshToken = await refreshtoken.findOne({
          where: {
            "user_id": user.dataValues.id
          }
        });
      
        if (!existingRefreshToken) {
          const newRefreshToken = await refreshtoken.create({
            "refreshtoken": refreshToken,
            "user_id": user.dataValues.id
          })
          // console.log(newRefreshToken)
        } else {
          const updatedRefreshToken = await refreshtoken.update({
            "refreshtoken": refreshToken
          }, {
            where: {
              "user_id": user.dataValues.id
            }
          });
          // console.log(updatedRefreshToken);
        };
      }

      if (!existingUser) {
        function getNickname(str) {
          let aIndex = str.indexOf("@");
          return str.slice(0, aIndex);
        }
        let nickname = getNickname(email)
        const newUser = await user.create({
          "email": email,
          "nickname": nickname
        });
        // console.log("newUser's Data:", newUser.dataValues);
        tokenMaker(newUser)
      } else {
        // console.log(existingUser.dataValues)
        tokenMaker(existingUser)
      }
    }

    
  },

  oauthgoogle: async (req, res) => {
    // console.log(req.body.authorizationCode)
    const accessTokenOptions = {
      method: "POST",
      url: `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${req.body.authorizationCode}&grant_type=authorization_code&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`,
    };

    let googleResponse = await axios(accessTokenOptions).catch((err) => {
      res.status(400).send({ message: '잘못된 요청입니다.' })
    });

    // console.log(googleResponse)

    if (googleResponse === undefined) {

      res.status(203).send({ message: 'code from other source' });

    } else {

      let googleAccessToken = googleResponse.data.access_token;

      const userInfoOptions = {
        method: "GET",
        url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleAccessToken}`
      };
      
      let googleDataResponse = await axios(userInfoOptions);
      // console.log(googleDataResponse.data)
      let { email} = googleDataResponse.data
    
      const existingUser = await user.findOne({
        where: {
          "email": email
        }
      });
      
      const tokenMaker = async (user) => {
        const payload = {
          id: user.dataValues.id,
          email: user.dataValues.email,
          createdAt: user.dataValues.createdAt,
          updatedAt: user.dataValues.updatedAt
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: "5m"});
        const refreshToken =  jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "1d"});
        const newResponse = {accessToken: accessToken, email: user.dataValues.email};
        // console.log(refreshToken)
        res.status(201).cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .send({data: newResponse, message: "ok" });
        
        const existingRefreshToken = await refreshtoken.findOne({
          where: {
            "user_id": user.dataValues.id
          }
        });
      
        if (!existingRefreshToken) {
          const newRefreshToken = await refreshtoken.create({
            "refreshtoken": refreshToken,
            "user_id": user.dataValues.id
          })
          // console.log(newRefreshToken)
        } else {
          const updatedRefreshToken = await refreshtoken.update({
            "refreshtoken": refreshToken
          }, {
            where: {
              "user_id": user.dataValues.id
            }
          });
          // console.log(updatedRefreshToken);
        };
      }

      if (!existingUser) {
        function getNickname(str) {
          let aIndex = str.indexOf("@");
          return str.slice(0, aIndex);
        }
        let nickname = getNickname(email)
        const newUser = await user.create({
          "email": email,
          "nickname": nickname
        });
        // console.log("newUser's Data:", newUser.dataValues);
        tokenMaker(newUser)
      } else {
        // console.log(existingUser.dataValues)
        tokenMaker(existingUser)
      }
    }

    
  },

  oauthkakao: async (req, res) => {
    const accessTokenOptions = {
      method: "POST",
      url: `https://kauth.kakao.com/oauth/token?code=${req.body.authorizationCode}&client_id=${process.env.KAKAO_CLIENT_ID}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&grant_type=authorization_code`,
    }
    let kakaoResponse = await axios(accessTokenOptions).catch((err) => {
      res.status(400).send({ message: '잘못된 요청입니다.' })
    });

    if (kakaoResponse === undefined){

      res.status(203).send({ message: 'code from other source' })

    } else {
      const kakaoAccessToken = kakaoResponse.data.access_token;
      const userInfoOptions = {
        method: "GET",
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      }
      
      let kakaoDataResponse = await axios(userInfoOptions);
      // console.log(kakaoDataResponse)
      // let nickname = kakaoDataResponse.data.properties.nickname
      let email = kakaoDataResponse.data.kakao_account.email
      // console.log(email)
      // console.log(nickname)
      const existingUser = await user.findOne({
        where: {
          "email": email
        }
      });
      
      const tokenMaker = async (user) => {
        const payload = {
          id: user.dataValues.id,
          email: user.dataValues.email,
          createdAt: user.dataValues.createdAt,
          updatedAt: user.dataValues.updatedAt
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: "5m"});
        const refreshToken =  jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: "1d"});
        const newResponse = {accessToken: accessToken, email: user.dataValues.email };
        // console.log(refreshToken)
        res.status(201).cookie("refreshToken", refreshToken, {
          domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
        .send({data: newResponse, message: "ok" });

        const existingRefreshToken = await refreshtoken.findOne({
          where: {
            "user_id": user.dataValues.id
          }
        });
      
        if (!existingRefreshToken) {
          const newRefreshToken = await refreshtoken.create({
            "refreshtoken": refreshToken,
            "user_id": user.dataValues.id
          })
          // console.log(newRefreshToken)
        } else {
          const updatedRefreshToken = await refreshtoken.update({
            "refreshtoken": refreshToken
          }, {
            where: {
              "user_id": user.dataValues.id
            }
          });
          // console.log(updatedRefreshToken);
        };
      }
      
      if (!existingUser) {
        function getNickname(str) {
          let aIndex = str.indexOf("@");
          return str.slice(0, aIndex);
        }
        let nickname = getNickname(email)
        const newUser = await user.create({
          "email": email,
          "nickname": nickname
        });
        // console.log("newUser's Data:", newUser.dataValues);
        tokenMaker(newUser)
      } else {
        // console.log(existingUser.dataValues)
        tokenMaker(existingUser)
      }
    }

    
  }

}