const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const hre = require("hardhat");

const { ADDRESS, PRIVATE_KEY, POLYGON_TEST } = process.env;
const { InNFTCA, InNFTABI } = require("../data/getAbiData");

const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmdSyMBmf5SaFxAsUuxCuwvL3iaW5SUXFKUPnZ7N5itG9p?_gl=1*19vjp7z*_ga*MTUzMTA0MTQzNC4xNjczNjE1Njcz*_ga_5RMPXG14TE*MTY3NTQ4NDM1Mi4yLjEuMTY3NTQ4NDM4NC4yOC4wLjA";

const minting = async () => {
  const provider = new hre.ethers.providers.JsonRpcProvider(POLYGON_TEST);
  const inNftContract = new hre.ethers.Contract(InNFTCA, InNFTABI, provider);
  const safeMint = await inNftContract.safeMint(ADDRESS, tokenUri);
  console.log(safeMint);
};

minting();
