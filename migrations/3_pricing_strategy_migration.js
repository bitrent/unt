var UNTBPricingStrategy = artifacts.require("./UNTPricingStrategy.sol");

module.exports = function(deployer) {
  deployer.deploy(UNTBPricingStrategy);
};