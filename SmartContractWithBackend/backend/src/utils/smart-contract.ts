const { ethers } = require("hardhat");

class SmartContractHelper {
  token: any;
  static token: any;
  static provider: any;

  private constructor(token: any) {
    this.token = token;
  }

  static async createSmartContractHelper() {
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.deploymentTransaction()?.wait();
    return new SmartContractHelper(token);
  }

  getProvider() {
    return ethers.provider;
  }

  async vidateAddress(address:string) {
    try {
      const code = await this.getProvider().getCode(address);
      return code;
    } catch (error) {
      throw new Error('Invalid Address')
    }
  }

  async getOwnerInfo() {
    const [owner] = await ethers.getSigners();
    const address = await owner.getAddress();
    const balance = await this.token.balanceOf(address);
    console.log("balance", balance);
    return {
      address,
      gasLimit: owner._gasLimit,
      balance: ethers.formatEther(ethers.parseUnits(String(balance), 18)),
    };
  }

  async mint(address: string, amount: string) {
    return await this.token.mint(address, ethers.parseUnits(amount, 18));
  }

  async tranfer(address: string, amount: string) {
    try {
      return await this.token.transfer(address, ethers.parseUnits(amount, 18));
    } catch (error) {
      console.log("error", error);
      throw new Error('Not enough funds')
    }
  }

  async getBalance(address: string) {
    const balance = await this.token.balanceOf(address);
    return balance;
  }

  async getTransaction() {
    const provider = this.getProvider();

    //get current block
    const latestBlockNumber = await provider.getBlockNumber();

    //get block data
    const latestBlock = await provider.getBlock(latestBlockNumber);

    //return transaction not greater than 10
    const rowCount = Math.min(10, latestBlock.transactions.length);

    //parse data, get transaction details and reciept details
    if (latestBlock.transactions.length > 0) {
      const sliceTransactions = latestBlock.transactions.slice(0, rowCount);
      const result = [];
      for (let i = 0; i < sliceTransactions.length; i++) {
        const data = await this.getTransactionDetails(sliceTransactions[i]);
        result.push({ ...data, date: latestBlock.timestamp });
      }
      return result;
    }
    return null;
  }

  async getTransactionDetails(txHash: string) {
    const provider = this.getProvider();
    const tx = await provider.getTransaction(txHash);
    const receipt = await provider.getTransactionReceipt(txHash);
    return {
      from: tx.from,
      to: tx.to,
      value: ethers.formatEther(tx.value),
      gasUsed: receipt.gasUsed.toString(),
      receiptLogs: receipt.logs,
    };
  }
}

export default SmartContractHelper;