pragma solidity ^0.4.19;

import "../node_modules/zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./interfaces/UNTBPricingStrategyInterface.sol";
import "./library/SafeMath.sol";


/**
 * @dev Contract resposible for calculation token amount which should be sent via token distribution contract.
 */
contract UNTBPricingStrategy is UNTBPricingStrategyInterface, Pausable {
  using SafeMath for uint256;

  uint256 public oneTokenInWei;
  mapping (address => bool) public allowed;

  event TokenPriceInWeiUpdated(address _updatedFrom, uint256 _oneTokenInWei);

  modifier onlyAllowed() {
    require(allowed[msg.sender] == true);
    _;
  }

  function setAllowed(address _address, bool _allowed) public onlyOwner whenNotPaused {
    require(allowed[_address] != _allowed);
    allowed[_address] = _allowed;
  }

  function isPricingStrategy() public constant returns (bool) {
    return true;
  }

  function calculateTokenAmount(uint256 _weiSent, uint _decimals) public view whenNotPaused returns (uint256 tokens) {
    uint256 multiplier = 10 ** _decimals;
    uint256 weiAmount = _weiSent.mul(multiplier);
    return weiAmount.div(oneTokenInWei);
  }

  function setTokenPriceInWei(uint256 _oneTokenInWei) public onlyAllowed whenNotPaused returns (bool) {
    oneTokenInWei = _oneTokenInWei;
    TokenPriceInWeiUpdated(msg.sender, _oneTokenInWei);
  }
}
