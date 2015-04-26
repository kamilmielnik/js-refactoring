define([], function () {
    'use strict';

    var RefactoringResult = function (refactoringMethod, matchedCode, refactoredCode, wasRefactoringApplied) {
        this.refactoringMethod = refactoringMethod;
        this.matchedCode = matchedCode;
        this.refactoredCode = refactoredCode;
        this.wasRefactoringApplied = !!wasRefactoringApplied;
    };

    return RefactoringResult;
});
