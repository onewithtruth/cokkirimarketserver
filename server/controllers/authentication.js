//모든 인증 요청을 받는 라우터입니다.
const {
    isAuthorized,
    checkRefeshToken,
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
  } = require('./tokenControllers');

module.exports = {
    authentication: async (req, res, next) => {
        console.log('인증 요청 발생')
        const userInfoFromAccessToken = await isAuthorized(req) // 엑세스 토큰에서 복호화한 유저정보
        const userInfoFromRefreshToken = await checkRefeshToken(req) //리프레시 토큰에서 복호화한 유저정보
        console.log('userInfoFromAccessToken 는 ', userInfoFromAccessToken) //개발용
        console.log('userInfoFromRefreshToken 는', userInfoFromRefreshToken) //개발용

        if(userInfoFromAccessToken){  
            //일단 엑세스 토큰이 유효하면 인증 완료
            //판단을 유보하고 다음 컨트롤러로 유저 정보와 함께 요청 전달
            req.userInfo = userInfoFromAccessToken
            next();
        } else if(!userInfoFromAccessToken && !userInfoFromRefreshToken) {  // 엑세스 토큰, 리프레시 토큰이 모두 만료된 경우
            res.status(401).json({ message: '인증 정보가 만료되었습니다.' })
        } else if(userInfoFromAccessToken !== userInfoFromRefreshToken) {
            res.status(400).json({ message: '비정상적인 접근입니다.' }) // 엑세스 토큰, 리프레시 토큰에서 복호화된 정보가 서로 다른 경우
        } else { //리프레시 토큰을 DB 정보와 대조후 엑세스 토큰과 같이 재발급 , 현재 DB 대조는 진행되지 않는다.
            console.log('토큰 재발급')
            res.accessToken = generateAccessToken(userInfoFromRefreshToken)
            const refreshToken = generateRefreshToken(userInfoFromRefreshToken)
            sendRefreshToken(res, refreshToken)
            next();
        }
    },
};

