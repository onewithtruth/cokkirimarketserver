const models = require("../models/index");


module.exports = {
    get: async (req, res) => {
        const number = req.query.number || 10
        const posts = await models.post.findAll({
            limit: number,
            order: [ [ 'createdAt', 'DESC' ]]
        })
        console.log
        if(posts){
            res.status(200).json({ message: '최근 작성 글 목록을 불러오는데 성공하였습니다.', data: posts })
        } else {
            res.status(500).json({ message: '데이터베이스 서버 오류' })
        }
        
    },
    
    post: (req, res) => {
        res.status(200).send('POST: /post')
    },

    patch: (req, res) => {
        res.status(200).send('POST: /post')
    },

    delete: (req, res) => {

    },

    my: async (req, res) => {
        const number = parseInt(req.query.number) || 10
        console.log(number)
        const userId = req.userInfo.id
        //console.log(req.userInfo)
        if(userId){
            const posts = await models.post.findAll({
                include: [
                    { model: models.user, where: {id: userId}, as: "user", attributes: ["id"] },
                ],
                limit: number,
                order: [ [ 'createdAt', 'DESC' ]],
                attributes: { exclude: ["id"] }
            })

            if(posts){
                res.status(200).json({ message: '내 최근 작성 글 목록을 불러오는데 성공하였습니다.', data: posts })
            } else {
                res.status(500).json({ message: '데이터베이스 서버 오류' })
            }

        } else {
            req.status(500).json({ message: '알수 없는 오류', code: 'EP001' })
        }
    },

    signin: (req, res) => {
        const body = req.body
        res.status(200).send('POST: /user/signin, body : ', body)
    },
};
