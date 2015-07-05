define([
    'knockout',
    'moment'
], function (ko, moment) {
    'use strict';

    var ApplicationStatus = function () {
        var status = ko.observable(),
            actionStartTime;

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

        this.startAction = function () {
            actionStartTime = moment();
        };

        this.ready = function () {
            var actionEndTime = moment(),
                difference;

            if (actionStartTime) {
                difference = actionEndTime.diff(actionStartTime, 'ms');
                status('Ready ({time} ms)'.format({
                    time: difference
                }));
            } else {
                status('Ready');
            }
        };
    };

    return new ApplicationStatus();
});
