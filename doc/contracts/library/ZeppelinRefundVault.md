












# ZeppelinRefundVault

### This contract is used for storing funds while a crowdsale

is in progress. Supports refunding the money if crowdsale fails,and forwarding it if crowdsale is successful.

## Functions



### Constant functions

#### deposited




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||deposited|


#### owner




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|address||owner|


#### state




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|State||state|


#### wallet




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|address||wallet|






### State changing functions

#### close

Close deposit and send all fund on multisig wallet.
Should be called if crowd sale was successfull and softcap was reached.Method could be called only from contract owner (Token Distribution contract).

##### Inputs

empty list


#### deposit

Deposit ether from Token ditribution contract.
Method could be called only from contract owner (Token Distribution contract).

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_investor|address||Investor address.|


#### enableRefunds

Enable refunds.
Should be called if crowd sale was unsuccessful and softcap was NOT reached.Method could be called only from contract owner (Token Distribution contract).

##### Inputs

empty list


#### refund

Refund method for investor. Could be called when refunds was enabled.
Method could be called only from contract owner (Token Distribution contract).

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_investor|address||Investor address.|


#### transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|newOwner|address||The address to transfer ownership to.|






### Events

#### OwnershipTransferred




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|previousOwner|address|||
|1|newOwner|address|||


#### Closed




##### Params

empty list


#### RefundsEnabled




##### Params

empty list


#### Refunded




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|beneficiary|address|||
|1|weiAmount|uint256|||





### Enums

#### State




|#  |Member|Description|
|---|------|-----------|
|0|Active||
|1|Refunding||
|2|Closed||




### Structs



