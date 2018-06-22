pragma solidity ^0.4.19;

import "./base/BaseUNTBTokenDistribution.sol";


contract UNTBTokenDistribution is BaseUNTBTokenDistribution {

  function UNTBTokenDistribution(
    DetailedERC20 _token, 
    UNTBPricingStrategyInterface _pricingStrategy,
    address _multisigWallet,
    uint256 _softCap,
    uint256 _endingTimestamp
  ) BaseUNTBTokenDistribution (
    _token,
    _pricingStrategy,
    _multisigWallet,
    _softCap,
    _endingTimestamp
  ) public {  }

  modifier inStatus(Status _status) {
    require(currentStatus == _status);
    _;
  }

  function startTokenDistribution() external onlyOwner inStatus(Status.Unknown) whenNotPaused {
    currentStatus = Status.Invest;
    startingTimestamp = now;
    Started(startingTimestamp);
  }

  function finalizeTokenDistribution() external onlyOwner inStatus(Status.Invest) whenNotPaused {
    require(now > endingTimestamp);

    if (goalReached()) {
      refundVault.close();
    } else {
      refundVault.enableRefunds();
    }

    currentStatus = Status.Finalized;
    Finalized(now);
  }

  function setEndingTimestamp(uint256 _endingTimestamp) external onlyOwner whenNotPaused {
    endingTimestamp = _endingTimestamp;
    EndingTimestampWasUpdated(_endingTimestamp, endingTimestamp);
  }

  function invest(bytes16 _customerUuid) external payable inStatus(Status.Invest) whenNotPaused {
    uint256 tokensReceived = pricingStrategy.calculateTokenAmount(msg.value, token.decimals());
    
    require(isMinimalInvestmentReached(tokensReceived));

    refundVault.deposit.value(msg.value)(msg.sender);
    token.transferFrom(owner, msg.sender, tokensReceived);

    investments[msg.sender] = investments[msg.sender].add(msg.value);
    customerInvestments[_customerUuid] = customerInvestments[_customerUuid].add(msg.value);
    tokenTransfers[msg.sender] = tokenTransfers[msg.sender].add(tokensReceived);
    customerTokenTransfers[_customerUuid] = customerTokenTransfers[_customerUuid].add(tokensReceived);

    icoInvestmentsCount = icoInvestmentsCount.add(1);

    receivedWei = receivedWei.add(msg.value);
    tokensSold = tokensSold.add(tokensReceived);

    Invested(msg.sender, _customerUuid, msg.value, tokensReceived, now);
  }

  function claimRefund() external inStatus(Status.Finalized) whenNotPaused {
    refundVault.refund(msg.sender);
  }

  function goalReached() public view whenNotPaused returns (bool) {
    return receivedWei >= softCap;
  }

  function setPricingStrategy(UNTBPricingStrategyInterface _pricingStrategyAddress) public onlyOwner {
    require(_pricingStrategyAddress.isPricingStrategy());
    pricingStrategy = _pricingStrategyAddress;
    PricingStrategyWasSet(_pricingStrategyAddress, now);
  }

  function isMinimalInvestmentReached(uint256 _tokensReceived) internal view whenNotPaused returns (bool) {
    return _tokensReceived >= uint256(10) ** token.decimals();
  }
}