import { Request, Response, NextFunction } from "express";
import { getGasPrice, getBlock, getBalance } from "../../module/ethereum";
import { HttpException } from "../../utils";
import RedisHelper from "../../utils/redisHelper";
import { PrismaClient } from "@prisma/client";
const { ethers } = require("hardhat");

const redis = new RedisHelper();

const upsertAddress = async (address: string, balance: string) => {
  try {
    const prisma = new PrismaClient();
    //check address and balance exist
    const result = await prisma.address.findUnique({
      where: {
        name: address,
        balance,
      },
    });
    //create if address and balance not exist
    if (result == null) {
      await prisma.address.create({
        data: {
          name: address,
          balance,
        },
      });
    }
  } catch (error) {
    return null;
  }
};

export const getEthereumInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address } = req.params;

    if (!req.params?.address) {
      throw new HttpException(400, "address is required");
    }

    if (!redis.isReady) await redis.initialize();

    const gasPrice = await getGasPrice();
    const blockNumber = await getBlock();
    const balance = await getBalance(address);

    //check if address and balance exist
    await upsertAddress(address, "1.0");

    //save to redis cache
    await redis.setWithDelay(
      address,
      JSON.stringify({
        gasPrice,
        blockNumber,
        balance,
      }),
      1 * 60 // 1 Min
    );

    res.json({
      gasPrice,
      blockNumber,
      balance,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getWalletInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.app.get("smartContract");
    const info = await token.getOwnerInfo();
    res.json(info);
  } catch (error) {
    next(new HttpException(400, "Invalid data"));
  }
};

export const transferFund = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = req.body.address;
  const amount = req.body.amount;

  try {
    if (address && amount && !isNaN(amount)) {
      const token = req.app.get("smartContract");
      await token.tranfer(address, amount);
      const balance = await token.getBalance(address);
      res.json({
        balance: ethers.formatEther(ethers.parseUnits(String(balance), 18)),
      });
    } else {
      next(new HttpException(400, "Invalid data"));
    }
  } catch (error:any) {
    next(new HttpException(400, error.message))
  }

  
};

export const mint = async (req: Request, res: Response, next: NextFunction) => {
  const address = req.body.address;
  const amount = req.body.amount;

  try {
    if (!isNaN(amount) && address) {
    const token = req.app.get("smartContract");
      await token.vidateAddress(address);
      await token.mint(address, amount);
      const balance = await token.getBalance(address);
      res.json({
        address,
        balance: ethers.formatEther(ethers.parseUnits(String(balance), 18))
      });
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    next(new HttpException(400, "Invalid Data"));
  }
};

export const transaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.app.get("smartContract");
    const result = await token.getTransaction();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
