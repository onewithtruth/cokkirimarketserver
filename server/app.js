require("dotenv").config();

const express = require('express')
const cors = require('cors');
const PORT = 80
const fs = require('fs');
const https = require('https');
const cookieParser = require("cookie-parser")
const indexRouter = require('./routes/');
const socket = require('./controllers/socket');

const app = express()
// 위와 같이 express와 app을 변수로 사용한다.

let corsOptions = {
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.set('etag', false);

let server;

if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log(`https server runnning on port ${PORT}`));
} else {
  server = app.listen(PORT, () => console.log(`http server runnning on port ${PORT}`));
}

// socket io server
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});
socket(io)

module.exports = server;