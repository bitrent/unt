var UNTBMultisigWallet = artifacts.require("./UNTMultisigWallet.sol");

// Production admin accounts
admin1 = "0x00b437E907f61AE8a33Fb35F3Df50D55DB3d3E16";
admin2 = "0x00d6691EdedC7fB987e8296bBC9632D180d07f46";
admin3 = "0xDe7fe62C19978B9B88C928AE8E14c074515816cd";

requirements = 3;

module.exports = function (deployer) {
  deployer.deploy(UNTBMultisigWallet, [admin1, admin2, admin3], requirements);
};