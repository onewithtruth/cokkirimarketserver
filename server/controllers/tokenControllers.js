require("dotenv").config();
const models = require("../models");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (payload) => {
    return sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },
  generateRefreshToken: (payload) => {
    return sign(payload, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.json({ accessToken: accessToken, message: "로그인 성공" });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, userInfo: data }, message: "ok" });
  },
  isAuthorized: async (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  checkRefeshToken: async (req) => {
    const refreshToken = req.cookies.refreshToken
    try {
      userInfo = await verify(refreshToken, process.env.REFRESH_SECRET);

      const refreshTokenFromDB = await models.refreshtoken.findOne({
        where: {
            user_id: userInfo.id
        },
        order: [ [ 'createdAt', 'DESC' ]]
      })

      if(refreshToken === refreshTokenFromDB.refreshtoken){
        return userInfo
      } else {
        return null
      }

    } catch (err) {
      return null;
    }


  },
};