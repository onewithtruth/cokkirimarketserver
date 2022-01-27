const express = require('express');
const router = express.Router();
const controller = require('../controllers/image')


/* GET links listing. */

/**
 * @swagger
 * 
 * /image/geturl:
 *   post:
 *     description: CloudFlare R2 Storage Service 에 Direct Creator Upload 를 실행할  one-time upload URL endpoint를 받아옵니다.
 *     tags: [CloudFlare R2 Storage Service Usage]
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
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: "string"
 *                       example: "2cdc28f0-017a-49c4-9ed7-87056c839c2"
 *                     uploadURL:
 *                       type: "string"
 *                       example: "https://upload.imagedelivery.net/2cdc28f0-017a-49c4-9ed7-87056c839c2"
 *                 result_info:
 *                   type: object
 *                   example: null
 *                 success:
 *                   type: boolean
 *                   example: true                 
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


router.get('/getimages', controller.getimages);
router.post('/geturl', controller.geturl);

module.exports = router;