require("dotenv").config();

const express = require('express')
const cors = require('cors');
const PORT = 443;
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

// try {
//   https
//     .createServer(
//       {
//         key: fs.readFileSync(__dirname + '/cokkirimarket.key.pem', 'utf8'),
//         cert: fs.readFileSync(__dirname + '/cokkirimarket.crt.pem', 'utf8'),
//       },
//       app
//     )
//     .listen(PORT);
//     console.log(`서버가 ${PORT} 번 포트에서 실행되었습니다..`)
// } catch (error) {
//   console.log(error)
// }

if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log(`https server runnning on port ${PORT}`));
} else {
  server = app.listen(PORT, () => console.log(`http server runnning on port ${PORT}`));
}

module.exports = server;