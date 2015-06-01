function Person(name) {
    var self = this;

    this.name = name.substring(3, 7);

    this.logName = function () {
        setTimeout(function () {
            console.log(self.name);
        }, 1);
    };
}

var a = 2; //TODO: remove this variable as it is unused

function isInteger(value) {
    if (isNaN(value)) {
        return false;
    }
    var floatValue = parseFloat(value);
    return (floatValue | 0) === floatValue;
}

thats.how.trainwreck = 'looks like'.substr(6, 4);

var power = function (a, n) {
    a = a != null ? a : 0;
    n = n != null ? n : 0;

    if (n < 0) {
        throw 'n must not be less than 0!';
    }
    if (!isInteger(n)) {
        throw 'n must be an integer!';
    }

    switch (n) {
        case 0:
            return 1;
        case 1:
            return a;
    }

    var result = a;
    for (var i = 1; i < n; ++i) {
        result *= a;
    }
    return result;
}

var isJohnAMan = true,
    isJohnAWoman = undefined;

if (isJohnAMan === true) {
    isJohnAWoman = false;
} else {
    isJohnAWoman = true;
}

function loadHeaderBodyFooterAndAds(header, body, footer, ads) {
    var x = $('#content').html(header + body + footer + ads);
    /*
        TODO:
            do something with this html
    */
}

list1 = list1.sort(function (a, b) {
    return a > b ? 1 : -1;
});


list2 = list2.sort(function (a, b) {
    return a > b ? 1 : -1;
});

var asyncOperation = function (successCallback, failureCallback) {
    doSomethingAsync(successCallback, failureCallback);
};
