const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const HOST = 8080;

app.get('/', (req, res) => {
  res.send('Socket server on !');
})

io.sockets.on('connection', (socket, pseudo) => {
  console.log('new client connected');
  socket.on('new_member', (pseudo) => {
    socket.pseudo = pseudo;
    socket.broadcast.emit('new_member', socket.pseudo);
  });
  socket.on('content', (content) => {
    let data = {
      pseudo: socket.pseudo,
      content: content
    };
    socket.broadcast.emit('content', data);
  });
});

server.listen(HOST);
