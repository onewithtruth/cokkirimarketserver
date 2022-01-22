const models = require("../models/index");
const Post_has_categories = models.post_has_categories
const sequelize = models.sequelize
const Post = models.post
const Categories = models.categories


module.exports = {
    get: async (req, res) => {
        const number = req.query.number || 10
        const posts = await models.post.findAll({
            include: [
                { model: models.post_has_categories,
                    include: { model: models.categories, as: "category", attributes: ["category"] },
                    as: "post_has_categories", attributes: ["categories_id"] },
            ],
            limit: number,
            order: [ [ 'createdAt', 'DESC' ]]
        })
        if(posts){
            res.status(200).json({ message: '최근 작성 글 목록을 불러오는데 성공하였습니다.', data: posts })
        } else {
            res.status(500).json({ message: '데이터베이스 서버 오류' })
        }
        
    },
    
    post: async (req, res) => {
        const { title, contents, price, image_src, categories } = req.body
        console.log(image_src)

        if(title && contents && price && image_src && categories) {

            const category = await models.categories.findOne({
                where: {
                    category: categories,

                }
            })

            if(!category) {
                return res.status(500).json({ message: '존재하지 않는 카테고리입니다.' })
            }

            const postData = {
                title: title,
                contents: contents,
                price: price,
                image_src: image_src,
                user_id: req.userInfo.id
            }

            const newPost = await models.post.create(postData)
            const newPostId = newPost.dataValues.id
            


            const categoryData = {
                post_id: newPostId,
                categories_id: category.id
            }

            const categoryMapping = await models.post_has_categories.create(categoryData)

            console.log(categoryMapping)

            
            
            if(newPost && category && categoryMapping) {
                res.status(201).json({ message: '게시물 업로드 성공' })
            } else {
                res.statue(500).json({ message: '데이터베이스 서버 오류 혹은 입력한 값이 잘못되었습니다.' })
            }
        } else {
            res.status(500).json({ message: '기타 오류' })
        }
        
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
                    { model: models.user, where: {id: userId}, as: "user", attributes: [] },
                    { model: models.post_has_categories,
                        include: { model: models.categories, as: "category", attributes: ["category"] },
                        as: "post_has_categories", attributes: ["categories_id"] },
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
