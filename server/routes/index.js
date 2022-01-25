const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const postRouter = require('./post')
const chatRouter = require('./chat')
const imageRouter = require('./image')
const oauthRouter = require('./oauth')
const searchRouter = require('./search')
const socketRouter = require('./socket')

const fs = require('fs')
const path = require('path')

const swaggerUi = require('swagger-ui-express')
const swaggerRouter = require('./swagger')

const swaggerPageOptions = {
  //customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "CoKkiri Market API 문서",
  //customfavIcon: ""
};

/* 라우팅 */
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/chat', chatRouter);
router.use('/image', imageRouter);
router.use('/oauth', oauthRouter);
router.use('/search',searchRouter);
router.use('/socket', socketRouter)
router.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerRouter, swaggerPageOptions));


router.get('/public/*', async (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  fs.access(path.join(__dirname, req.path), fs.constants.R_OK, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('파일 전송', path.join(__dirname, req.path))
    return res.status(200).sendFile(path.join(__dirname, req.path))
  })
})

router.use(express.static(path.join(__dirname, "../build")));


router.get('/log', (req, res) => {
  res.redirect('https://api.cokkirimarket.xyz/log/index.html')
})

router.get('/log/*', async (req, res) => {
  fs.access(path.join(__dirname, '../', req.path), fs.constants.R_OK, (err) => {
    if (err) {
      console.log(err)
    }
    res.status(200).sendFile(path.join(__dirname, '../', req.path))
  })
})

router.get('/', function (req, res, next) {
  res.send('Hello CokkiriMarket');
});

module.exports = router;