const express = require('express');
const router = express.Router();
const controller = require('../controllers/socketController')

router.post('/chatroom', controller.chatroom);
router.get('/chatroomlist', controller.chatroomlist);

module.exports = router;