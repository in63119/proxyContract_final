// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { makeInNFTData } = require("../data/makeData");

async function main() {
  const InProxyNFT = await hre.ethers.getContractFactory("InProxyNFT");

  const INFT = await upgrades.deployProxy(InProxyNFT, { kind: "uups" });

  const proxyCA = INFT.address;

  console.log("Proxy Contract is deployed. address : ", proxyCA);
  makeInNFTData(proxyCA);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
