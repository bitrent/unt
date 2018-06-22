var UNTBPricingStrategy = artifacts.require("./UNTBPricingStrategy.sol");

module.exports = function(deployer) {
  deployer.deploy(UNTBPricingStrategy);
};