require("dotenv").config();
const { PRIVATE_KEY, POLYGON_TEST } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    polygonTestProxy: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, POLYGON_TEST),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygonTest: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, POLYGON_TEST),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  contracts_build_directory: "./data/rawABI",

  mocha: {},

  compilers: {
    solc: {
      version: "pragma",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
};
