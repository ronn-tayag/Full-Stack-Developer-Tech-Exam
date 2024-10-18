import express, { Request, Response, NextFunction } from "express";

import {
  getEthereumInfo,
  getWalletInfo,
  mint,
  transferFund,
  transaction,
} from "./ethereum";
import { cacheRequest } from "../../middleware/cacheRequest";

const router = express.Router();

router.get("/info/:address", cacheRequest, getEthereumInfo);

router.post("/hardhat/mint", mint);

router.post("/hardhat/transfer", transferFund);

router.get("/hardhat/transaction", transaction);

router.get("/hardhat/owner-info/", getWalletInfo);


export default router;