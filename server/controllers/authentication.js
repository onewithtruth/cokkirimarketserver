//모든 인증 요청을 받는 라우터입니다.
const {
    isAuthorized,
  } = require('./tokenControllers');

module.exports = {
    authentication: (req, res, next) => {
        console.log('인증 요청 발생')
        if(!isAuthorized(req)){  //authorization 헤더에 엑세스 토큰이 포함되어있는지 검사한다.
            res.status(400).json({ message: '잘못된 요청입니다.' })
        } else {
            next();
        }
    },
};
