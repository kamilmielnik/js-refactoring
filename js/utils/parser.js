define([
    'esprima',
    'utils/errors'
], function (Esprima, errors) {
    'use strict';

    var Parser = function () {
        this.parse = function (code) {
            try {
                return Esprima.parse(code, {
                    loc: true,
                    range: true
                });
            } catch (error) {
                errors.throw(error);
            }
        };
    };

    return new Parser();
});
