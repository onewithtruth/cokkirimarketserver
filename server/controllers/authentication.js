//모든 인증 요청을 받는 라우터입니다.
const {
    isAuthorized,
  } = require('./tokenControllers');

module.exports = {
    authentication: async (req, res, next) => {
        console.log('인증 요청 발생')
        const userInfo = await isAuthorized(req) // 토큰에서 해석된 유저정보
        console.log('userInfo 는 ', userInfo)
        if(!userInfo){  //authorization 헤더에 엑세스 토큰이 포함되어있는지 검사한다.
            res.status(400).json({ message: '잘못된 요청입니다.' })
        } else {
            //인증 완료
            //판단을 유보하고 다음 컨트롤러로 유저 정보와 함께 요청 전달
            req.userInfo = userInfo
            next();
        }
    },
};
