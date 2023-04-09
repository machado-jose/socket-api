const AddMessage = require("./../../domain/usecases/add-message")
const JoinRoom = require("./../../domain/usecases/join-room")
const AddChatBotAnswer = require("./../../domain/usecases/chat-bot/answer-question")
const JoinChatBotRoom = require("./../../domain/usecases/chat-bot/join-room")

const AddMessageRepository = require("./../../infra/repositories/add-message-repository")
const JoinRoomRepository = require("./../../infra/repositories/join-room-repository")
const ChatBotRepository = require("./../../infra/repositories/chat-bot-repository")

module.exports = (io) => {
  const addMessage = function (message, room) {
    const addMessage = new AddMessage(new AddMessageRepository, io)
    addMessage.add(message, room)
  }

  const joinRoom = function(room) {
    const joinRoom = new JoinRoom(new JoinRoomRepository, this)
    joinRoom.join(room)
  }

  const addChatBotAnswer = function(question, room) {
    const chatBot = new AddChatBotAnswer(new ChatBotRepository, io)
    chatBot.answerQuestion(question, room)
  }

  const joinChatBotRoom = function(room) {
    const chatBot = new JoinChatBotRoom(new ChatBotRepository, this)
    chatBot.join(room)
  }

  return {
    addMessage,
    joinRoom,
    addChatBotAnswer,
    joinChatBotRoom
  }
}
