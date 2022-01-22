const express = require('express');
const router = express.Router();
const controller = require('../controllers/oauth')

/* GET links listing. */

/**
 * @swagger
 * 
 * /oauth/github:
 *   post:
 *     description: Github OAuth 2.0 을 통해 가입 및 로그인을 요청합니다.
 *     tags: [OAuth2.0]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               authorizationCode:
 *                 type: string
 *                 example: <received authorizationCode>
 *     responses:
 *       "201":
 *         description: "성공적으로 로그인 되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *       "500":
 *           description: "잘못된 요청입니다."
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: "잘못된 요청입니다."
 * /oauth/google:
 *   post:
 *     description: Google OAuth 2.0 을 통해 가입 및 로그인을 요청합니다.
 *     tags: [OAuth2.0]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               authorizationCode:
 *                 type: string
 *                 example: <received authorizationCode>
 *     responses:
 *       "201":
 *         description: "성공적으로 로그인 되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *       "500":
 *           description: "잘못된 요청입니다."
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: "잘못된 요청입니다."
 * /oauth/kakao:
 *   post:
 *     description: Kakao OAuth 2.0 을 통해 가입 및 로그인을 요청합니다.
 *     tags: [OAuth2.0]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               authorizationCode:
 *                 type: string
 *                 example: <received authorizationCode>
 *     responses:
 *       "201":
 *         description: "성공적으로 로그인 되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *       "500":
 *           description: "잘못된 요청입니다."
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: "잘못된 요청입니다."
 * 
 * 
 */

router.post('/oauthgithub', controller.oauthgithub);
router.post('/oauthgoogle', controller.oauthgoogle);
router.post('/oauthkakao', controller.oauthkakao);

module.exports = router;