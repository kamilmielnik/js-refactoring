define([
    'regex-refactoring/methods/list'
], function (refactoringMethodsList) {
    'use strict';

    var RegexRefactoringEngine = function () {
        this.analyze = function (code) {
            var possibleRefactorings = [];

            _(refactoringMethodsList).each(function (refactoringMethod) {
                var analysisResults = refactoringMethod.analyze(code);
                possibleRefactorings = _(possibleRefactorings).concat(analysisResults);
            });

            return possibleRefactorings;
        };
    };

    return RegexRefactoringEngine;
});
