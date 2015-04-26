define([
    'utils/errors'
], function (errors) {
    'use strict';

    return {
        componentName: 'dialog',

        viewModel: function () {
            errors.onThrow(function (error) {
                window.alert(error);
            });
        }
    };
});
