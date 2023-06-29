test('Redis client can connect to the Redis server', () => {
  const redisClient = new RedisClient();

  expect(redisClient.isAlive()).toBe(true);
});

test('Redis client can set and get a value', () => {
  const redisClient = new RedisClient();
  const key = key;
  const value = value;

  redisClient.set(key, value, duration);

  const retrievedValue = redisClient.get(key);

  expect(retrievedValue).toBe(value);
});

