pragma solidity ^0.4.19;

import "./base/BaseUNTToken.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/HasNoEther.sol";


contract UNTBToken is BaseUNTBToken, HasNoEther {
  
  function allowReceiver(address _allowedReceiver, bool _allow) public whenNotPaused onlyOwner {
    allowedReceivers[_allowedReceiver] = _allow;
  }

  function allowSender(address _allowedSender, bool _allow) public whenNotPaused onlyOwner {
    allowedSenders[_allowedSender] = _allow;
  }

}