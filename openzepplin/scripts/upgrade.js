const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { ADDRESS, PRIVATE_KEY, POLYGON_TEST } = process.env;

const { upgrades, ethers } = require("hardhat");
const { makeInNFTData } = require("../data/makeData");
const { InNFTCA, InNFTABI } = require("../data/getAbiData");

async function upgrade() {
  console.log(" ");
  console.log("Contract를 업그레이드 합니다.");
  console.log("------------------------");
  console.log(" ");

  const InNFTv2 = await ethers.getContractFactory("InProxyNFTv2");
  const InNFTv2Contract = await InNFTv2.deploy();
  await InNFTv2Contract.deployed();

  //   await InNFTv2Contract.deployTransaction.wait();

  const upgradedInNFTv2 = await upgrades.upgradeProxy(InNFTCA, InNFTv2Contract);

  const proxyCA = upgradedInNFTv2.address;

  console.log(" ");
  console.log("------------------------");
  console.log("업그레이드를 완료하였습니다.");
  console.log("Proxy Contract is deployed. address : ", proxyCA);
  console.log(" ");
}

upgrade();
