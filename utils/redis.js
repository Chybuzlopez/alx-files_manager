import redis from 'redis';
import { promsify } from 'util';

const client = redis.createClient();
const getAsync = promisify.client.bind(client);

class RedisClient {
  constructor(){
    this.client = client;
  }
}
