const RedisHelper = require('../helpers/redis-helper')

module.exports = class AddMessageRepository {
  async add (room, message) {
    const savedMessage = await RedisHelper.addMessage(room, message)
    return savedMessage
  }
}

