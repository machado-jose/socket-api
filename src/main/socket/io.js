const socketio = require('socket.io');

module.exports = server => {
  return socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
}

