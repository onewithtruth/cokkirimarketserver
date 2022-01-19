const express = require('express');
const router = express.Router();
const controller = require('../controllers/post')

/* GET links listing. */
/**
 * @swagger
 * /post:
 *   post:
 *     description: 새 게시물을 업로드합니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "string, 게시글 제목을 나타낸다."
 *               description:
 *                 type: string
 *                 example: "string, 게시글 내용이다."
 *               price:
 *                 type: integer
 *                 example: "integer, 상품 가격 정보이다."
 *               location:
 *                 example: "string, 게시자가 설정한 위치 정보이다."
 *     responses:
 *        "201":
 *          description: "게시물 업로드 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "successful"
 *        "400":
 *          description: "유효하지 않은 요청입니다."
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid user"
 *        "500":
 *            description: "기타 오류"
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            message:
 *                                type: string
 *                                example: "기타 오류"
 *     
 *   get:
 *     description: 최근 작성 게시물을 불러옵니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       name: page
 *       type: integer
 *       description: n번째 페이지의 자료를 불러옵니다.
 *     responses:
 *        "200":
 *          description: "게시물 불러오기 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    example: "string, 게시글 제목을 나타낸다."
 *                  description:
 *                    type: string
 *                    example: "string, 게시글 내용이다."
 *                  price:
 *                    type: integer
 *                    example: "integer, 상품 가격 정보이다."
 *                  author:
 *                    type: string
 *                    example: "string, 게시글 작성자 정보이다."
 *                  image:
 *                    type: string
 *                    example: "string, 게시글 첨부 이미지의 URL 이다."
 *                  location:
 *                    type: string
 *                    example: "string, 게시자가 설정한 위치 정보이다."
 *                  created_at:
 *                    type: string
 *                    example: "DATETIME, 한국 표준시(KST) 기준 생성 시간을 나타낸다."
 *        "500":
 *            description: "기타 오류"
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            message:
 *                                type: string
 *                                example: "기타 오류"
 * 
 *   delete:
 *     description: 최근 작성 게시물을 불러옵니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       name: page
 *       type: integer
 *       description: n번째 페이지의 자료를 불러옵니다.
 *     responses:
 *        "200":
 *          description: "게시물 불러오기 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    example: "string, 게시글 제목을 나타낸다."
 *                  description:
 *                    type: string
 *                    example: "string, 게시글 내용이다."
 *                  price:
 *                    type: integer
 *                    example: "integer, 상품 가격 정보이다."
 *                  author:
 *                    type: string
 *                    example: "string, 게시글 작성자 정보이다."
 *                  image:
 *                    type: string
 *                    example: "string, 게시글 첨부 이미지의 URL 이다."
 *                  location:
 *                    type: string
 *                    example: "string, 게시자가 설정한 위치 정보이다."
 *                  created_at:
 *                    type: string
 *                    example: "DATETIME, 한국 표준시(KST) 기준 생성 시간을 나타낸다."
 *        "500":
 *            description: "기타 오류"
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            message:
 *                                type: string
 *                                example: "기타 오류"
 * 
 *   patch:
 *     description: 최근 작성 게시물을 불러옵니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       name: page
 *       type: integer
 *       description: n번째 페이지의 자료를 불러옵니다.
 *     responses:
 *        "200":
 *          description: "게시물 불러오기 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    example: "string, 게시글 제목을 나타낸다."
 *                  description:
 *                    type: string
 *                    example: "string, 게시글 내용이다."
 *                  price:
 *                    type: integer
 *                    example: "integer, 상품 가격 정보이다."
 *                  author:
 *                    type: string
 *                    example: "string, 게시글 작성자 정보이다."
 *                  image:
 *                    type: string
 *                    example: "string, 게시글 첨부 이미지의 URL 이다."
 *                  location:
 *                    type: string
 *                    example: "string, 게시자가 설정한 위치 정보이다."
 *                  created_at:
 *                    type: string
 *                    example: "DATETIME, 한국 표준시(KST) 기준 생성 시간을 나타낸다."
 *        "500":
 *            description: "기타 오류"
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            message:
 *                                type: string
 *                                example: "기타 오류"
 *              
 * 
*/

router.get('/', controller.get);
router.post('/', controller.post);
router.get('/my', controller.my);


module.exports = router;
