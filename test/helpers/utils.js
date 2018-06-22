exports.Status = {
    "Unknow": 0,
    "Invest": 1,
    "Finalized": 2
}

exports.ZeroAddress = "0x0000000000000000000000000000000000000000";

exports.fetchPureArray = function (res, parseFunc) {
    let arr = [];
    for (let key in res) {
        if (parseFunc != null) {
            arr.push(parseFunc(res[key].valueOf()));
        } else {
            arr.push(res[key].valueOf());
        }
    }
    return arr;
}