const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }
  isAlive() {
    return this.client.connected;
  }
  async get(key) {
    const getAsnc = promisify(this.client.get).bind(this.client);
    const value = await getAsnc(key);
    return value;
  }
  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }
  async del(key) {
    await this.client.del(key);
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
