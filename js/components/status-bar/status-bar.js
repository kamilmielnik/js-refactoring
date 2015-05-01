define([
    'knockout',
    'utils/application-status'
], function (ko, applicationStatus) {
    'use strict';

    return {
        componentName: 'status-bar',

        viewModel: function () {
            this.message = ko.observable(applicationStatus.value());

            this.isError = ko.computed(function () {
                return this.message() instanceof Error;
            }.bind(this));

            applicationStatus.subscribe(function (status) {
                this.message(''); // this resets the class so that the css animation can kick-in
                setTimeout(function () {
                    this.message(status);
                }.bind(this));
            }.bind(this));
        }
    };
});
