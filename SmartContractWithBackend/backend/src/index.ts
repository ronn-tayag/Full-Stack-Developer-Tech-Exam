import express, { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import ethereumRouter from "./controller/ethereum/router";
import { HttpException } from "./utils";
import bodyParser from "body-parser";
import SmartContracteHelper from "./utils/smart-contract";
var cors = require("cors");

config({ path: `.env` });

const app: Express = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const initSmartContract = async () => {
  const helper:SmartContracteHelper = await SmartContracteHelper.createSmartContractHelper();
  app.set("smartContract", helper);
};

initSmartContract();

app.use("/", ethereumRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.status).json({
      message: err.message,
    });
  }
});

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
