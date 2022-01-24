const models = require("../models/index");


module.exports = {
    get: async (req, res) => {
        const number = req.query.number || 10
        const id = req.query.id || null
        let condition = null;
        if(id) {
            condition = {
                id: parseInt(id)
            }
        }
        const posts = await models.post.findAll({
            include: [
                { model: models.post_has_categories,
                    include: { model: models.categories, as: "category", attributes: ["category"] },
                    as: "post_has_categories", attributes: ["categories_id"] },
                    { model: models.user, as: "user", attributes: ["nickname"] },
            ],
            limit: number,
            order: [ [ 'createdAt', 'DESC' ]],
            where: {
                ...condition
            }
        })
        if(posts){
            res.status(200).json({ message: '최근 작성 글 목록을 불러오는데 성공하였습니다.', data: posts })
        } else {
            res.status(500).json({ message: '데이터베이스 서버 오류' })
        }
        
    },
    
    post: async (req, res) => {
        const { title, contents, price, image_src, category } = req.body
        //console.log(image_src) 개발용

        if(title && contents && price && image_src && category) {

            const findCategory = await models.categories.findOne({
                where: {
                    id: category,
                }
            })

            if(!findCategory) {
                return res.status(500).json({ message: '존재하지 않는 카테고리입니다.' })
            } else {
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
                    categories_id: findCategory.id
                }
    
                const MappingCategory = await models.post_has_categories.create(categoryData)
                
                if(newPost && category && MappingCategory) {
                    res.status(201).json({ message: '게시물 업로드 성공' })
                } else {
                    res.statue(500).json({ message: '데이터베이스 서버 오류 혹은 입력한 값이 잘못되었습니다.' })
                }                
            }
            
        } else {
            res.status(500).json({ message: '기타 오류' })
        }
        
    },

    patch: async (req, res) => {
        const id = req.query.id
        const patchData = {}
        const keysArr = Object.keys(req.body)
        
        if(id) {
            const post = await models.post.findOne({ where: {id: id} })
            if(!post){
                return res.status(500).json({ message: '존재하지 않는 게시물입니다.'})
            }

            const userIdFromPost = post.dataValues.user_id
            if(userIdFromPost === req.userInfo.id) {
                keysArr.forEach(elements => {
                    if(req.body[elements]){
                        patchData[elements] = req.body[elements]
                    }
                })
        
                const post = await models.post.update(patchData, {
                    where: {
                        id: id
                    }
                })

                if(post) {
                    res.status(200).json({ message: '작성글 정보를 성공적으로 수정하였습니다.'})
                } else {
                    res.status(500).json({ mesaage: '기타 오류' })
                }
        

            } else {
                res.status(403).json({ message: '권한이 없습니다.' })
            }

        } else {
            res.status(500).json({ mesaage: '기타 오류' })
        }

    },

    delete: async (req, res) => {
        const id = req.query.id

        if(id) {
            const post = await models.post.findOne({ where: {id: id} })
            if(!post){
                return res.status(500).json({ message: '존재하지 않는 게시물입니다.'})
            }

            const userIdFromPost = post.dataValues.user_id
            
            if(userIdFromPost === req.userInfo.id) {
        
                const deletedPost = await models.post.destroy({
                    where: {
                        id: id
                    }
                })

                if(deletedPost) {
                    res.status(200).json({ message: '작성글 정보를 성공적으로 삭제하였습니다.'})
                } else {
                    res.status(500).json({ mesaage: '기타 오류' })
                }
        

            } else {
                res.status(403).json({ message: '권한이 없습니다.' })
            }

        } else {
            res.status(500).json({ mesaage: '기타 오류' })
        }

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
                //attributes: { exclude: ["id"] }
            })
            console.log(posts)

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
