define([], function () {
    'use strict';

    var CodeUtils = function () {
        this.generate = function (node) {
            return window.escodegen.generate(node);
        };
    };

    return new CodeUtils();
});
