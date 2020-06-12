var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log('Connection created : ')
    setInterval(function () {
        socket.emit('add', {});
    }, 1000)
});
server.listen(3000);

