define([], function () {
    'use strict';

    return {
        componentName: 'list-of-smells',

        viewModel: function (params) {
            this.smellEntries = params.smellEntries;
        }
    };
});
