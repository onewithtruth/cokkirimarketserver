require("dotenv").config();

const express = require('express')
const cors = require('cors');
const PORT = process.env.SERVER_PORT
const fs = require('fs');
const https = require('https');
const indexRouter = require('./routes/');

const app = express()
// 위와 같이 express와 app을 변수로 사용한다.

let corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type'],
    credentials: true
}

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.set('etag', false)

let server;

try {
  https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + process.env.SSL_KEY, 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + process.env.SSL_CERT, 'utf-8'),
      },
      app
    )
    .listen(PORT);
    console.log(`${process.env.NODE_ENV} 환경에서 서버가 ${PORT} 번 포트에서 실행되었습니다.`)
} catch (error) {
  console.log(error)
}

module.exports = server;