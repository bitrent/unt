












# BaseUNTBTokenDistribution

### BaseUNTBTokenDistribution



## Functions



### Constant functions

#### currentStatus

Current status of token distribution. Unknown by default.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|Status||Current status of token distribution. Unknown by default.|


#### customerInvestments

Total invested wei (ether) from provided customer UUID4


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||Total invested wei (ether) from provided customer UUID4|


#### customerTokenTransfers

Total amount of tokens was sent to provided UUID4


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||Total amount of tokens was sent to provided UUID4|


#### endingTimestamp

When token distribution will end.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint256||When token distribution will end.|


#### icoInvestmentsCount

Total count of investments.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint256||Total count of investments.|


#### investments

Total invested wei (ether) from provided address


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||Total invested wei (ether) from provided address|


#### owner




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|address||owner|


#### paused




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|bool||paused|


#### pricingStrategy

Address of pricing strategy smart contract.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|UNTBPricingStrategyInterface||Address of pricing strategy smart contract.|


#### receivedWei

Total wei (ether) receviced during token distribution.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint256||Total wei (ether) receviced during token distribution.|


#### refundVault

Address of Refund Vault smart contract.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|ZeppelinRefundVault||Address of Refund Vault smart contract.|


#### softCap

Minimum of ether needed (in wei). If softcap was not reached - refund.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint256||Minimum of ether needed (in wei). If softcap was not reached - refund.|


#### startingTimestamp

When token distribution was started.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint256||When token distribution was started.|


#### token

Address of token Smart Contract.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|DetailedERC20||Address of token Smart Contract.|


#### tokenTransfers

Total amount of tokens was sent to provided address


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||Total amount of tokens was sent to provided address|


#### tokensSold

Total amount of tokens sold during token distribution.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint256||Total amount of tokens sold during token distribution.|


#### wallet

Address of multisig wallet smart contract.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|address||Address of multisig wallet smart contract.|






### State changing functions

#### claimRefund

Investors can claim refunds here if crowdsale is unsuccessful.
Claim redund calls redund method in refund wallet.

##### Inputs

empty list


#### finalizeTokenDistribution

Finalize ICO and track finalize time. Should move ether to multisig wallet or unlock it.


##### Inputs

empty list


#### goalReached

Checks whether funding goal (softcap) was reached.


##### Inputs

empty list


#### invest

Make an investment. Funds should be moved intro Refund Vault.
Should have wei greater or equal to price of one token.

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_customerUuid|bytes16||(required) UUID v4 to track the successful payments on the server side|


#### 

Disallows direct send by settings a default function without the `payable` flag.


##### Inputs

empty list


#### pause

called by the owner to pause, triggers stopped state


##### Inputs

empty list


#### reclaimEther

Transfer all Ether held by the contract to the owner.


##### Inputs

empty list


#### setEndingTimestamp

Set token distribution ending timestamp. Should be greater that now.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_endingTimestamp|uint256|||


#### setPricingStrategy

Set new pricing strategy.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_pricingStrategyAddress|UNTBPricingStrategyInterface|||


#### startTokenDistribution

Start ICO and track start time.


##### Inputs

empty list


#### transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|newOwner|address||The address to transfer ownership to.|


#### unpause

called by the owner to unpause, returns to normal state


##### Inputs

empty list






### Events

#### OwnershipTransferred




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|previousOwner|address|||
|1|newOwner|address|||


#### Pause




##### Params

empty list


#### Unpause




##### Params

empty list


#### Invested

A new investment was made.


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_investor|address||Ethereum address of investor|
|1|_customerId|bytes16||UUID4 of investor. Provided from backend.|
|2|_weiAmount|uint256||Amount of investment.|
|3|_tokenAmount|uint256||Amount of tokens sent to investor.|
|4|_timestamp|uint256||When investment was made.|


#### Started

Token distribution was started.


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_timestamp|uint256||Time of the start.|


#### Finalized

Token distribution was finalized.


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_timestamp|uint256||Ending time of token distribution.|


#### PricingStrategyWasSet

Event raised if pricing strategy was updated.


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_pricingStrategy|address||New address of pricing strategy.|
|1|_timestamp|uint256||When pricing strategy was updated.|


#### EndingTimestampWasUpdated

Event raised when end of the token ditribution was updated.


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_newEndingTimestamp|uint256||A new timestamp of token ditribution ending.|
|1|_timestamp|uint256||When event was raised.|





### Enums

#### Status

List of possible statuses of token distribution


|#  |Member|Description|
|---|------|-----------|
|0|Unknown||
|1|Invest||
|2|Finalized||




### Structs



