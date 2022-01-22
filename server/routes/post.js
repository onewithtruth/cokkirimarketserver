const express = require('express');
const router = express.Router();
const controller = require('../controllers/post')
const { authentication } = require('../controllers/authentication')

/* GET links listing. */
/**
 * @swagger
 * /post:
 *   post:
 *     description: 새 게시물을 업로드합니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: header
 *       required: true
 *       name: Authorization
 *       type: string
 *       description: AccessToken
 *       example: bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "노트북 팝니다"
 *               contents:
 *                 type: string
 *                 example: "거의 새제품이에요 직거래 하실분만 연락주세요"
 *               price:
 *                 type: integer
 *                 example: "1000000"
 *               categories:
 *                 example: "디지털기기"
 *               image_src:
 *                 example: "이미지 링크주소"
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
 *          description: "사용자 인증 관련"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "인증 정보가 만료되었습니다. / 비정상적인 접근입니다."
 *        "500":
 *            description: "기타 오류"
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            message:
 *                                type: string
 *                                example: "데이터베이스 서버 오류 혹은 입력한 값이 잘못되었습니다, 기타 오류"
 *     
 *   get:
 *     description: 최근 작성 게시물을 불러옵니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: query
 *       name: number
 *       type: integer
 *       description: 불러올 게시물의 개수를 나타냅니다.
 *       example: 10
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
 *                    example: "DATETIME, 한국 표준시(KST) 기준 생성 시각을 나타낸다."
 *        "500":
 *          description: "데이터베이스 서버 오류"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "데이터베이스 서버 오류"
 * 
 *   delete:
 *     description: 게시물을 삭제합니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: header
 *       required: true
 *       name: Authorization
 *       type: string
 *       description: AccessToken
 *       example: bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf
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
 * 
 *        "400":
 *          description: "사용자 인증 관련"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "인증 정보가 만료되었습니다. / 비정상적인 접근입니다."
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
 *     description: 게시물을 수정합니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: header
 *       required: true
 *       name: Authorization
 *       type: string
 *       description: AccessToken
 *       example: bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf
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
 *        "400":
 *          description: "사용자 인증 관련"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "인증 정보가 만료되었습니다. / 비정상적인 접근입니다."
 * 
 *        "500":
 *          description: "데이터베이스 서버 오류"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "데이터베이스 서버 오류"
 *              
 * 
 * /post/my:
 *   get:
 *     description: 내 최근 게시물을 불러옵니다.
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: header
 *       required: true
 *       name: Authorization
 *       type: string
 *       description: AccessToken
 *       example: bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf
 *     - in: query
 *       name: number
 *       type: integer
 *       description: 불러올 게시물의 개수를 나타냅니다.
 *       example: 10
 *     responses:
 *        "200":
 *          description: "내 최근 게시물을 불러오는데 성공하였습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "successful"
 *                  data:
 *                    type: object
 *                    properties:
 *                      title:
 *                        type: string
 *                        example: "글 제목"
 *                      contents:
 *                        type: string
 *                        example: "본문"
 *                      price:
 *                        type: string
 *                        example: "가격 정보"
 *                      image_src:
 *                        type: string
 *                        example: "이미지 파일의  주소"
 *                      user_id:
 *                        type: integer
 *                        example: "유저 아이디" 
 *                      createdAt:
 *                        type: string
 *                        example: "글 작성 시각"
 *                      updatedAt:
 *                        type: string
 *                        example: "한국 표준시(KST)기준 최근 수정 시각"
 *        "400":
 *          description: "사용자 인증 관련"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "인증 정보가 만료되었습니다. / 비정상적인 접근입니다."
 *  
 * 
 *        "500":
 *          description: "데이터베이스 서버 오류"
 *          content:
 *            applycation/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "데이터베이스 서버 오류"
 */

router.get('/', controller.get);

//인증이 필요한 부분
router.post('/', authentication, controller.post);
router.delete('/', authentication, controller.delete);
router.patch('/', authentication, controller.patch);
router.get('/my', authentication, controller.my);


module.exports = router;
