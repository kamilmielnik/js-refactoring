var createHeader = function () {
    var x = 7;
    console.log(x * x);
    return '<div class="header">Hello!</div>';
};
var styleElement = function (element) {
    return element.replace('class="', 'class="beautiful ');
};
var addElementToPage = function (element) {
    document.body.innerHTML = element + document.body.innerHTML;
};

var header = createHeader();
var styledHeader = styleElement(header);
addElementToPage(styledHeader);


///////////

var createHeader = function () {
    return new Promise(function (fulfill, reject) {
        var x = 7;
        console.log(x * x);
        fulfill('<div class="header">Hello!</div>');
    });
};
var styleElement = function (element) {
    return new Promise(function (fulfill, reject) {
        fulfill(element.replace('class="', 'class="beautiful '));
    });
};
var addElementToPage = function (element) {
    return new Promise(function (fulfill, reject) {
        document.body.innerHTML = element + document.body.innerHTML;
        fulfill();
    });
};

createHeader().then(styleElement).then(addElementToPage);
