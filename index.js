var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(4000,function(){
    console.log('Server is running')
});

//for static files
app.use(express.static('public'));

//for socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection',socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});