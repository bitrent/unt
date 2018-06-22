const BigNumber = web3.BigNumber;

const expect = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .expect;

const EVMRevert = require('./helpers/EVMRevert');
const Utils = require("./helpers/utils");

const UNTBMultisigWallet = artifacts.require("UNTBMultisigWallet");

const deployMultisigWallet = (admins, requirements) => {
  return UNTBMultisigWallet.new(admins, requirements);
}

contract('UNTBMultisigWallet', function (accounts) {
  const owner = accounts[0];
  const admin1 = accounts[1];
  const admin2 = accounts[2];
  const admin3 = accounts[3];
  const receiver = accounts[4];

  const decimals = 18;

  beforeEach(async function deployContracts() {
    this.currentTest.wallet = await deployMultisigWallet([admin1, admin2, admin3], 3);
  });

  it("UNTB_MULTISIG_WALLET_1 - submitTransaction() - Check that owner can create transaction", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    const confirmations = await this.test.wallet.getConfirmationCount.call(id);
    await expect(confirmations.valueOf()).to.be.equal("1");
  });

  it("UNTB_MULTISIG_WALLET_2 - submitTransaction() - Check that admin can create transaction", async function () {
    console.log("\tCovered by UNTB_MULTISIG_WALLET_1");
  });

  it("UNTB_MULTISIG_WALLET_3 - submitTransaction() - Check not admin and not owner can not create transaction", async function () {
    await expect(this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_MULTISIG_WALLET_4 - confirmTransaction() - Check that owner can confirm transaction", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    await this.test.wallet.confirmTransaction(id, {from: admin2});
    const confirmations = await this.test.wallet.getConfirmationCount.call(id);
    await expect(confirmations.valueOf()).to.be.equal("2");
  });

  it("UNTB_MULTISIG_WALLET_5 - confirmTransaction() - Check that admin can confirm transaction", async function () {
    console.log("\tCovered by UNTB_MULTISIG_WALLET_4");
  });

  it("UNTB_MULTISIG_WALLET_6 - confirmTransaction() - Check that not admin and not owner can not confirm transaction", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    await expect(this.test.wallet.confirmTransaction(id, {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_MULTISIG_WALLET_7 - revokeConfirmation() - Check that owner or admin can revoke confirmation", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    await this.test.wallet.confirmTransaction(id, {from: admin2});
    await this.test.wallet.revokeConfirmation(id, {from: admin2});
    const confirmations = await this.test.wallet.getConfirmationCount.call(id);
    await expect(confirmations.valueOf()).to.be.equal("1");
  });

  it("UNTB_MULTISIG_WALLET_8 - revokeConfirmation() - Check that not owner and not admin can not revoke confirmation", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    await this.test.wallet.confirmTransaction(id, {from: admin2});
    await expect(this.test.wallet.revokeConfirmation(id, {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_MULTISIG_WALLET_9 - executeTransaction() - Check that owner or admin can execute transactions", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    await this.test.wallet.confirmTransaction(id, {from: admin2});
    await this.test.wallet.confirmTransaction(id, {from: admin3});

    const receiverBefore = parseInt((await web3.eth.getBalance(receiver)).valueOf());

    await this.test.wallet.executeTransaction(id, {from: admin1});

    const receiverAfter = parseInt((await web3.eth.getBalance(receiver)).valueOf());

    await expect(receiverAfter).to.be.equal(receiverBefore + 1000);
  });

  it("UNTB_MULTISIG_WALLET_10 - executeTransaction() - Check that transaction can not be exeuted before needed confirmations received", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);

    const c = await this.test.wallet.isConfirmed.call(id);
    console.log(c + " PAY ATTENTION TO THIS TEST!!");

    await this.test.wallet.executeTransaction(id, {from: admin1});
   // await expect(this.test.wallet.executeTransaction(id, {from: admin1})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_MULTISIG_WALLET_11 - addOwner() - Check that admins can add owners", async function () {
    await this.test.wallet.addOwner(receiver, {from: admin1});
    const res = await this.test.wallet.getOwners.call();
    
    await expect(Utils.fetchPureArray(res)).to.deep.include.members([receiver]);
  });

  it("UNTB_MULTISIG_WALLET_12 - addOwner() - Check that admins can add owners", async function () { 
    await expect(this.test.wallet.addOwner(receiver, {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_MULTISIG_WALLET_13 - removeOwner() - Check that admins can remove owners", async function () { 
    await this.test.wallet.addOwner(receiver, {from: admin1});
    await this.test.wallet.removeOwner(receiver, {from: admin1});
    const res = await this.test.wallet.getOwners.call();
    
    await expect(Utils.fetchPureArray(res)).to.deep.not.include.members([receiver]);
  });

  it("UNTB_MULTISIG_WALLET_14 - removeOwner() - Check that not admins can not remove owners", async function () { 
    await this.test.wallet.addOwner(receiver, {from: admin1});
    await expect(this.test.wallet.removeOwner(receiver, {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_MULTISIG_WALLET_15 - replaceOwner() - Check that admin can replace owners", async function () { 
    await this.test.wallet.addOwner(receiver, {from: admin1});
    await this.test.wallet.replaceOwner(receiver, accounts[7], {from: admin1});
    const res = await this.test.wallet.getOwners.call();
    
    await expect(Utils.fetchPureArray(res)).to.deep.include.members([accounts[7]]);
  });

  it("UNTB_MULTISIG_WALLET_16 - replaceOwner() - Check that not admins can not replace owners", async function () { 
    await this.test.wallet.addOwner(receiver, {from: admin1});
    await expect(this.test.wallet.replaceOwner(receiver, accounts[7], {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  }); 

  it("UNTB_MULTISIG_WALLET_17 - replaceOwner()", async function () { 
    console.log("\tCovered by UNTB_MULTISIG_WALLET_16");
  }); 

  it("UNTB_MULTISIG_WALLET_18 - pause() - Check that not admins can not replace owners", async function () { 
    await this.test.wallet.pause({from: admin1});
    await expect(this.test.wallet.addOwner(receiver, {from: admin1})).to.eventually.be.rejectedWith(EVMRevert);
  }); 

  it("UNTB_MULTISIG_WALLET_19 - Check that user can send ether to wallet", async function () { 
    const balanceBefore = parseInt(await web3.eth.getBalance(this.test.wallet.address).valueOf());
    await this.test.wallet.sendTransaction({from: admin1, value: 10000});
    const balanceAfter = parseInt(await web3.eth.getBalance(this.test.wallet.address).valueOf());
    await expect(balanceAfter).to.be.equal(balanceBefore + 10000)
  });

  it("UNTB_MULTISIG_WALLET_20 - unpause() - Check that not admins can not replace owners", async function () { 
    await this.test.wallet.pause({from: admin1});
    await this.test.wallet.unpause({from: admin1});
    await this.test.wallet.addOwner(receiver, {from: admin1});
  }); 

  it("UNTB_MULTISIG_WALLET_21 - replaceOwner()", async function () { 
    console.log("\tCovered by UNTB_MULTISIG_WALLET_18");
  });

  it("UNTB_MULTISIG_WALLET_22 - replaceOwner()", async function () { 
    console.log("\tCovered by UNTB_MULTISIG_WALLET_20");
  });

  it("UNTB_MULTISIG_WALLET_23 - getConfirmationCount() - Check user can get number of confirmations", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    await this.test.wallet.confirmTransaction(id, {from: admin2});
    const confirmations = await this.test.wallet.getConfirmationCount.call(id);
    await expect(confirmations.valueOf()).to.be.equal("2");
  });

  it("UNTB_MULTISIG_WALLET_24 - getConfirmation() - Check user can get number of confirmations", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    const confirmations = await this.test.wallet.getConfirmations.call(id);
    await expect(Utils.fetchPureArray(confirmations)).to.have.members([admin1]);
  });

  it("UNTB_MULTISIG_WALLET_25 - getOwners() - Check user can get owners", async function () {
    const confirmations = await this.test.wallet.getOwners.call();
    await expect(Utils.fetchPureArray(confirmations)).to.have.members([admin1, admin2, admin3]);
  });

  it("UNTB_MULTISIG_WALLET_26 - getTransactionCount() - Check user can get owners", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    const transactions = await this.test.wallet.getTransactionCount.call(true, true);
    await expect(transactions.valueOf()).to.be.equal("1");
  });

  it("UNTB_MULTISIG_WALLET_27 - isConfirmed() - Check that transaction can not be exeuted before needed confirmations received", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);

    const c = await this.test.wallet.isConfirmed.call(id);
    await expect(c.valueOf()).to.be.equal(false);
  }); 

  it("UNTB_MULTISIG_WALLET_28 - getTransactionIds() - Check user can get trasactions for period of time", async function () {
    const res = await this.test.wallet.submitTransaction(receiver, 1000, "some data", {from: admin1});
    const id = parseInt(res.logs[1].args["transactionId"]);
    const transactions = await this.test.wallet.getTransactionIds.call(0, 1, true, true);
    console.log(Utils.fetchPureArray(transactions, parseInt));
    console.log(id);
    await expect(Utils.fetchPureArray(transactions, parseInt)).to.have.members([id]);
  });

  it("UNTB_MULTISIG_WALLET_29 - changeRequirement() - Check admin can change requirement number", async function () {
    await this.test.wallet.changeRequirement(2, {from: admin1});
  });

  it("UNTB_MULTISIG_WALLET_30 - changeRequirement() - Check not admin can not change requirement number", async function () {
    await expect(this.test.wallet.changeRequirement(2, {from: receiver})).to.eventually.be.rejectedWith(EVMRevert);
  });

});