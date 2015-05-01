define([
    'knockout'
], function (ko) {
    'use strict';

    var ApplicationStatus = function () {
        var status = ko.observable();

        this.errors = [];

        this.value = function () {
            return status();
        };

        this.subscribe = function (handler) {
            status.subscribe(handler);
        };

        this.error = function (error) {
            if (!error instanceof Error) {
                error = new Error(error);
            }
            this.errors.push(error);
            status(error);
        };

        this.ready = function () {
            status('Ready');
        };
    };

    return new ApplicationStatus();
});
