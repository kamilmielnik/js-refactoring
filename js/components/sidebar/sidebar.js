define([
    'underscore',
    'knockout',
    'beautify'
], function (_, ko, Beautify) {
    'use strict';

    return {
        controlName: 'sidebar',

        viewModel: function (params) {
            var codeToRefactor = params.codeToRefactor,
                outputCode = params.outputCode,
                refactoringEngines = params.refactoringEngines;

            this.list = ko.observableArray();

            this.analyze = function () {
                window.alert('analyze');
                /* TODO: implement me */
            };

            this.refactor = function () {
                var refactoredCode = _.reduce(refactoringEngines, function (refactoredCode, refactoringEngine) {
                        return refactoringEngine.refactor(refactoredCode);
                    }, codeToRefactor()),
                    beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);
                outputCode(beautifiedRefactoredCode);
            };
        }
    };
});
