define([
    'underscore',
    'utils/parser',
    'ast-refactoring/traverse',
    'ast-refactoring/methods/list',
    'refactoring/analysis-result',
    'utils/line-numbers',
    'utils/utils'
], function (_, parser, traverse, refactoringMethodsList, AnalysisResult, lineNumbersUtils, utils) {
    'use strict';

    var ASTRefactoringEngine = function () {
        this.analyze = function (code) {
            var rootNode = parser.parse(code),
                analysisResults = [];

            _(refactoringMethodsList).each(function (refactoringMethod) {
                var matchingNodes = traverse.find(rootNode, refactoringMethod.nodePattern, refactoringMethod.rejectNodePattern);

                if (refactoringMethod.postCheck) {
                    matchingNodes = _(matchingNodes).filter(function (matchingNode) {
                        return refactoringMethod.postCheck(matchingNode);
                    });
                }

                _(matchingNodes).each(function (matchingNode) {

                    var codeStartIndex = matchingNode.range[0],
                        codeEndIndex = matchingNode.range[1],
                        matchedCode = code.substring(codeStartIndex, codeEndIndex),
                        startLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, codeStartIndex),
                        endLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, codeEndIndex),
                        refactoringFunction = refactoringMethod.refactor ? function () {
                            var clonedMatchingNode = utils.deepClone(matchingNode);
                            return refactoringMethod.refactor(clonedMatchingNode);
                        } : undefined,
                        analysisResult = new AnalysisResult(refactoringMethod, matchedCode, startLine, endLine, refactoringFunction);

                    analysisResults.push(analysisResult);
                });
            });

            return analysisResults;
        };
    };

    return ASTRefactoringEngine;
});
