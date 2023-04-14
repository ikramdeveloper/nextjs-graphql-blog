import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URI,
});

const connectRedis = async () => {
  try {
    if (redisClient.isOpen) {
      console.log("redis client already open");
    } else {
      console.log("now in else");
      await redisClient.connect();
    }
  } catch (err: any) {
    console.error(`Error in connecting to redis: ${err.message}`);
  }
};

redisClient.on("connect", () => console.log("connected to redis successfully"));

redisClient.on("error", (err: any) =>
  console.log(`error in redis: ${err.message}`)
);

// connectRedis();

export default connectRedis;
