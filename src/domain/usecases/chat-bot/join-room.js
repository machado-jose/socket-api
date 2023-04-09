module.exports = class JoinChatBotRoom {
  constructor (chatBotRepository, socket) {
    this.chatBotRepository = chatBotRepository
    this.socket = socket
  }

  async join (room) {
    this.socket.join(room);
    const messages = await this.chatBotRepository.getRoomChatBotMessages(room)
    messages.filter(message => message.role != 'system').forEach((message) => {
      this.socket.emit('chat bot message', `${message.role}: ${message.content}`)
    });
  }
}

