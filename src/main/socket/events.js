const AddMessage = require("./../../domain/usecases/add-message")
const JoinRoom = require("./../../domain/usecases/join-room")

const AddMessageRepository = require("./../../infra/repositories/add-message-repository")
const JoinRoomRepository = require("./../../infra/repositories/join-room-repository")

module.exports = (io) => {
  const addMessage = function (message, room) {
    const addMessage = new AddMessage(new AddMessageRepository, io)
    addMessage.add(message, room)
  }

  const joinRoom = function(room) {
    const joinRoom = new JoinRoom(new JoinRoomRepository, this)
    joinRoom.join(room)
  }

  return {
    addMessage,
    joinRoom
  }
}
