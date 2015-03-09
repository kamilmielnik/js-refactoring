define([
    'regex-refactoring/refactoring-result'
], function (RefactoringResult) {
    'use strict';

    var RefactoringMethod = function (parameters) {
        var regex = parameters.regex,
            requiredMatches = parameters.requiredMatches,
            refactoringFunction = parameters.refactoringPattern,
            refactoringResultBasedOnMatches;

        this.refactor = function (code) {
            var matches = regex.match(code);
            if (requiredMatches.areValid(matches)) {
                return refactoringResultBasedOnMatches(matches, refactoringFunction);
            }
            return new RefactoringResult();
        };

        refactoringResultBasedOnMatches = function (matches, refactoringFunction) {
            var refactoredCode = refactoringFunction.apply(matches);
            return new RefactoringResult(matches['code'], refactoredCode, true);
        };
    };

    return RefactoringMethod;
});
