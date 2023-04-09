const redis = require("redis");

module.exports = {
  async connect (port, enviroment = 'development') {
    this.port = port
    if(enviroment == 'development'){
      this.client = redis.createClient({
        port: this.port,
        db: 0
      })
    }else if(enviroment == 'test'){
      this.client = redis.createClient({
        port: this.port,
        db: 1
      })
    }
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

  async addMessage (tag, message) {
    if (!this.client || !this.client.ping()) {
      await this.client.connect()
    }
    await this.client.rPush(tag, message);
  },

  async getRoomMessages(tag) {
    const messages = await this.client.lRange(tag, 0, -1)
    return messages
  },

  async getRoomLastMessage(tag) {
    const message = await this.client.lIndex(tag, -1)
    return message
  }
}

