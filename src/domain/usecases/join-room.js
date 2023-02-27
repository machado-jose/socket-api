module.exports = class JoinRoom {
  constructor (joinRoomRepository, socket) {
    this.joinRoomRepository = joinRoomRepository
    this.socket = socket
  }

  async join (room) {
    this.socket.join(room);
    const messages = await this.joinRoomRepository.getRoomMessages(room)
    messages.forEach((message) => {
      this.socket.emit('chat message', message);
    });
  }
}

