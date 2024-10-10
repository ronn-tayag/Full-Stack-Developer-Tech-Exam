import express, { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import ethereumRouter from "./controller/ethereum/router";
import { HttpException } from "./utils";
import bodyParser from "body-parser";

config({ path: `.env` });

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/ethereum", ethereumRouter);

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
