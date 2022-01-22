const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

/* GET links listing. */

/**
 * @swagger
 * 
 * /search:
 *   post:
 *     description: Database 상의 포스트 중에 요청 내용과 일치하는 포스트의 목록을 가져옵니다.
 *     tags: [search]
 *     produces:
 *     - "application/json"
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
 *                     id:
 *                       type: "string"
 *                       example: "5"
 *                     title:
 *                       type: "string"
 *                       example: "맥주 팔아요"
 *                     contents:
 *                       type: "string"
 *                       example: "수입 맥주 네 캔 만원 블랑 기네스 어쩌구 저쩌구 이러쿵 저러쿵 수입 맥주 네 캔 만원 블랑 기네스 어쩌구 저쩌구 이러쿵 저러쿵수입 맥주 네 캔 만원 블랑 기네스 어쩌구 저쩌저러쿵"
 *                     price:
 *                       type: "string"
 *                       example: "100000"
 *                     image_src:
 *                       type: "string"
 *                       example: "https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/0aa66bae-fac6-4d36-4ff8-f091b3ec4900/public"
 *                     user_id:
 *                       type: "number"
 *                       example: 3
 *                     createdAt:
 *                       type: "string"
 *                       example: "2022-01-21T02:55:49.000Z"
 *                     updatedAt:
 *                       type: "string"
 *                       example: "2022-01-21T02:55:49.000Z"
 *                 message:
 *                   type: string
 *                   example: "ok"    
 *
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
 */


router.post('/', searchController.post);
router.get('/', searchController.get);

module.exports = router;