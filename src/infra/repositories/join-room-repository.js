const RedisHelper = require('../helpers/redis-helper')

module.exports = class JoinRoomRepository {
  async getRoomMessages (room) {
    const messages = await RedisHelper.getRoomMessages(`messages:${room}`)
    return messages
  }
}

