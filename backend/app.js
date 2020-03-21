const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const HOST = 8080;

app.get('/', (req, res) => {
  res.send('Socket server on !');
})

io.sockets.on('connection', (socket) => {
  socket.on('join', (user) => {
    socket.user = user;
    socket.broadcast.emit('new-user', { user: user, message:'has joined the room'});
  });
  socket.on('leave', () => {
    socket.broadcast.emit('leave-user', { user: socket.user, message:'has left the room'});
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('leave-user', { user: socket.user, message:'has left the room'});
  });
  socket.on('message', (message) => {
    io.emit('receivedMessage', { user: socket.user, message: message });
  });
});


server.listen(HOST);
