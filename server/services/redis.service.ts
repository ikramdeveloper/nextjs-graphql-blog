import connectRedis, { redisClient } from "../utils/connectRedis";
import errorHandler from "../middleware/errorHandler";

const getValue = async (key: string) => {
  try {
    await connectRedis();
    const result = await redisClient.get(key);
    await redisClient.disconnect();
    return result;
  } catch (err) {
    errorHandler(err);
  }
};

const setValue = async (key: string, payload: string, options: object) => {
  try {
    await connectRedis();
    await redisClient.set(key, payload, options);
    await redisClient.disconnect();
  } catch (err) {
    errorHandler(err);
  }
};

const removeValue = async (key: string) => {
  try {
    await connectRedis();
    await redisClient.del(key);
    await redisClient.disconnect();
  } catch (err) {
    errorHandler(err);
  }
};

export { getValue, setValue, removeValue };
