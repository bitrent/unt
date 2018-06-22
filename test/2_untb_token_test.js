const BigNumber = web3.BigNumber;

const expect = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .expect;

const EVMRevert = require('./helpers/EVMRevert');
const Utils = require("./helpers/utils");

const Token = artifacts.require("UNTBToken");

const deployToken = () => {
  return Token.new();
}

contract('UNTBToken', function (accounts) {
  const owner = accounts[0];
  const user = accounts[1];
  const secondUser = accounts[2];

  const tokenName = "UNTB Token";
  const tokenSymbol = "UNTB";
  const tokenDecimals = "18";
  const totalSupply = new BigNumber("100000e18");

  beforeEach(async function deployContracts() {
    this.currentTest.token = await deployToken();
  });

  it("UNTB_TOKEN_1 - balanceOf() - Check owner balance", async function () {
    const res = await this.test.token.balanceOf.call(owner);
    await expect(new BigNumber(res.valueOf()).toString()).to.be.equal(totalSupply.toString());
  });

  it("UNTB_TOKEN_2", async function () {
    console.log("\tCovered by UNTB_TOKEN_5")
  });

  it("UNTB_TOKEN_3", async function () {
    console.log("\tCovered by UNTB_TOKEN_7 and UNTB_TOKEN_15")
  });

  it("UNTB_TOKEN_4", async function () {
    console.log("\tCovered by UNTB_TOKEN_8 and UNTB_TOKEN_16")
  });

  it("UNTB_TOKEN_5 - transfer() - Check that disallowed user can not transfer tokens to disallowed address", async function () {
    const tokensToSend = new BigNumber("1e18");
    await this.test.token.transfer(secondUser, tokensToSend);
    
    await expect(this.test.token.transfer(user, tokensToSend, {from: secondUser})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_6 - transfer() - Check that owner can transfer tokens to unallowed address", async function () {
    const tokensToSend = new BigNumber("1e18");
    
    await this.test.token.transfer(user, tokensToSend);
  });

  it("UNTB_TOKEN_7 - allowReceiver() - Check that owner can allow address to recevie tokens", async function () {
    await this.test.token.allowReceiver(user, true);
  });

  it("UNTB_TOKEN_8 - allowReceiver() - Check that not owner can not allow address to recevie tokens", async function () {
    await expect(this.test.token.allowReceiver(user, true, {from: user})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_9 - transfer() - Check that allowed user can transfer tokens", async function () {
    const tokensToSend = new BigNumber("5e18");
    await this.test.token.allowSender(user, true);
    await this.test.token.transfer(user, tokensToSend, {from: owner});

    await this.test.token.transfer(secondUser, tokensToSend, {from: user});
  });

  
  it("UNTB_TOKEN_10 - transfer() - Check that allowed user can not transfer tokens more than have", async function () {
    const tokensToSend = new BigNumber("100e18");
    const moreThanBalance = new BigNumber("102e18");
    await this.test.token.allowSender(user, true);
    await this.test.token.transfer(user, tokensToSend, {from: owner});

    await expect(this.test.token.transfer(secondUser, moreThanBalance, {from: user})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_11 - allowReceiver() - Check that owner can disallow address to recevie tokens", async function () {
    await this.test.token.allowReceiver(user, true);
    await this.test.token.allowReceiver(user, false);
  });

  it("UNTB_TOKEN_12 - allowReceiver() - Check that not owner can not disallow address to recevie tokens", async function () {
    await this.test.token.allowReceiver(user, true);
    await expect(this.test.token.allowReceiver(user, false, {from: user})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_13", async function () {
    console.log("\tCovered by UNTB_TOKEN_7 and UNTB_TOKEN_15")
  });

  it("UNTB_TOKEN_14", async function () {
    console.log("\tCovered by UNTB_TOKEN_8 and UNTB_TOKEN_16")
  });

  it("UNTB_TOKEN_15 - allowSender() - Check that owner can unlock address for sending", async function () {
    await this.test.token.allowSender(user, true);
  });

  it("UNTB_TOKEN_16 - allowSender() - Check that not owner can not unlock address for sending", async function () {
    await expect(this.test.token.allowSender(user, true, {from: user})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_17", async function () {
    console.log("\tCovered by UNTB_TOKEN_19")
  });

  it("UNTB_TOKEN_18", async function () {
    console.log("\tCovered by UNTB_TOKEN_20")
  });

  it("UNTB_TOKEN_19 - allowSender() - Check that owner can lock address for sending", async function () {
    await this.test.token.allowSender(user, true);
    await this.test.token.allowSender(user, false);
  });

  it("UNTB_TOKEN_20 - allowSender() - Check that not owner can not lock address for sending", async function () {
    await this.test.token.allowSender(user, true);
    await expect(this.test.token.allowSender(user, false, {from: user})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_21", async function () {
    console.log("\tCovered by UNTB_TOKEN_7 and UNTB_TOKEN_15")
  });

  it("UNTB_TOKEN_22", async function () {
    console.log("\tCovered by UNTB_TOKEN_7 and UNTB_TOKEN_15")
  });

  it("UNTB_TOKEN_23 - pause() - Check that owner can pause contract", async function () {
    await this.test.token.pause();
  });

  it("UNTB_TOKEN_24 - pause() - Check that functions can not be called until pause", async function () {
    await this.test.token.pause();
    await expect(this.test.token.allowSender(user, true)).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_25 - unpause() - Check that functions can not be called after pause", async function () {
    await this.test.token.pause();
    await this.test.token.unpause();
    await this.test.token.allowSender(user, true);
  });

});