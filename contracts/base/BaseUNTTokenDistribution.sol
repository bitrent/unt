pragma solidity ^0.4.19;


import "../../node_modules/zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "../../node_modules/zeppelin-solidity/contracts/ownership/HasNoEther.sol";
import "../../node_modules/zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "../interfaces/UNTPricingStrategyInterface.sol";
import "../library/ZeppelinRefundVault.sol";


contract BaseUNTBTokenDistribution is Pausable, HasNoEther {
  using SafeMath for uint256;

  /**
   * @dev List of possible statuses of token distribution
   */
  enum Status {Unknown, Invest, Finalized} 

  /**
   * @dev Current status of token distribution. Unknown by default.
   */
  Status public currentStatus = Status.Unknown;

  /**
   * @dev Total wei (ether) receviced during token distribution.
   */
  uint256 public receivedWei;

  /**
   * @dev Total amount of tokens sold during token distribution. 
   */
  uint256 public tokensSold;

  /**
   * @dev Total count of investments.
   */
  uint256 public icoInvestmentsCount;

  /**
   * @dev Total invested wei (ether) from provided address
   */
  mapping(address => uint256) public investments;

  /**
   * @dev Total invested wei (ether) from provided customer UUID4
   */
  mapping(bytes16 => uint256) public customerInvestments;

  /**
   * @dev Total amount of tokens was sent to provided address
   */
  mapping(address => uint256) public tokenTransfers;

  /**
   * @dev Total amount of tokens was sent to provided UUID4
   */
  mapping(bytes16 => uint256) public customerTokenTransfers;

  /**
   * @dev Address of token Smart Contract.
   */
  DetailedERC20 public token;

  /**
   * @dev Address of pricing strategy smart contract.
   */
  UNTBPricingStrategyInterface public pricingStrategy;

  /**
   * @dev Address of multisig wallet smart contract.
   */
  address public wallet;

  /**
   * @dev Address of Refund Vault smart contract.
   */
  ZeppelinRefundVault public refundVault;

  /**
   * @dev When token distribution was started.
   */
  uint256 public startingTimestamp;

  /**
   * @dev When token distribution will end.
   */
  uint256 public endingTimestamp;

  /**
   * @dev Minimum of ether needed (in wei). If softcap was not reached - refund.
   */
  uint256 public softCap;
 
  /**
   * @dev A new investment was made.
   * @param _investor Ethereum address of investor
   * @param _customerId UUID4 of investor. Provided from backend.
   * @param _weiAmount Amount of investment.
   * @param _tokenAmount Amount of tokens sent to investor.
   * @param _timestamp When investment was made.
   */
  event Invested(
    address indexed _investor,
    bytes16 indexed _customerId,
    uint256 _weiAmount,
    uint256 _tokenAmount,
    uint256 _timestamp
  );

  /**
   * @dev Token distribution was started.
   * @param _timestamp Time of the start.
   */
  event Started(uint256 _timestamp);

  /**
   * @dev Token distribution was finalized.
   * @param _timestamp Ending time of token distribution.
   */
  event Finalized(uint256 _timestamp);

  /**
   * @dev Event raised if pricing strategy was updated.
   * @param _pricingStrategy New address of pricing strategy.
   * @param _timestamp When pricing strategy was updated.
   */
  event PricingStrategyWasSet(address _pricingStrategy, uint256 _timestamp);

  /**
   * @dev Event raised when end of the token ditribution was updated.
   * @param _newEndingTimestamp A new timestamp of token ditribution ending.
   * @param _timestamp When event was raised.
   */
  event EndingTimestampWasUpdated(uint256 _newEndingTimestamp, uint256 _timestamp);

  /**
   * @dev In contructor should be set:
   * - Pricing Strategy Address
   * - Softcap in wei
   * - Token Address
   * - Multisig Wallet Address
   * - Ending timestamp
   * - Creating instance of Refund vault. Crowdsale should be owner of refund vault.
   *
   * @param _token Token address.
   * @param _pricingStrategy Pricing strategy address.
   * @param _multisigWallet Multisig wallet address.
   * @param _softCap Soft cap in wei.
   * @param _endingTimestamp Deadline of the crowdsale.
   */
  function BaseUNTBTokenDistribution(
    address _token, 
    address _pricingStrategy,
    address _multisigWallet,
    uint256 _softCap,
    uint256 _endingTimestamp
  ) public {
    token = DetailedERC20(_token);
    softCap = _softCap;
    endingTimestamp = _endingTimestamp;

    setPricingStrategy(UNTBPricingStrategyInterface(_pricingStrategy));

    refundVault = new ZeppelinRefundVault(_multisigWallet);
  }

  /**
   * @dev Start ICO and track start time.
   */
  function startTokenDistribution() external;

  /**
   * @dev Finalize ICO and track finalize time. Should move ether to multisig wallet or unlock it.
   */
  function finalizeTokenDistribution() external;

  /**
   * @dev Set token distribution ending timestamp. Should be greater that now.
   */
  function setEndingTimestamp(uint256 _endingTimestamp) external;

  /**
    * @dev Make an investment. Funds should be moved intro Refund Vault.
    *      Should have wei greater or equal to price of one token.
    * @param _customerUuid (required) UUID v4 to track the successful payments on the server side
    */
  function invest(bytes16 _customerUuid) external payable;

  /**
   * @dev Investors can claim refunds here if crowdsale is unsuccessful. 
   *      Claim redund calls redund method in refund wallet.
   */
  function claimRefund() external;

  /**
   * @dev Checks whether funding goal (softcap) was reached. 
   * @return Whether funding goal was reached
   */
  function goalReached() public view returns (bool);

  /**
   * @dev Set new pricing strategy.
   */
  function setPricingStrategy(UNTBPricingStrategyInterface _pricingStrategyAddress) public;

    /**
   * @dev Minimal investment should be 1 token with decimals. 
   * @param _tokensReceived amount of tokens received
   */
  function isMinimalInvestmentReached(uint256 _tokensReceived) internal view returns (bool);
}