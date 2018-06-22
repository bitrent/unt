












# UNTBMultisigWallet

### Multisig Wallet with 3 predefined admins



## Functions



### Constant functions

#### ADMINS_COUNT

Cound of admin users. Currently - 3


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint||Cound of admin users. Currently - 3|


#### MAX_OWNER_COUNT

Max count of wallet owners including admins. Currently - 10
Constants

##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint||Max count of wallet owners including admins. Currently - 10|


#### admins




##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|index|uint|||


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|address|||


#### confirmations




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||confirmations|


#### getAdmins




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|param0|address|||


#### getConfirmationCount

Returns number of confirmations of a transaction.
Web3 call functions

##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint||Transaction ID.|


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|count|uint|||


#### getConfirmations

Returns array with owner addresses, which confirmed transaction.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint||Transaction ID.|


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_confirmations|address|||


#### getOwners

Returns list of owners.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|param0|address|||


#### getTransactionCount

Returns total number of transactions after filers are applied.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|pending|bool||Include pending transactions.|
|1|executed|bool||Include executed transactions.|


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|count|uint|||


#### getTransactionIds

Returns list of transaction IDs in defined range.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|from|uint||Index start position of transaction array.|
|1|to|uint||Index end position of transaction array.|
|2|pending|bool||Include pending transactions.|
|3|executed|bool||Include executed transactions.|


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_transactionIds|uint|||


#### isAdmin




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||isAdmin|


#### isConfirmed

Returns the confirmation status of a transaction.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint||Transaction ID.|


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|param0|bool|||


#### isOwner




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||isOwner|


#### owners




##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|index|uint|||


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|address|||


#### paused




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|bool||paused|


#### required




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint||required|


#### transactionCount




##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|uint||transactionCount|


#### transactions

Storage


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|return0|[object Object]||Storage|






### State changing functions

#### addOwner

Allows to add a new owner. Transaction has to be sent by wallet.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|owner|address||Address of new owner.|


#### changeRequirement

Allows to change the number of required confirmations. Transaction has to be sent by wallet.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_required|uint||Number of required confirmations.|


#### confirmTransaction

Allows an owner to confirm a transaction.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint||Transaction ID.|


#### executeTransaction

Allows anyone to execute a confirmed transaction.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint||Transaction ID.|


#### 

Fallback function allows to deposit ether.


##### Inputs

empty list


#### pause

called by the owner to pause, triggers stopped state


##### Inputs

empty list


#### removeOwner

Allows to remove an owner. Transaction has to be sent by wallet.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|owner|address||Address of owner.|


#### replaceOwner

Allows to replace an owner with a new owner. Transaction has to be sent by wallet.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|owner|address||Address of owner to be replaced.|
|1|newOwner|address||Address of new owner.|


#### revokeConfirmation

Allows an owner to revoke a confirmation for a transaction.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint||Transaction ID.|


#### submitTransaction

Allows an owner to submit and confirm a transaction.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|destination|address||Transaction target address.|
|1|value|uint||Transaction ether value.|
|2|data|bytes||Transaction data payload.|


#### unpause

called by the owner to unpause, returns to normal state


##### Inputs

empty list






### Events

#### Confirmation

Events


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|sender|address|||
|1|transactionId|uint|||


#### Revocation




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|sender|address|||
|1|transactionId|uint|||


#### Submission




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint|||


#### Execution




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint|||


#### ExecutionFailure




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|transactionId|uint|||


#### Deposit




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|sender|address|||
|1|value|uint|||


#### OwnerAddition




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|owner|address|||


#### OwnerRemoval




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|owner|address|||


#### RequirementChange




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|required|uint|||


#### Paused




##### Params

empty list


#### Unpaused




##### Params

empty list





### Enums




### Structs

#### WalletTransaction




##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|sender|address|||
|1|destination|address|||
|2|value|uint|||
|3|data|bytes|||
|4|executed|bool|||




