const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// EOA data
const address = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const polygonTestNetRpcURL = process.env.POLYGON_TEST;

const Web3 = require("web3");
const web3 = new Web3(polygonTestNetRpcURL);

const setting = async () => {
  // Contract data
  const {
    InNFTCA,
    InNFTABI,
    InProxyCA,
    InProxyABI,
  } = require("./data/getAbiData");
  const InNftContract = new web3.eth.Contract(InNFTABI, InProxyCA).methods;
  const set = InNftContract.setContractAddress(InProxyCA).encodeABI();

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

  await SendTransactionForValue(set, InProxyCA);
};

setting();
