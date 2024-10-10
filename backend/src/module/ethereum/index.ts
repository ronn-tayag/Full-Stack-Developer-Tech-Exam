import { postInfuraService } from "../../service";
import { ethers } from 'ethers'

export const getGasPrice =async () => {
  const response:any =await postInfuraService({
    method: "eth_gasPrice",
    params: [],
  });
  return ethers.formatEther(response.data.result);
};

export const getBlock = async () => {
   const response: any = await postInfuraService({
     method: "eth_blockNumber",
     params: [],
   });
  return Number(response.data.result ?? 0);
};


export const getBalance = async(address:string) => {
  const response: any = await postInfuraService({
    method: "eth_getBalance",
    params: [
      address,
      'latest'
    ],
  });
  return ethers.formatEther(response.data.result);
};
