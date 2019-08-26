import redis from 'redis';
export const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('redis error: ', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});