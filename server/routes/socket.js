const express = require('express');
const router = express.Router();
const controller = require('../controllers/socketController')

/* GET links listing. */

/**
 * @swagger
 * 
 * /socket/chatroomlist:
 *   post:
 *     description: DB에 자신의 채팅 리스트를 요청해 받습니다.
 *     tags: [socket.io chat]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: header
 *       required: true
 *       name: User Information
 *       type: number
 *       description: UserId
 *       example: 78
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 "payload":
 *                   type: object
 *                   properties:
 *                     "user_id":
 *                       type: "number"
 *                       example: 78 
 *     responses:
 *       "201":
 *         description: "ok"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     chatListInfoOutput:
 *                       type: "object"
 *                       example: <chatList DATA EXAMPLE>
 *                     "mynickname":
 *                       type: "string"
 *                       example: "c2"
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

router.post('/chatroom', controller.chatroom);
router.post('/chatroomlist', controller.chatroomlist);

module.exports = router;