define([], function () {
    'use strict';

    var RefactoringResult = function (matchedCode, refactoredCode, wasRefactoringApplied) {
        this.matchedCode = matchedCode;
        this.refactoredCode = refactoredCode;
        this.wasRefactoringApplied = !!wasRefactoringApplied;
    };

    return RefactoringResult;
});
