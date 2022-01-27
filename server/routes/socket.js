const express = require('express');
const router = express.Router();
const controller = require('../controllers/socketController')

/* GET links listing. */

/**
 * @swagger
 * 
 * /socket/chatroomlist:
 *   post:
 *     description: DB에 자신의 채팅 Room 리스트를 요청해 받습니다.
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
 *                       example: <ChatRoomList DATA EXAMPLE>
 *                     "mynickname":
 *                       type: "string"
 *                       example: "c2"
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
 * /socket/chatroom:
 *   post:
 *     description: DB에 자신의 Room의 대화로그 리스트를 요청해 받습니다.
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
 *                     "room":
 *                       type: "string"
 *                       example: "4#onewithtruth@gmail.com" 
 *                     "user_id":
 *                       type: "seller_id"
 *                       example: 2
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
 *                   example: <ChatLogList DATA EXAMPLE>
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