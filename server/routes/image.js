const express = require('express');
const router = express.Router();
const controller = require('../controllers/image')

router.get('/images', controller.images);
router.post('/imagesupload', controller.imagesupload);

module.exports = router;