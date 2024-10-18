import { Request, Response, NextFunction } from "express";
import RedisHelper from "../utils/redisHelper";
const redis = new RedisHelper();

export const cacheRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.params;

  //check redis instance
  if (!redis.isReady) await redis.initialize();

  //check if data exist then get data from redis
  const data = await redis.get(address);
  if (data) {
    res.json(JSON.parse(data));
    return;
  }
  //else proceed to api calling
  next();
};
