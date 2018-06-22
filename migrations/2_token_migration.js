var UNTBToken = artifacts.require("./UNTBToken.sol");

module.exports = function(deployer) {
  deployer.deploy(UNTBToken);
};
