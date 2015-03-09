define([
    'regex-refactoring/methods/list'
], function (refactoringMethodsList) {
    'use strict';

    var RegexRefactoringEngine = function () {
        var getRefactoredCode;

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
