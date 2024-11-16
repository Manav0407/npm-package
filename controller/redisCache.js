import redis from "redis";

let redisClient;

// Function to initialize Redis connection with custom options
export const initializeRedis = (options = {}) => {
  redisClient = redis.createClient(options);

  redisClient.on("error", (err) => console.error("Redis error:", err));

  return redisClient.connect();
};

export const setCache = async (key, value, ttl = 3600) => {
  if (!redisClient) throw new Error("Redis client not initialized.");

  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error setting cache:", error);
    return false;
  }
};

export const getCache = async (key) => {
  if (!redisClient) throw new Error("Redis client not initialized.");

  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error("Error getting cache:", error);
    return false;
  }
};

export const deleteCache = async (key) => {
  if (!redisClient) throw new Error("Redis client not initialized.");

  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error("Error deleting cache:", error);
    return false;
  }
};
