import express, { Request, Response, NextFunction } from "express";

import { getEthereumInfo } from './ethereum'

const router = express.Router();

router.post("/info", getEthereumInfo);

export default router;