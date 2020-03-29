const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const cors = require('cors')
const HOST = 8080
var msgController = require('./routes/messagesController')
var loginController = require('./routes/loginController')
var bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(cors())
app.use('/messages', msgController)
app.use('/connect', loginController)

io.sockets.on('connection', socket => {
  socket.on('join', data => {
    socket.user = data.user
    socket.join(data.room)
    socket.broadcast
      .to(data.room)
      .emit('new-user', { user: data.user, message: 'has joined the room' })
  })
  socket.on('disconnect', () => {
    socket.broadcast
      .to(socket.room)
      .emit('leave-user', { user: socket.user, message: 'has left the room' })
  })
  socket.on('leave', room => {
    socket.broadcast
      .to(room)
      .emit('leave-user', { user: socket.user, message: 'has left the room' })
    socket.leave(room)
  })
  socket.on('message', data => {
    io.in(data.room).emit('receivedMessage', {
      user: socket.user,
      message: data.message
    })
  })
})

server.listen(HOST, function() {
  const all_routes = require('express-list-endpoints')
  console.log(all_routes(app))
})
