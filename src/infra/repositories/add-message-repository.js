const RedisHelper = require('../helpers/redis-helper')

module.exports = class AddMessageRepository {
  async add (room, message) {
    await RedisHelper.addMessage(`messages:${room}`, message)
  }
}

