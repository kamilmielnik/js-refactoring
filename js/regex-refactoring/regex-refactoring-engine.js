define([
    'regex-refactoring/methods/list'
], function (refactoringMethodsList) {
    'use strict';

    var RegexRefactoringEngine = function () {
        var getRefactoredCode;

        this.analyze = function (code) {
            var possibleRefactorings = [];

            _(refactoringMethodsList).each(function (refactoringMethod) {
                var analysisResults = refactoringMethod.analyze(code);
                possibleRefactorings = _(possibleRefactorings).concat(analysisResults);
                analysisResults = refactoringMethod.analyze(code);
            });

            return possibleRefactorings;
        };

        this.refactor = function (code) {
            var refactoredCode = code;

            _.each(refactoringMethodsList, function (refactoringMethod) {
                var refactoringResult = refactoringMethod.refactor(refactoredCode);
                while (refactoringResult.wasRefactoringApplied) {
                    refactoredCode = getRefactoredCode(refactoredCode, refactoringResult);
                    refactoringResult = refactoringMethod.refactor(refactoredCode);
                }
            });

            return refactoredCode;
        };

        getRefactoredCode = function (code, refactoringResult) {
            return code.replace(refactoringResult.matchedCode, refactoringResult.refactoredCode);
        };
    };

    return RegexRefactoringEngine;
});
