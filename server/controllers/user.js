const models = require("../models");
const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken,
  } = require('./tokenControllers');

module.exports = {
    logout: (req, res) => {
        res.status(200).send('GET: user/post')
    },
    
    login: async (req, res) => {
        const { email, password } = req.body
        if(email && password){
            const user = await models.user.findOne({
                where: {
                    email: email,
                    password: password,
                }
            })

            if(user) {
                //로그인성공
                delete user.dataValues.password
                
                const accessToken = generateAccessToken(user.dataValues)
                const refreshToken = generateRefreshToken(user.dataValues)

                sendAccessToken(res, accessToken)
            } else {
                //올바르지 않은 유저 정보
                res.status(400).json({ message: '로그인 실패' })
            } 

        } else {
            res.status(500).json({ message: '기타 오류' })
        }
    },

    verification: (req, res) => {
        res.status(200).send('POST: user/verification')
    },

    signup: async (req, res) => {
        const { user_id, email, password } = req.body

        console.log('바디는', req.body)

        if(user_id && email && password){
            const newUserInfo = {
                nickname: user_id,
                email: email,
                password: password,
                phone: '010-1234-5678',
            }

            const [user, iscreated] = await models.user.findOrCreate({
                where: { nickname: user_id },
                defaults: newUserInfo
            })
            
            //console.log(iscreated)
            if(iscreated){
                res.status(201).json({ message: 'successful' })
            } else {
                res.status(400).json( { message: '닉네임이 중복되었습니다.' })
            }
            

        } else {
            res.status(500).json({ message: '기타 오류' })
        }
    },
};
