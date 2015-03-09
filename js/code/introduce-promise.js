function isInteger(value) {
    if (isNaN(value)) {
        return false;
    }
    var floatValue = parseFloat(value);
    return (floatValue | 0) === floatValue;
}

var power = function (a, n) {
    if (n < 0) {
        throw 'n must not be less than 0!';
    }
    if (!isInteger(n)) {
        throw 'n must be an integer!';
    }
    if (n === 0) {
        return 1;
    }
    if (n === 1) {
        return a;
    }
    var result = a;
    for (var i = 1; i < n; ++i) {
        result *= a;
    }
    return result;
}
