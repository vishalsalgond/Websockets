const port = process.env.PORT || 3000;
const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(port,function(){
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