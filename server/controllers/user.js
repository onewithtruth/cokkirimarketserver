const models = require("../models");
const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken,
    checkRefeshToken,
  } = require('./tokenControllers');

module.exports = {
    logout: (req, res) => {
        res.clearCookie('refreshToken')
        //db에서 말소시키는 과정이 들어가야 하는 자리
        res.status(200).send('로그아웃 요청이 성공적으로 완료되었습니다.')
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
                sendRefreshToken(res, refreshToken)
                res.json({ 
                    accessToken: accessToken,
                    message: "로그인 성공"
                });
            } else {
                //올바르지 않은 유저 정보
                res.status(400).json({ message: '로그인 정보의 유효성 문제로 로그인에 실패하였습니다.' })
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
                where: { email: email },
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
    
    mypage: (req, res) => {
        console.log(req.userInfo)
        res.status(200).send({ message: 'successful', userInfo: req.userInfo})
    },

    isduplicated: async (req, res) => {
        const email = req.query.email //쿼리 파라미터로 email 값을 받아온다.
        //console.log(email)
        if(email) {     
            const user = await models.user.findOne({  //해당 email을 검색한다
                where: {
                    email: email
                }
            })

            if(user) {      // user = 발견 시 true 미발견 시 false
                res.status(200).send({ message: '중복된 닉네임입니다.' })
            } else {
                res.status(200).send({ message: '사용가능한 닉네임입니다.' })
            }

        } else {
            res.status(400).send({ message: '잘못된 요청입니다.' })
        }
    },

    delete: async (req, res) => {
        const userInfoFromAccessToken = req.userInfo
        const userInfoFromRefreshToken = await checkRefeshToken(req)
        console.log('회원 탈퇴 요청, 각 토큰에서 해석한 유저 email은 각각 다음과 같습니다.', req.userInfo.id, userInfoFromRefreshToken.id)
        console.log('쿠키는', req.cookies)
        const keysArr = Object.keys(userInfoFromRefreshToken)
        
        delete userInfoFromAccessToken.createdAt
        delete userInfoFromAccessToken.updatedAt
        delete userInfoFromAccessToken.iat
        delete userInfoFromAccessToken.exp

        delete userInfoFromRefreshToken.createdAt
        delete userInfoFromRefreshToken.updatedAt
        delete userInfoFromRefreshToken.iat
        delete userInfoFromRefreshToken.exp

        keysArr.forEach((elements) => {
            if(userInfoFromAccessToken[elements] !== userInfoFromRefreshToken[elements]) {
                return res.status(401).json({ message: '인증 정보가 만료되었습니다.' })
            }
        })
        const deletedUser = await models.user.destroy({
            where: {
                id: userInfoFromAccessToken.id
            }
        })
        if(deletedUser) {
            console.log(deletedUser)
            res.status(204).json({ message: '회원 탈퇴 요청이 성공적으로 처리되었습니다.' })
        } else {
        res.status(500).json({message: '기타 오류'})
        }

       
    }
};
