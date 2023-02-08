const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { ADDRESS, PRIVATE_KEY, POLYGON_TEST } = process.env;

const Web3 = require("web3");
const web3 = new Web3(POLYGON_TEST);

const { InNFTCA, InNFTABI } = require("../data/getAbiData");
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmNqMaFXSZsss6tMBKcU7BY3mcmv3Ztv8nmM36zSFCqdjr";

const minting = async () => {
  const InNftContract = new web3.eth.Contract(InNFTABI, InNFTCA).methods;
  const mint = InNftContract.safeMint(ADDRESS, tokenUri).encodeABI();

  const SendTransactionForValue = async (data, to) => {
    await web3.eth.accounts
      .signTransaction(
        {
          from: ADDRESS,
          to: to,
          gas: 5000000,
          value: "0x0",
          data: data,
        },
        PRIVATE_KEY
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

  await SendTransactionForValue(mint, InNFTCA);
};

minting();
