define([
    'underscore'
], function (_) {
    'use strict';

    var Errors = function () {
        var callbacks = [],
            callCallbacks;

        this.errors = [];

        this.throw = function (error) {
            if (!error instanceof Error) {
                error = new Error(error);
            }
            this.errors.push(error);
            callCallbacks(error);
            throw error;
        };

        this.onThrow = function (callback) {
            callbacks.push(callback);
        };

        callCallbacks = function (error) {
            _(callbacks).every(function (callback) {
                callback(error);
            });
        };
    };

    return new Errors();
});
