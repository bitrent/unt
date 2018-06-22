












# BaseUNTBToken

### Should be extended and implemented. Token could be sent to send to allowed addresses only.

Token could be sent to any address by allowed addresses only (Owner be default).Extend this token and implement all abstract methods

## Functions



### Constant functions

#### decimals




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint8||decimals|


#### name




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|string||name|


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


#### symbol




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|string||symbol|






### State changing functions

#### allowReceiver

Allow or disallow send tokend to specified Ethereum address.
Token could not be sent on addresess not in the allowedReceivers list.Method for adding or removing address to list of allowedReceivers. Cloud be called only from Owner.

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_allowedReceiver|address||Ethereum address of allowed receiver of tokens. Could be contract or wallet.|
|1|_allow|bool||Allow or disallow _allowedReceiver receive tokens|


#### allowSender

Allow or disallow send token to any address. Address will be added in allowedSenders list.
Addreses from this list coud send tokens to any receiver bypassing allowedReceivers list.Method for adding or removing address to list of allowedSenders. Cloud be called only from Owner.Could be contract or wallet.

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_allowedSender|address||Ethereum address of allowed sender of tokens bypassing allowedReceivers list.|
|1|_allow|bool||Allow or disallow _allowedReceiver receive tokens|


#### allowance

Function to check the amount of tokens that an owner allowed to a spender.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_owner|address||address The address which owns the funds.|
|1|_spender|address||address The address which will spend the funds.|


#### approve




##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_spender|address|||
|1|_value|uint256|||


#### balanceOf

Gets the balance of the specified address.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_owner|address||The address to query the the balance of.|


#### decreaseApproval




##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_spender|address|||
|1|_subtractedValue|uint|||


#### increaseApproval




##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_spender|address|||
|1|_addedValue|uint|||


#### pause

called by the owner to pause, triggers stopped state


##### Inputs

empty list


#### totalSupply

total number of tokens in existence


##### Inputs

empty list


#### transfer

Transfer token for a specified address. Tokens could be transfered only to allowed receivers.
Tokens could be tranfered bypassing allowedReceivers list only from allowed senders.

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_to|address||The address to transfer to.|
|1|_value|uint256||The amount to be transferred.|


#### transferFrom

Transfer tokens from one address to another. Tokens could be transfered only to allowed receivers.
Tokens could be tranfered bypassing allowedReceivers list only from allowed senders.

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_from|address||address The address which you want to send tokens from|
|1|_to|address||address The address which you want to transfer to|
|2|_value|uint256||uint256 the amount of tokens to be transferred|


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

#### Transfer




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|from|address|||
|1|to|address|||
|2|value|uint256|||


#### Approval




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|owner|address|||
|1|spender|address|||
|2|value|uint256|||


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





### Enums




### Structs



