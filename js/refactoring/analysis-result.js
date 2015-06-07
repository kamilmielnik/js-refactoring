define([
    'underscore'
], function (_) {
    'use strict';

    var AnalysisResult = function (codeSmell, matchedCode, startLine, endLine, lazyRefactorCallback) {
        this.codeSmell = codeSmell;
        this.matchedCode = matchedCode;
        this.startLine = startLine;
        this.endLine = endLine;
        this.isRefactorable = !!lazyRefactorCallback;
        this.refactor = lazyRefactorCallback || _.noop;
    };

    return AnalysisResult;
});
