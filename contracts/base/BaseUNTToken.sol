pragma solidity ^0.4.19;


import "../../node_modules/zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "../../node_modules/zeppelin-solidity/contracts/token/ERC20/PausableToken.sol";


/**
 * @title Base token. 
 * @dev Should be extended and implemented. Token could be sent to send to allowed addresses only. 
 *      Token could be sent to any address by allowed addresses only (Owner be default).
 *      Extend this token and implement all abstract methods
 **/
contract BaseUNTBToken is DetailedERC20("UNT for Unity Towers SC", "UNT", 18), PausableToken {
  /**
   * @dev A set of addresses allowed to receive the token.
   **/
  mapping (address => bool) internal allowedReceivers;

  /**
   * @dev A set of addresses allowed to send tokens on any address. Contracts Owner should be added by default. 
   */
  mapping (address => bool) internal allowedSenders;

  /**
   * @dev Set total tokens supply 100000 with 18 decimals. Send total supply to Owner. 
   *      Add owner to allowed receviers and senders.
   */
  function BaseUNTBToken() public {
    totalSupply_ = 100000 * (10 ** uint256(decimals));
    owner = msg.sender;
    balances[owner] = totalSupply_;
    allowedReceivers[owner] = true;
    allowedSenders[owner] = true;
  }

  /**
   * @dev Allow or disallow send tokend to specified Ethereum address. 
   *      Token could not be sent on addresess not in the allowedReceivers list. 
   *      Method for adding or removing address to list of allowedReceivers. Cloud be called only from Owner.
   * @param _allowedReceiver Ethereum address of allowed receiver of tokens. Could be contract or wallet.
   * @param _allow Allow or disallow _allowedReceiver receive tokens 
   */
  function allowReceiver(address _allowedReceiver, bool _allow) public;

   /**
   * @dev Allow or disallow send token to any address. Address will be added in allowedSenders list. 
   *      Addreses from this list coud send tokens to any receiver bypassing allowedReceivers list. 
   *      Method for adding or removing address to list of allowedSenders. Cloud be called only from Owner.
   * @param _allowedSender Ethereum address of allowed sender of tokens bypassing allowedReceivers list. 
   *                       Could be contract or wallet.
   * @param _allow Allow or disallow _allowedReceiver receive tokens 
   */
  function allowSender(address _allowedSender, bool _allow) public;

  /**
  * @dev Transfer token for a specified address. Tokens could be transfered only to allowed receivers. 
  *      Tokens could be tranfered bypassing allowedReceivers list only from allowed senders.
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    allowedToSend(msg.sender, _to);
    return super.transfer(_to, _value);
  }

  /**
   * @dev Transfer tokens from one address to another. Tokens could be transfered only to allowed receivers. 
   *      Tokens could be tranfered bypassing allowedReceivers list only from allowed senders.
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    allowedToSend(msg.sender, _to);
    return super.transferFrom(_from, _to, _value);
  }

  /**
   * @dev If sender or receiver is allowed, we could send tokens. 
   *      This check should be applied on all sending methods of token.
   */
  function allowedToSend(address _sender, address _receiver) internal view {
    require(allowedSenders[_sender] || allowedReceivers[_receiver]);
  }
}