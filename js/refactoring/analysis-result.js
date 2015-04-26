define([], function () {
    'use strict';

    var AnalysisResult = function (refactoringMethod, matchedCode, startLine, endLine, lazyRefactorCallback) {
        this.refactoringMethod = refactoringMethod;
        this.matchedCode = matchedCode;
        this.startLine = startLine;
        this.endLine = endLine;
        this.refactor = lazyRefactorCallback;
    };

    return AnalysisResult;
});
