define([], function () {
    'use strict';

    return {
        componentName: 'list-of-refactorings',

        viewModel: function (params) {
            this.refactoringEntries = params.refactoringEntries;
        }
    };
});
