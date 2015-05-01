define([
    'esprima'
], function (Esprima) {
    'use strict';

    var Parser = function () {
        this.parse = function (code) {
            return Esprima.parse(code, {
                loc: true,
                range: true
            });
        };
    };

    return new Parser();
});
