require('dotenv').config({ path: '.env' })

module.exports = {
  redisPort: process.env.REDIS_PORT || 6379,
  serverPort: process.env.SERVER_PORT || 3000,
  openApiKey: process.env.OPENAI_API_KEY
}

