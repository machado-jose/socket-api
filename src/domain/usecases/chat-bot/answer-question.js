const openai = require('openai')
const env = require('./../../../main/config/env')

const configuration = new openai.Configuration({
  apiKey: env.openApiKey
})

const openapi = new openai.OpenAIApi(configuration)

module.exports = class AddChatBotAnswer {
  constructor (chatBotRepository, io) {
    this.chatBotRepository = chatBotRepository
    this.io = io
  }

  async answerQuestion (question, room) {
    if (!configuration.apiKey) {
      return false
    }
    try {
      const formattedQuestion = question.trim()

      this.io.to(room).emit('chat bot message', formattedQuestion)

      let messages = await this.chatBotRepository.getRoomChatBotMessages(room)

      if(messages.length == 0){
        messages.push(await this.chatBotRepository.addSystemMessage(room))
      }

      messages.push(await this.chatBotRepository.addQuestion(room, formattedQuestion))

      const completion = await openapi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });

      const message = completion.data.choices[0].message.content
      await this.chatBotRepository.addAnswer(room, message)
      this.io.to(room).emit('chat bot message', message)

    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data)
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`)
        console.log(error)
      }
    }
  }
}

