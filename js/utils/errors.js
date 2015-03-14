define([], function () {
    'use strict';

    var Errors = function () {
        this.errors = [];

        this.throw = function (args) {
            var error = new Error(args);
            this.errors.push(error);
            throw error;
        };
    };

    return new Errors();
});
