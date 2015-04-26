define([
    'underscore',
    'utils/parser',
    'ast-refactoring/traverse',
    'ast-refactoring/methods/list',
    'refactoring/analysis-result',
    'utils/line-numbers'
], function (_, parser, traverse, refactoringMethodsList, AnalysisResult, lineNumbersUtils) {
    'use strict';

    var ASTRefactoringEngine = function () {
        var refactorNodeInCodeWithRefactoringMethod;

        this.analyze = function (code) {
            var rootNode = parser.parse(code),
                analysisResults = [];

            _(refactoringMethodsList).each(function (refactoringMethod) {
                var matchingNodes = traverse.find(rootNode, refactoringMethod.nodePattern, refactoringMethod.rejectNodePattern);
                _(matchingNodes).each(function (matchingNode) {
                    var codeStartIndex = matchingNode.range[0],
                        codeEndIndex = matchingNode.range[1],
                        matchedCode = code.substring(codeStartIndex, codeEndIndex),
                        startLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, codeStartIndex),
                        endLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, codeEndIndex),
                        analysisResult = new AnalysisResult(refactoringMethod, matchedCode, startLine, endLine, function () {
                            return refactoringMethod.refactor(matchingNode);
                        });

                    analysisResults.push(analysisResult);
                });
            });

            return analysisResults;
        };

        this.refactor = function (code) {
            var refactoredCode = code;

            _(refactoringMethodsList).each(function (refactoringMethod) {
                var rootNode = parser.parse(refactoredCode),
                    matchingNode = traverse.findOne(rootNode, refactoringMethod.nodePattern, refactoringMethod.rejectNodePattern);

                while (matchingNode) {
                    refactoredCode = refactorNodeInCodeWithRefactoringMethod(matchingNode, refactoredCode, refactoringMethod);
                    rootNode = parser.parse(refactoredCode);
                    matchingNode = traverse.findOne(rootNode, refactoringMethod.nodePattern, refactoringMethod.rejectNodePattern);
                }
            });

            return refactoredCode;
        };

        refactorNodeInCodeWithRefactoringMethod = function (node, code, refactoringMethod) {
            var originalCode = code.substring(node.range[0], node.range[1]),
                replacementCode = refactoringMethod.refactor(node),
                refactoredCode = code.replace(originalCode, replacementCode);
            return refactoredCode;
        };
    };

    return ASTRefactoringEngine;
});
