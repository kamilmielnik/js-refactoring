define([
    'underscore'
], function (_) {
    'use strict';

    var LineNumbersUtils = function () {
        var getFirstCharacterInLineIndexes;

        this.lineNumberBasedOnStringIndex = function (string, index) {
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

    return new LineNumbersUtils();
});
