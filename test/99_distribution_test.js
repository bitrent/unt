const BigNumber = web3.BigNumber;

const expect = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .expect;

const EVMRevert = require('./helpers/EVMRevert');
const Utils = require("./helpers/utils");

const TokenDistribution = artifacts.require("UNTBTokenDistribution");
const Token = artifacts.require("UNTBToken");
const Wallet = artifacts.require("UNTBMultisigWallet");
const PricingStrategy = artifacts.require("UNTBPricingStrategy");

const deployTokenDistribution = (tokenAddress, pricingAddress, walletAddress) => {
  return TokenDistribution.new(tokenAddress, pricingAddress, walletAddress, 10000, 0);
}

const deployToken = () => {
  return Token.new();
}

const deployWallet = (admin1, admin2, admin3) => {
  return Wallet.new([admin1, admin2, admin3], 3);
}

const deployPricingStrategy = () => {
  return PricingStrategy.new();
}

contract('UNTBTokenDistribution', function (accounts) {
  const owner = accounts[0];
  const walletAdmin1 = accounts[9];
  const walletAdmin2 = accounts[8];
  const walletAdmin3 = accounts[7];
  const investor1 = accounts[1];
  const investor2 = accounts[2];

  const investor1Uuid = "sdsds1";
  const investor2Uuid = "sdsds2";

  const statusUnknow = Utils.Status["Unknow"];
  const statusInvest = Utils.Status["Invest"];
  const statusFinalized = Utils.Status["Finalized"];

  beforeEach(async function deployContracts() {
    this.currentTest.token = await deployToken();
    this.currentTest.wallet = await deployWallet(walletAdmin1, walletAdmin2, walletAdmin3);
    this.currentTest.pricing = await deployPricingStrategy();
    this.currentTest.distribution = await deployTokenDistribution(this.currentTest.token.address, this.currentTest.pricing.address, this.currentTest.wallet.address);
  });

  it("UNTB_TOKEN_DISTRIBUTION_1 - startTokenDistribution() - Check distribution starting", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);
  });

  it("UNTB_TOKEN_DISTRIBUTION_2 - startTokenDistribution() - Check that distribution can not be started twice", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await expect(this.test.distribution.startTokenDistribution()).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_DISTRIBUTION_3 - finalizeTokenDistribution() - Check distribution finalized", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.distribution.finalizeTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusFinalized);
  });

  it("UNTB_TOKEN_DISTRIBUTION_4 - finalizeTokenDistribution() -  Check that distribution can not be finalized twice", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.distribution.finalizeTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusFinalized);

    await expect(this.test.distribution.finalizeTokenDistribution()).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_DISTRIBUTION_5 - startTokenDistribution(), finalizeTokenDistribution() -  Check that distribution can not be started after it was finalized", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.distribution.finalizeTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusFinalized);

    await expect(this.test.distribution.startTokenDistribution()).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_DISTRIBUTION_6 - finalizeTokenDistribution() -  Check that distribution can not be finalized before it was started", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await expect(this.test.distribution.finalizeTokenDistribution()).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_DISTRIBUTION_7 - setEndingTimestamp() -  Check that ending can be setted", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    const endTime = Date.now() + 900;
    await this.test.distribution.setEndingTimestamp(endTime);

    const endingTimestamp = await this.test.distribution.endingTimestamp.call();
    await expect(parseInt(endingTimestamp.valueOf())).to.be.equal(endTime);
  });

  it("UNTB_TOKEN_DISTRIBUTION_8 - setEndingTimestamp(), finalizeTokenDistribution() -  Check that distribution can not be finalized before end time reached", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    const endTime = Date.now() + 900;
    await this.test.distribution.setEndingTimestamp(endTime);

    const endingTimestamp = await this.test.distribution.endingTimestamp.call();
    await expect(parseInt(endingTimestamp.valueOf())).to.be.equal(endTime);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await expect(this.test.distribution.finalizeTokenDistribution()).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_DISTRIBUTION_9 - invest() -  Check invest", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    const endTime = Date.now() + 900; // 15 minutes after now
    await this.test.distribution.setEndingTimestamp(endTime);

    const endingTimestamp = await this.test.distribution.endingTimestamp.call();
    await expect(parseInt(endingTimestamp.valueOf())).to.be.equal(endTime);

    await this.test.distribution.startTokenDistribution();

    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.pricing.setAllowed(owner, true, {from: owner});
    await this.test.pricing.setTokenPriceInWei(100);
    await this.test.token.allowSender(this.test.distribution.address, true, {from: owner});
    await this.test.token.approve(this.test.distribution.address, new BigNumber("100000e18"), {from: owner});

    const tokens = await this.test.pricing.calculateTokenAmount(1000, 18);

    await this.test.distribution.invest(investor1Uuid, {from: investor1, value: 1000});

    const investorBalance = await this.test.token.balanceOf.call(investor1);
    await expect(investorBalance.valueOf()).to.be.equal(tokens.valueOf());
  });

  it("UNTB_TOKEN_DISTRIBUTION_10 - invest() -  Check that finalize after successful invest will transfer tokens to wallet", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.pricing.setAllowed(owner, true, {from: owner});
    await this.test.pricing.setTokenPriceInWei(100);
    await this.test.token.allowSender(this.test.distribution.address, true, {from: owner});
    await this.test.token.approve(this.test.distribution.address, new BigNumber("100000e18"), {from: owner});

    // overall wei should be equal 11000
    const i1tokens = await this.test.pricing.calculateTokenAmount(1000, 18);
    const i2tokens = await this.test.pricing.calculateTokenAmount(10000, 18);

    await this.test.distribution.invest(investor1Uuid, {from: investor1, value: 1000});
    await this.test.distribution.invest(investor2Uuid, {from: investor2, value: 10000});

    let investorBalance = await this.test.token.balanceOf.call(investor1);
    await expect(investorBalance.valueOf()).to.be.equal(i1tokens.valueOf());

    investorBalance = await this.test.token.balanceOf.call(investor2);
    await expect(investorBalance.valueOf()).to.be.equal(i2tokens.valueOf());

    await this.test.distribution.finalizeTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusFinalized);

    const walletBalance = await web3.eth.getBalance(this.test.wallet.address);
    await expect(parseInt(walletBalance.valueOf())).to.be.equal(11000);
  });

  
  it("UNTB_TOKEN_DISTRIBUTION_11 - invest() - Check that user can not invest less than one token price in wei", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.pricing.setAllowed(owner, true, {from: owner});
    await this.test.pricing.setTokenPriceInWei(new BigNumber("1000e18"));
    await this.test.token.allowSender(this.test.distribution.address, true, {from: owner});
    await this.test.token.approve(this.test.distribution.address, new BigNumber("100000e18"), {from: owner});

    await expect(this.test.distribution.invest(investor1Uuid, {from: investor1, value: 990})).to.eventually.be.rejectedWith(EVMRevert);
  });

  it("UNTB_TOKEN_DISTRIBUTION_12 - refund() -  Check refund function", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.pricing.setAllowed(owner, true, {from: owner});
    await this.test.pricing.setTokenPriceInWei(100);
    await this.test.token.allowSender(this.test.distribution.address, true, {from: owner});
    await this.test.token.approve(this.test.distribution.address, new BigNumber("100000e18"), {from: owner});

    // overall wei should be less than 10000
    const i1tokens = await this.test.pricing.calculateTokenAmount(4000, 18);
    const i2tokens = await this.test.pricing.calculateTokenAmount(4000, 18);

    await this.test.distribution.invest(investor1Uuid, {from: investor1, value: 4000});
    await this.test.distribution.invest(investor2Uuid, {from: investor2, value: 4000});

    let investorBalance = await this.test.token.balanceOf.call(investor1);
    await expect(investorBalance.valueOf()).to.be.equal(i1tokens.valueOf());

    investorBalance = await this.test.token.balanceOf.call(investor2);
    await expect(investorBalance.valueOf()).to.be.equal(i2tokens.valueOf());

    await this.test.distribution.finalizeTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusFinalized);

    const walletBalance = await web3.eth.getBalance(this.test.wallet.address);
    await expect(parseInt(walletBalance.valueOf())).to.be.equal(0);

    await this.test.distribution.claimRefund({from: investor1});
    await this.test.distribution.claimRefund({from: investor2});
  });

  it("UNTB_TOKEN_DISTRIBUTION_13 - refund() -  Check refund function will not work if invest was successful", async function () {
    let currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusUnknow);

    await this.test.distribution.startTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusInvest);

    await this.test.pricing.setAllowed(owner, true, {from: owner});
    await this.test.pricing.setTokenPriceInWei(100);
    await this.test.token.allowSender(this.test.distribution.address, true, {from: owner});
    await this.test.token.approve(this.test.distribution.address, new BigNumber("100000e18"), {from: owner});

    // overall wei should be more than 10000
    const i1tokens = await this.test.pricing.calculateTokenAmount(8000, 18);
    const i2tokens = await this.test.pricing.calculateTokenAmount(4000, 18);

    await this.test.distribution.invest(investor1Uuid, {from: investor1, value: 8000});
    await this.test.distribution.invest(investor2Uuid, {from: investor2, value: 4000});

    let investorBalance = await this.test.token.balanceOf.call(investor1);
    await expect(investorBalance.valueOf()).to.be.equal(i1tokens.valueOf());

    investorBalance = await this.test.token.balanceOf.call(investor2);
    await expect(investorBalance.valueOf()).to.be.equal(i2tokens.valueOf());

    await this.test.distribution.finalizeTokenDistribution();
    currentStatus = await this.test.distribution.currentStatus.call();
    await expect(parseInt(currentStatus.valueOf())).to.be.equal(statusFinalized);

    const walletBalance = await web3.eth.getBalance(this.test.wallet.address);
    await expect(parseInt(walletBalance.valueOf())).to.be.equal(12000);

    await expect(this.test.distribution.claimRefund({from: investor1})).to.eventually.be.rejectedWith(EVMRevert);
    await expect(this.test.distribution.claimRefund({from: investor2})).to.eventually.be.rejectedWith(EVMRevert);
  });

});