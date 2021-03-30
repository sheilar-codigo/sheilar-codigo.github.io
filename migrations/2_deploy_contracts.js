var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale");
var MyKycContract = artifacts.require("KycContract");

require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();

  console.log("addr[0]: " + addr[0])
  // 2. mintable tokens 
  await deployer.deploy(MyToken);
  await deployer.deploy(MyKycContract);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, MyKycContract.address);

  let token = await MyToken.deployed();
  token.addMinter(MyTokenSale.address);
  token.renounceMinter();

  // 1.
  let kyc = await MyKycContract.deployed();
  await kyc.setKycCompleted(addr[0]);
  console.log("set kyc success")
};
