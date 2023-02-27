module.exports = class AddMessage {
  constructor (addMessageRepository, io) {
    this.addMessageRepository = addMessageRepository
    this.io = io
  }

  async add (message, room) {
    await this.addMessageRepository.add(room, message);
    this.io.to(room).emit('chat message', message);
  }
}

