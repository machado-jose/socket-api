
const RedisHelper = require('./../infra/helpers/redis-helper')
const env = require('./config/env')
const app = require('./config/app')
const server = require('./config/server')(app)
const io = require('./socket/io')(server)
const { joinRoom, addMessage } = require("./socket/events")(io)

const onConnections = (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("join room", joinRoom);
  socket.on("chat message", addMessage);
}

RedisHelper.connect(env.redisPort)
  .then(() => {
    io.on("connection", onConnections)
    server.listen(env.serverPort, () => console.log(`Server running at http://localhost:${env.serverPort}`))
  })
  .catch(console.error)

