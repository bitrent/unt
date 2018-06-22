pragma solidity ^0.4.19;


import "../../node_modules/zeppelin-solidity/contracts/crowdsale/distribution/utils/RefundVault.sol";


/**
 * @title ZeppelinRefundVault
 * @dev This contract is used for storing funds while a crowdsale
 *      is in progress. Supports refunding the money if crowdsale fails,
 *      and forwarding it if crowdsale is successful.
 */
contract ZeppelinRefundVault is RefundVault {
  
  /**
   * @dev Setup address of multisig wallet when creating a contract
   * @param _multisigWallet Address of multisig wallet
   */
  function ZeppelinRefundVault(address _multisigWallet) RefundVault(_multisigWallet) public {
  }

  /**
   * @dev Deposit ether from Token ditribution contract. 
   *      Method could be called only from contract owner (Token Distribution contract).
   * @param _investor Investor address.
   */
  function deposit(address _investor) public payable {
    super.deposit(_investor);
  }

  /**
   * @dev Close deposit and send all fund on multisig wallet. 
   *      Should be called if crowd sale was successfull and softcap was reached.
   *      Method could be called only from contract owner (Token Distribution contract).
   */
  function close() public {
    super.close();
  }

  /**
   * @dev Enable refunds. 
   *      Should be called if crowd sale was unsuccessful and softcap was NOT reached.
   *      Method could be called only from contract owner (Token Distribution contract).
   */  
  function enableRefunds() public {
    super.enableRefunds();
  }

  /**
   * @dev Refund method for investor. Could be called when refunds was enabled.
   *      Method could be called only from contract owner (Token Distribution contract).
   * @param _investor Investor address.
   */
  function refund(address _investor) public {
    super.refund(_investor);
  }
}