const fs = require('fs');
const path = require('path')


module.exports = function log(io) {
    io.on("connection", (socket) => {

        socket.on("server_log", () => {
          console.log("서버로그")
          fs.readFile(path.join(__dirname, '../logs/access.log'), function(err, data) {
            if(err) throw err;
            const array = data.toString().split("\n");
            const payload = array.slice(array.length-100)
            for(i in payload) {
              socket.emit('server_msg',{name: 'express', message: payload[i]});
                //console.log(array[i]);
            }
          });
        })
        
        socket.on("pm2_log_general", () => {
          fs.readFile('/root/.pm2/logs/app-out.log', function(err, data) {
            if(err) throw err;
            const array = data.toString().split("\n")
            const payload = array.slice(array.length-100)
            for(i in payload) {
              socket.emit('server_msg',{name: 'console', message: payload[i]});
                //console.log(array[i]);
            }
          });
        })

        socket.on("pm2_log_error", () => {
          fs.readFile('/root/.pm2/logs/app-error.log', function(err, data) {
            if(err) throw err;
            const array = data.toString().split("\n")
            const payload = array.slice(array.length-100)
            for(i in payload) {
              socket.emit('server_msg',{name: 'console-err', message: payload[i]});
                //console.log(array[i]);
            }
          });
        })
    })
}
