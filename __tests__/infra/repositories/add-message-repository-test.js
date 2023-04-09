const RedisHelper = require('../../../src/infra/helpers/redis-helper')
const AddMessageRepository = require('../../../src/infra/repositories/add-message-repository')


const makeSut = () => {
  return new AddMessageRepository()
}

describe('AddMessage Repository', () => {
  beforeAll(async () => {
    await RedisHelper.connect(6379, 'test')
  })

  afterAll(async () => {
    await RedisHelper.disconnect()
  })

  test('Should return message created', async () => {
    const sut = makeSut()
    await sut.add('room', 'new_message')
    const message = await RedisHelper.getRoomLastMessage('messages:room')
    expect(message).toBe('new_message')
  })
})