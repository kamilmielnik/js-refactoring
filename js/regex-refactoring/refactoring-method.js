define([
    'refactoring/analysis-result',
    'refactoring/refactoring-result'
], function (AnalysisResult, RefactoringResult) {
    'use strict';

    var RefactoringMethod = function (parameters) {
        var self = this,
            regex = parameters.regex,
            requiredMatches = parameters.requiredMatches,
            refactoringFunction = parameters.refactoringPattern,
            analysisResultBasedOnMatches,
            refactoringResultBasedOnMatches,
            lineNumberBasedOnStringIndex,
            getFirstCharacterInLineIndexes;

        this.name = parameters.name;

        this.analyze = function (code) {
            var allMatches = regex.matchAll(code);
            return _(allMatches).map(function (matches) {
                if (requiredMatches.areValid(matches)) {
                    return analysisResultBasedOnMatches(code, matches);
                }
            });
        };

        this.refactor = function (code) {
            var matches = regex.match(code);
            if (requiredMatches.areValid(matches)) {
                return refactoringResultBasedOnMatches(matches);
            }
            return new RefactoringResult();
        };

        analysisResultBasedOnMatches = function (code, matches) {
            var startLine = lineNumberBasedOnStringIndex(code, matches.index),
                endLine = lineNumberBasedOnStringIndex(code, matches.index + matches.code.length);

            return new AnalysisResult(self, matches.code, startLine, endLine, function () {
                return refactoringFunction.apply(matches);
            });
        };

        refactoringResultBasedOnMatches = function (matches) {
            var refactoredCode = refactoringFunction.apply(matches);
            return new RefactoringResult(self, matches.code, refactoredCode, true);
        };

        lineNumberBasedOnStringIndex = function (string, index) {
            var firstCharacterIndexes = getFirstCharacterInLineIndexes(string),
                numberOfLines = firstCharacterIndexes.length,
                currentLineId = 0,
                currentLineStartIndex,
                nextLineStartIndex;

            while (currentLineId < numberOfLines) {
                currentLineStartIndex = firstCharacterIndexes[currentLineId];
                nextLineStartIndex = firstCharacterIndexes[currentLineId + 1] || Number.MAX_VALUE;
                if (index >= currentLineStartIndex && index < nextLineStartIndex) {
                    return currentLineId + 1;
                }
                ++currentLineId;
            }

            return numberOfLines;
        };

        getFirstCharacterInLineIndexes = function (string) {
            var newLineCharacter = '\n',
                lines = string.split(newLineCharacter),
                firstCharacterIndexes = [],
                nextLineFirstCharacterIndex = 0;

            _(lines).each(function (line) {
                firstCharacterIndexes.push(nextLineFirstCharacterIndex);
                nextLineFirstCharacterIndex += line.length + newLineCharacter.length;
            });

            return firstCharacterIndexes;
        };
    };

    return RefactoringMethod;
});
