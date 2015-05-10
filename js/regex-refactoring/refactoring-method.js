define([
    'refactoring/analysis-result',
    'utils/line-numbers'
], function (AnalysisResult, lineNumbersUtils) {
    'use strict';

    var RefactoringMethod = function (parameters) {
        var self = this,
            regex = parameters.regex,
            requiredMatches = parameters.requiredMatches,
            refactoringPattern = parameters.refactoringPattern,
            analysisResultBasedOnMatches;

        this.name = parameters.name;

        this.info = parameters.info || '';

        this.suggestedRefactorings = parameters.suggestedRefactorings || [];

        this.analyze = function (code) {
            var allMatches = regex.matchAll(code);
            return _(allMatches).map(function (matches) {
                if (requiredMatches.areValid(matches)) {
                    return analysisResultBasedOnMatches(code, matches);
                }
            });
        };

        analysisResultBasedOnMatches = function (code, matches) {
            var startLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, matches.index),
                endLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, matches.index + matches.code.length),
                refactoringFunction = refactoringPattern ? function () {
                    return refactoringPattern.apply(matches);
                } : undefined;

            return new AnalysisResult(self, matches.code, startLine, endLine, refactoringFunction);
        };
    };

    return RefactoringMethod;
});
