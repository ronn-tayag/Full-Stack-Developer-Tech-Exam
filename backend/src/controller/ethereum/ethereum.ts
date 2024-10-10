import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { validateOrReject } from "class-validator";
import { plainToClass, instanceToPlain } from "class-transformer";

import { getGasPrice, getBlock, getBalance } from "../../module/ethereum";
import { HttpException } from "../../utils";
import RedisHelper from "../../utils/redisHelper";

const redis = new RedisHelper();


export const getEthereumInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!req.body?.address) {
      throw new HttpException(400, "address is required");
    }

    if(!redis.isReady)
      await redis.initialize()

    
    const response = await redis.get('getEthereumInfo')
    if (response) {
      console.log('delay is showing ---->>')
      res.json(JSON.parse(response));
    } else {

      console.log("new is showing ---->>");
      
      const gasPrice = await getGasPrice();
      const blockNumber = await getBlock();
      const balance = await getBalance(req.body.address);

      await redis.setWithDelay(
        "getEthereumInfo",
        JSON.stringify({
          gasPrice,
          blockNumber,
          balance,
        }),
        15
      );

      res.json({
        gasPrice,
        blockNumber,
        balance,
      });
    }

  } catch (error: any) {
    next(error);
  }
};
