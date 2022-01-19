const express = require('express');
const router = express.Router();
const controller = require('../controllers/chat')

/**
 * @swagger
 * /chat/room:
 *   get:
 *     description: 채팅방 목록을 불러옵니다.
 *     tags: [Chat]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "채팅방 목록을 불러오는데 성공했습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_uuid:
 *                   type: string
 *                   example: "string, 채팅 상대방 유저의 고유 식별자이다. "
 *                 title:
 *                   type: string
 *                   example: "string, 채팅방이 속한 게시글 제목을 나타낸다. 중복일 경우 가장 최신 게시물이 된다."
 *                 last_chat:
 *                   type: string
 *                   example: "string, 해당 채팅방의 마지막 메시지 내용이다."
 *                 unread:
 *                   type: integer
 *                   example: "integer, 읽지 않은 메시지의 갯수를 나타낸다."
 *                 updated_at:
 *                   type: string
 *                   example: "DATETIME, 한국 표준시(KST) 기준 마지막 메시지가 전송된 시각을 나타낸다."
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
 * /chat:
 *   get:
 *     description: 채팅 메시지를 불러옵니다.
 *     tags: [Chat]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       required: true
 *       name: user_uuid
 *       type: string
 *       description: 채팅 메시지를 불러올 상대방의 uuid
 *       example: 123213
 *     responses:
 *       "200":
 *         description: "채팅 메시지를 불러오는데 성공했습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nickname:
 *                   type: string
 *                   example: "string, 채팅 상대방 유저의 닉네임이다."
 *                 text:
 *                   type: string
 *                   example: "string, 메시지 본문이다."
 *                 created_at:
 *                   type: string
 *                   example: "string, 한국 표준시(KST) 기준 메시지가 전송된 시각을 나타낸다."
 *                 is_read:
 *                   type: boolean
 *                   example: "boolean, 메시지의 읽음 여부를 표시한다( 1 : 읽음, 0 : 읽지 않음)."
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
 *   post:
 *     description: 채팅 메시지를 전송합니다.
 *     tags: [Chat]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       required: true
 *       name: user_uuid
 *       type: string
 *       description: 채팅 메시지를 전송할 상대방의 uuid
 *       example: 123213
 *     responses:
 *       "201":
 *         description: "채팅 메시지를 전송하는데 성공했습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "successful"
 *       "400":
 *           description: "중복된 닉네임입니다."
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: "중복된 닉네임입니다."
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
 *   delete:
 *     description: 채팅 메시지를 삭제합니다.
 *     tags: [Chat]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: path
 *       required: true
 *       name: chat_id
 *       type: string
 *       description: 삭제할 메시지의 ID
 *       example: 123213
 *     responses:
 *       "200":
 *         description: "채팅 메시지를 삭제하는데 성공했습니다."
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
 */

router.get('/', controller.get);
//router.post('/login', controller.login);


module.exports = router;
