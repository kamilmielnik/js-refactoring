define([], function () {
    'use strict';

    var AnalysisResult = function (refactoringMethod, matchedCode, startLine, endLine) {
        this.refactoringMethod = refactoringMethod;
        this.matchedCode = matchedCode;
        this.startLine = startLine;
        this.endLine = endLine;
    };

    return AnalysisResult;
});
