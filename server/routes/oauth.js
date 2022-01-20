const express = require('express');
const router = express.Router();
const controller = require('../controllers/oauth')

router.post('/oauthgithub', controller.oauthgithub);
router.post('/oauthgoogle', controller.oauthgoogle);
router.post('/oauthkakao', controller.oauthkakao);

module.exports = router;