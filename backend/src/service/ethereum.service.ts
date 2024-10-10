import { IEthereumReqBody } from "../interface";
import instance from "./ethereum.api";

export const postInfuraService = (body: IEthereumReqBody) => {
  return instance.post("", {
    ...body,
    jsonrpc: "2.0",
    id: 1,
  });
};
