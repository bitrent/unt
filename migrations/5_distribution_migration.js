var UNTBMultisigWallet = artifacts.require("./UNTMultisigWallet.sol");
var UNTBPricingStrategy = artifacts.require("./UNTPricingStrategy.sol");
var UNTBToken = artifacts.require("./UNTToken.sol");
var UNTBTokenDistribution = artifacts.require("./UNTTokenDistribution.sol");
var web3 = UNTBTokenDistribution.web3;

var mainnet_token = "0x2fc04ac9f9ff178902b171e71e4aa95dd818f11a";
var mainnet_ps = "0xfd3f420e8224f1383d280dd44416aee778715a74";
var mainnet_wallet = "0x5a56ee15096bd7a57ad458e4637b117260f5fdbe";

module.exports = function(deployer) {
  deployer.deploy(UNTBTokenDistribution,
      mainnet_token, //token
      mainnet_ps, //pricing strategy
      mainnet_wallet, //multisig wallet
      web3.toBigNumber("18233719405594000000000"),
      web3.toBigNumber("1530489599"));
};