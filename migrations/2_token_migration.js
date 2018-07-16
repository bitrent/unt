var UNTBToken = artifacts.require("./UNTToken.sol");

module.exports = function(deployer) {
  deployer.deploy(UNTBToken);
};
