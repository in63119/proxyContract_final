const InProxy = artifacts.require("InProxy");
const InNFT = artifacts.require("InNFT");

const { sha3 } = require("../data/web3-config");

const { makeInNFTData, makeInProxyData } = require("../data/makeData");

// const { InProxyCA } = require("../data/ABI/getAbiData");

module.exports = async function (deployer, network) {
  if (network === "polygonTestProxy") {
    console.log(" ");
    console.log("------------- Logic Contract를 배포합니다. --------------");
    console.log(" ");

    await deployer.deploy(InNFT);
    const InNFTContract = await InNFT.deployed();

    console.log(" ");
    console.log("------------- Proxy Contract를 배포합니다. --------------");
    console.log(" ");
    await deployer.deploy(InProxy, sha3, InNFTContract.address);
    const InProxyContract = await InProxy.deployed();

    await InNFTContract.setContractAddress(InProxyContract.address);

    console.log(" ");
    console.log("------------- ABI 파일을 만듭니다. --------------");
    console.log(" ");
    makeInProxyData(InProxyContract.address);
    makeInNFTData(InNFTContract.address);

    console.log(" ");
    console.log("------------- 배포가 완료되었습니다. --------------");
  }
};
