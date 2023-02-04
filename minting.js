const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// EOA data
const address = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const polygonTestNetRpcURL = process.env.POLYGON_TEST;

const Web3 = require("web3");
const web3 = new Web3(polygonTestNetRpcURL);

const nftMetaData =
  "https://gateway.pinata.cloud/ipfs/QmdSyMBmf5SaFxAsUuxCuwvL3iaW5SUXFKUPnZ7N5itG9p?_gl=1*19vjp7z*_ga*MTUzMTA0MTQzNC4xNjczNjE1Njcz*_ga_5RMPXG14TE*MTY3NTQ4NDM1Mi4yLjEuMTY3NTQ4NDM4NC4yOC4wLjA";

// Contract data
const {
  InNFTCA,
  InNFTABI,
  InProxyCA,
  InProxyABI,
} = require("./data/getAbiData");
const InNftContract = new web3.eth.Contract(InNFTABI, InProxyCA).methods;

const minting = async (tokenURI) => {
  const mint = InNftContract.mintNFT(address, tokenURI).encodeABI();

  const SendTransactionForValue = async (data, to) => {
    await web3.eth.accounts
      .signTransaction(
        {
          from: address,
          to: to,
          gas: 5000000,
          value: "0x0",
          data: data,
        },
        privateKey
      )
      .then(async (Tx) => {
        await web3.eth
          .sendSignedTransaction(Tx.rawTransaction)
          .then((hash, err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("success For Value");
            }
          });
      });
  };

  await SendTransactionForValue(mint, InProxyCA);

  return "Success minting!";
};

minting(nftMetaData);
