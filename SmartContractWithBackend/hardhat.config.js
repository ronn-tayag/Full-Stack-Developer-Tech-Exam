require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  // networks: {
  //   ganache: {
  //     url: "http://127.0.0.1:8545", // Ganache's default RPC URL
  //     accounts: [
  //       "0x7b3b8be7fffcf894c26b4ee2eccbdd6de1953525af31783edd2724e9b68e8791",
  //     ], // replace with one of the private keys from Ganache
  //   },
  // },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Load private key from .env file
    },
  },
};
