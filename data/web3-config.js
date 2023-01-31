const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { POLYGON_TEST } = process.env;

const Web3 = require("web3");
const web3 = new Web3(POLYGON_TEST);

const sha3 = web3.utils.sha3("init()").substring(0, 10);

module.exports = {
  web3,
  sha3,
};
