import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Wallet from "./Wallet";
import Transaction from "./Transaction";
import { TransactionInterface } from "../interface";

function Ethereum() {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transactions, setTransactions] = useState<Array<TransactionInterface>>(
    []
  );

  const getTransactions = async (
    provider: ethers.BrowserProvider,
    address: string
  ): Promise<Array<any>> => {
    const transaction = [];
    const eth_getTransactionCount = await provider?.send(
      "eth_getTransactionCount",
      [address, "latest"]
    );
    const allowedCount = Math.min(10, eth_getTransactionCount);
    if (allowedCount > 0) {
      const eth_getBlockByNumber = await provider.send("eth_getBlockByNumber", [
        "pending",
        false,
      ]);
      const rawTransaction = eth_getBlockByNumber.transactions;
      const sliceTransactions = rawTransaction?.slice(0, 10);
      for (let i = 0; i < allowedCount - 1; i++) {
        const transactionDetail = await provider?.send(
          "eth_getTransactionByHash",
          [sliceTransactions[i]]
        );
        transaction.push(transactionDetail);
      }
    }
    return transaction;
  };

  const connectWallet = async () => {
    try {
      const _window: (Window & typeof globalThis) | any = window;
      if (_window.ethereum) {

        const provider = new ethers.BrowserProvider(_window.ethereum);

        // const provider = new ethers.InfuraProvider(
        //   "homestead",
        //   "9d5084c4664842168e95c49c6a77c01a"
        // );

        const signer = await provider?.getSigner();
        const rawAddress = await signer?.getAddress();
        setAddress(rawAddress);

        const rawBalance = await provider?.getBalance(rawAddress);
        setBalance(ethers.formatEther(rawBalance ?? 0)); 

        const transaction = await getTransactions(provider, rawAddress);
        console.log("transaction", transaction);
        setTransactions(transaction);

        setConnected(true);
        setHasError(false);
      } else {
        setErrorMessage("No Wallet connected to this account!");
        setConnected(false);
        setHasError(true);
      }
    } catch (error: any) {
      setErrorMessage(error.toString());
      setConnected(false);
      setHasError(true);
    }
  };

  return (
    <Box className="ethereum-component">
      {hasError && (
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      )}

      <Container>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ textAlign: "center", color: "white" }} variant="h4">
            Ethereum Wallet
          </Typography>
        </Box>

        {!hasError && (
          <Box>
            {isConnected ? (
              <Wallet balance={balance} address={address} />
            ) : (
              <Box justifyContent={"center"} sx={{ display: "flex" }}>
                <Button onClick={connectWallet} variant="contained">
                  Connect To Wallet
                </Button>
              </Box>
            )}
            <>{isConnected && <Transaction transactions={transactions} />}</>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Ethereum;
