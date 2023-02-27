const redis = require("redis");

module.exports = {
  async connect (port) {
    this.port = port
    this.client = redis.createClient(this.port)
    await this.client.PING().then(
      async () => {}, 
      async () => {
        this.client.on('error', (err) => console.log('Redis Client Error', err))
        await this.client.connect()
      }
    );
  },

  async disconnect () {
    await this.client.quit()
    this.client = null
  },

  async addMessage (room, message) {
    if (!this.client || !this.client.ping()) {
      await this.client.connect()
    }
    console.log(`messages:${room}`)
    const savedMessage = await this.client.rPush(`messages:${room}`, message);
    return savedMessage
  },

  async getRoomMessages(room) {
    const messages = await this.client.lRange(`messages:${room}`, 0, -1)
    return messages
  }
}

