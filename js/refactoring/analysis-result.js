define([
    'underscore'
], function (_) {
    'use strict';

    var AnalysisResult = function (refactoringMethod, matchedCode, startLine, endLine, lazyRefactorCallback) {
        this.refactoringMethod = refactoringMethod;
        this.matchedCode = matchedCode;
        this.startLine = startLine;
        this.endLine = endLine;
        this.isRefactorable = !!lazyRefactorCallback;
        this.refactor = lazyRefactorCallback || _.noop;
    };

    return AnalysisResult;
});
