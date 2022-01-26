require("dotenv").config();

const express = require('express')
const cors = require('cors');
const PORT = 443
const fs = require('fs');
const https = require('https');
const cookieParser = require("cookie-parser")
const indexRouter = require('./routes/');
const socket = require('./controllers/socket');



//서버 메시지 로깅
const morgan = require('morgan')
const log = require('./controllers/logger.js')
const path = require('path')


const app = express()
// 위와 같이 express와 app을 변수로 사용한다.


//1212
const ipfilter = require('express-ipfilter').IpFilter;
const IpDeniedError = require('express-ipfilter').IpDeniedError;

// 차단, 허용할 특정 아이피 목록
const whiteList = ['192.168.0.10', '192.168.0.11', '::ffff:127.0.0.1', '106.101.192.224'];

// 범위 사용 예시
// 192.168.0.10 ~ 192.168.0.20 안의 범위와 192.168.0.100 차단 or 허용, 
// var ips = [['192.168.0.10', '192.168.0.20'], '192.168.0.100'];

// ips 목록의 ip들만 허용
app.use('/log' ,ipfilter(whiteList, {mode: 'allow'}));

// ips 목록의 ip들 차단
// app.use(ipfilter(ips));



// 로거 생성
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
const serverlog = morgan('combined', { stream: accessLogStream });

// 로그 파일 폴더가 없을 경우 생성
const mklogdir = (dir) => {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}
try {
  fs.unlink('/root/.pm2/logs/app-out.log')
  fs.unlink('/root/.pm2/logs/app-error.log')
  fs.writeFile('/root/.pm2/logs/app-out.log')
  fs.writeFile('/root/.pm2/logs/app-error.log')
  console.log('이전 로그 삭제 완료')
} catch (err) {
  console.log('로그 초기화 실패')
}

mklogdir('logs')


app.use(serverlog);

let corsOptions = {
  origin: ['https://localhost:3000', 'https://local.cokkirimarket.xyz:3000',
    'http://localhost:3000', 'https://cokkirimarket.xyz'], 
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

if (fs.existsSync('./cokkirimarket.key.pem') && fs.existsSync('./cokkirimarket.crt.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/cokkirimarket.key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cokkirimarket.crt.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log(`https server runnning on port ${PORT}`));
} else {
  server = app.listen(PORT, () => console.log(`http server runnning on port ${PORT}`));
}

// socket io server
const io = require('socket.io')(server, {
  cors: {
    origin: ['https://localhost:3000', 'https://local.cokkirimarket.xyz:3000',
    'http://localhost:3000', 'https://cokkirimarket.xyz', 'http://localhost'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});
socket(io)

log(io)

module.exports = server;
