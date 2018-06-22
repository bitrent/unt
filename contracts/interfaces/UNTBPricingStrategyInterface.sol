pragma solidity ^0.4.19;


/**
 * @dev Contract resposible for calculation token amount which should be sent via token distribution contract.
 */
contract UNTBPricingStrategyInterface {

  /**
   * @dev Event shoud be raised when token price was updated.
   * @param _updatedFrom Which address was updated token price.
   * @param _oneTokenInWei New price of the one token.
   */
  event TokenPriceInWeiUpdated(address _updatedFrom, uint256 _oneTokenInWei);

  /**
   * @dev Static interface method. Should return true.
   */
  function isPricingStrategy() public constant returns (bool);

  /**
   * @dev Calculate tokens amount for provided amount of wei. 
   * @param _weiSent Amount of wei which was sent by investor.
   * @param _decimals Decimals of token.
   * @return tokens Amount of tokens with decimals which should be sent for provided amount of wei.
   */
  function calculateTokenAmount(uint256 _weiSent, uint _decimals) public view returns (uint256 tokens);

  /**
   * @dev Update token price in wei.
   * @param _oneTokenInWei New price of one token.
   * @return bool Token price was updated successfully.
   */
  function setTokenPriceInWei(uint256 _oneTokenInWei) public returns (bool);
}
