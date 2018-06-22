












# UNTBPricingStrategyInterface

### Contract resposible for calculation token amount which should be sent via token distribution contract.



## Functions



### Constant functions

#### isPricingStrategy

Static interface method. Should return true.


##### Inputs

empty list


##### Returns

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|param0|bool|||






### State changing functions

#### calculateTokenAmount

Calculate tokens amount for provided amount of wei.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_weiSent|uint256||Amount of wei which was sent by investor.|
|1|_decimals|uint||Decimals of token.|


#### setTokenPriceInWei

Update token price in wei.


##### Inputs

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_oneTokenInWei|uint256||New price of one token.|






### Events

#### TokenPriceInWeiUpdated

Event shoud be raised when token price was updated.


##### Params

|#  |Param|Type|TypeHint|Description|
|---|-----|----|--------|-----------|
|0|_updatedFrom|address||Which address was updated token price.|
|1|_oneTokenInWei|uint256||New price of the one token.|





### Enums




### Structs



