const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const HOST = 8080;

app.get('/', (req, res) => {
  res.send('Socket server on !');
})

io.sockets.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.room = data.room;
    socket.user = data.user;
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('new-user', { user: data.user, message:'has joined the room'});
  });
  socket.on('disconnect', () => {
    socket.broadcast.to(socket.room).emit('leave-user', { user: socket.user, message:'has left the room'});
    socket.leave(socket.room);
 });
  socket.on('message', (message) => {
    io.in(socket.room).emit('receivedMessage', { user: socket.user, message: message });
  });
});

server.listen(HOST);
