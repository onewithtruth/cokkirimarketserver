const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
const { authentication } = require('../controllers/authentication')

/* GET links listing. */

/**
 * @swagger
 * 
 * /user/signup:
 *   post:
 *     description: 회원 가입을 요청합니다.
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "string, ID"
 *               email:
 *                 type: string
 *                 example: "string, 이메일"
 *               password:
 *                 type: string
 *                 example: "string, 암호화된 비밀번호"
 *               phone:
 *                 type: string
 *                 example: "string, 연락처"
 *     responses:
 *       "201":
 *         description: "계정이 성공적으로 생성되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "successful"
 *       "500":
 *           description: "기타 오류"
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: "기타 오류"
 * 
 * /user/authorize:
 *   post:
 *     description: 게시물 생성
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       name: user
 *       required: true
 *       type: integer
 *       description: 유저 Id
 *     responses:
 *       "200":
 *         description: "successful operation"
 * 
 * /user/mypage:
 *   get:
 *     description: 유저의 개인정보 및 마이페이지 정보 조회를 위한 엔드포인트
 *     tags: [User]
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
 *       name: user
 *       required: true
 *       type: integer
 *       description: 유저 Id
 *     responses:
 *       "200":
 *         description: "successful operation"
 * 
 * 
 * /user/login:
 *   post:
 *     description: 이메일 아이디를 이용해 로그인합니다.
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 example: "pZCI6Miwibmlja25hbWUiOiJkYWh5ZW9uNSIsImVtYWlsIjoiZGFoeWVvbjE3MTJAZGd1LmFjLmtyI"
 *     responses:
 *       "200":
 *         description: "로그인 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
 *                 accessToken:
 *                   type: string
 *                   example: "dcnIqKHvvsFNQRSpZvUoRmHlpbIOWvpsEundLeKoezkgwSQWXqYtLCoikaNnojmjAYtJXdslPermxNBdnWiFYkCvqOINgbNNjACdoONsNyTghXZTtRvHPCQjhYZWKavXfVMBArzVfhRsDYynzwezQGVtOufuYSwxFhSKTZsdlEDutoXwmMaGSYJfyGhDYkOUkACinyQiQLZyFfSffKEDoFtbCozJrRmzoXsPbbjetarTzJBiMbDKxGMuDAQUhrkIDqmqNAadrhhCxjASmReOUyZskiuAspiBhnghvcQxfARFlVfaRHRxaPBcuIxxGdMCskkuAhuVOiVgdldSlRKwTaYdrUYKaaKnHylHeeAKJmjmBaAPTMKJICWJKUtKNuvVBUHVbBzyYMrplOGLaLIGoPIuXuCMFXHwGFZFjphIoafDsVrGYdRbgshJgJCiLhFrbUfZVtvASqKTvhONQZjfnoYBAYQgAJNSiIyyTEBhCrCtmRgkEwyXYazQsztOdMcTpZvfVLYUOlxgCSbfIDCFgKDNsoUBUkJDwpMwbOxEGMwPgYdpYAqaTNpdXTQlbYraRQoqHynfMHMYTZYTAWUCEWLyETKnksnsJWxHEyIQWzunLxDaptgTmVpDOamhXDbRsYyOvfsDtAMsoeEIvbFGWrDhIQpJtFzPjJEFzxxVcQIAICCqMaWDFPNwcTgSkeZKocBpKezaZXyjLgPfCywkibvkNtePMFwGzjXjVPnXmoXhEhfwmGaIGDSVBNxaIKhuJUnPqZxXVdkiYnwzvHIqIkmMeshKlhEfoAlCaoZOsffkiqmZUvXBiozRXkjIehErKPVdlqkqLnLDxdNdHyxdWspvFoJfmoaNcSVdNqfpFTVSFCujqqSfjkYZnIuJqBQbDxFLuCskqinefhdEfLaJMnBmlYNpFpQFeIUfHoZbJicMWxBIblSVCrHwbOkLuHWdYopEJsrcoHHjeuAhBmFRauPllwFFsdYwwiFffCkmHjqxsomIehivsFAkHEJiuvwt"
 * 
 *       "400":
 *         description: "로그인 정보의 유효성 문제로 로그인에 실패하였습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 실패"
 *       "500":
 *           description: "기타 오류"
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: "기타 오류"
 * 
 * /user/logout:
 *   post:
 *     description: 로그 아웃
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: header
 *       required: true
 *       name: Authorization
 *       type: string
 *       description: AccessToken
 *       example: bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf
 *     responses:
 *       "200":
 *         description: "successful operation"
 * 
 * /user/delete:
 *  delete:
 *      description: 회원 탈퇴를 요청합니다.
 *      tags: [User]
 *      parameters:
 *      - in: header
 *        required: true
 *        name: Authorization
 *        type: string
 *        description: AccessToken
 *        example: bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf
 *      responses:
 *          "204":
 *              description: "회원 탈퇴에 성공하였습니다."
 *              content:
 *                  applycation/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "successful"
 *          "400":
 *              description: "유효하지 않은 요청입니다."
 *              content:
 *                  applycation/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Invalid user"
 *          "500":
 *              description: "기타 오류"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "기타 오류"
 * 
 * /user/isduplicated/:
 *    get:
 *      description: 회원가입 시 이메일 인증을 위한 엔드포인트
 *      tags: [User]
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - in: query
 *        name: email
 *        required: true
 *        type: string
 *        description: 중복 조회할 이메일 아이디
 *      responses:
 *        "200":
 *          description: "사용가능 여부를 리턴합니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "사용가능한 닉네임 입니다 / 중복된 닉네임입니다."
 *        "400":
 *          description: "만료된 인증 요청"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "만료된 인증 요청"
 *  
 * /user/verification/{token}:
 *    get:
 *      description: 회원가입 시 이메일 인증을 위한 엔드포인트
 *      tags: [User]
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - in: path
 *        name: token
 *        required: true
 *        type: string
 *        description: 인증 토큰
 *      responses:
 *        "200":
 *          description: "인증 완료"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "인증 완료"
 *        "400":
 *          description: "만료된 인증 요청"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "만료된 인증 요청"
 * 
 */

//인증이 필요한 경우에 authentication 컨트롤러를 먼저 전달한다.
router.get('/logout', authentication, controller.logout);
router.get('/mypage', authentication, controller.mypage)

router.post('/login', controller.login);
router.get('/verification', controller.verification);
router.post('/signup', controller.signup)
router.get('/isduplicated', controller.isduplicated)


module.exports = router;
