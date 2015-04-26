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
            analysisResultBasedOnMatch,
            refactoringResultBasedOnMatches,
            lineNumberBasedOnStringIndex,
            getFirstCharacterInLineIndexes;

        this.name = parameters.name;

        this.analyze = function (code) {
            var matches = regex.matchAll(code);
            return _(matches).map(function (match) {
                return analysisResultBasedOnMatch(code, match);
            });
        };

        this.refactor = function (code) {
            var matches = regex.match(code);
            if (requiredMatches.areValid(matches)) {
                return refactoringResultBasedOnMatches(matches);
            }
            return new RefactoringResult();
        };

        analysisResultBasedOnMatch = function (code, match) {
            var startLine = lineNumberBasedOnStringIndex(code, match.index),
                endLine = lineNumberBasedOnStringIndex(code, match.index + match.code.length);

            return new AnalysisResult(self, match.code, startLine, endLine);
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
