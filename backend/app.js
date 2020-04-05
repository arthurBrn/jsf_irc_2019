const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const cors = require('cors')
const HOST = 8080
var msgController = require('./routes/messagesController')
var loginController = require('./routes/loginController')
var channelController = require('./routes/channelsController')
var bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(cors())
app.use('/messages', msgController)
app.use('/connect', loginController)
app.use('/channels', channelController)

io.sockets.on('connection', socket => {
  socket.on('join', data => {
    socket.user = data.user
    socket.room = data.room
    socket.join(data.room)
    socket.broadcast
      .to(data.room)
      .emit('new-user', { user: data.user, content: 'has joined the room', display: data.display, channel: data.room })
  })
  socket.on('disconnect', () => {
    socket.broadcast
      .to(socket.room)
      .emit('leave-user', { user: socket.user, content: 'disconnected' })
  })
  socket.on('leave', room => {
    socket.broadcast
      .to(room)
      .emit('leave-user', { user: socket.user, content: 'has left the room' })
    socket.leave(room)
  })
  socket.on('rename', data => {
    socket.broadcast
      .to(data.room)
      .emit('userRenamed', { user: data.oldName, content: 'renamed to ' + data.newName })
  })
  socket.on('message', data => {
    io.in(data.room).emit('receivedMessage', {
      user: socket.user,
      content: data.message,
      channel: data.room
    })
  })
})

server.listen(HOST, function() {
  const all_routes = require('express-list-endpoints')
  console.log(all_routes(app))
})
