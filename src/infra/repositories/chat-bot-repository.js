const RedisHelper = require('../helpers/redis-helper')

module.exports = class ChatBotRepository {
  // See https://platform.openai.com/docs/guides/chat/introduction
  async addSystemMessage(room) {
    const message = {
      "role": "system", 
      "content": "Você é um assistente prestativo."
    }
    await RedisHelper.addMessage(`chat-bot-messages:${room}`, JSON.stringify(message))
    return message
  }

  async addQuestion (room, question) {
    const message = {
      "role": "user", 
      "content": question
    }
    await RedisHelper.addMessage(`chat-bot-messages:${room}`, JSON.stringify(message))
    return message
  }

  async addAnswer (room, answer) {
    const message = {
      "role": "assistant", 
      "content": answer
    }
    await RedisHelper.addMessage(`chat-bot-messages:${room}`, JSON.stringify(message))
  }

  async getRoomChatBotMessages (room) {
    const messages = await RedisHelper.getRoomMessages(`chat-bot-messages:${room}`)
    return messages.map(message => JSON.parse(message))
  }
}

