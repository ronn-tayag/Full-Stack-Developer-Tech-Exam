const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.deploymentTransaction()?.wait();

  const tokenReceiver = "0x513E2B7E22847cD0A0fA1ef160307C804619e3fB";
  const ownerAddress = await owner.getAddress();
  const tokenAddress = await token.getAddress();

  console.log("Token deployed to:", tokenAddress);
  console.log(
    "Owner address:",
    ownerAddress,
    await token.balanceOf(ownerAddress)
  );
    
 let initOwnerBalance = await token.balanceOf(ownerAddress);
 console.log("initOwnerBalance", initOwnerBalance);

  // Mint 1000 tokens to the owner
  await token.mint(ownerAddress, ethers.parseUnits("1000", 18));
  console.log("Minted 1000 tokens to owner");

  // Transfer 100 tokens from owner to user1
  let amoutToBeTransfer = ethers.parseUnits("100", 18);
  await token.transfer(tokenReceiver, amoutToBeTransfer);
  console.log("Transferred 100 tokens from owner to tokenReceiver");

  let ownerBalance = await token.balanceOf(ownerAddress);
  let user1Balance = await token.balanceOf(tokenReceiver);

  console.log("Owner balance:", ethers.formatUnits(ownerBalance, 18));
  console.log("User1 balance:", ethers.formatUnits(user1Balance, 18));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
