const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

require("dotenv").config({path: "./.env"});

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY)
      },
      network_id: 3,
      gas: 3000000,
      gasPrice: 10000000000
    }
    // goerli: {
    //   provider: function() {
    //     return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/b60aa1c24c7647c3968b173eec2fdc9f", AccountIndex)
    //   },
    //   network_id: 5,
    // }
  },
  compilers: {
    solc: {
       	version: "^0.6.0"
    }
  }
};
