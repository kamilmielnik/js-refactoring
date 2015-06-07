define([
    'underscore',
    'ast-engine/traverse',
    'ast-engine/smells/list',
    'refactoring/analysis-result',
    'utils/parser',
    'utils/line-numbers',
    'utils/utils'
], function (_, traverse, codeSmells, AnalysisResult, parser, lineNumbersUtils, utils) {
    'use strict';

    var ASTEngine = function () {
        var filterNodesWithPostCheck,
            createAnalysisResultBasedOnNode;

        this.analyze = function (code) {
            var rootNode = parser.parse(code),
                analysisResults = [];

            _(codeSmells).each(function (codeSmell) {
                var matchingNodes = traverse.find(rootNode, codeSmell.nodePattern, codeSmell.rejectNodePattern),
                    filteredMatchingNodes = filterNodesWithPostCheck(codeSmell, matchingNodes),
                    results = _(filteredMatchingNodes).map(function (node) {
                        return createAnalysisResultBasedOnNode(codeSmell, code, node);
                    });
                analysisResults = _(analysisResults).concat(results);
            });

            return analysisResults;
        };

        filterNodesWithPostCheck = function (codeSmell, nodes) {
            if (!codeSmell.postCheck) {
                return nodes;
            }

            return _(nodes).filter(function (node) {
                return codeSmell.postCheck(node);
            });
        };

        createAnalysisResultBasedOnNode = function (codeSmell, code, node) {
            var codeStartIndex = node.range[0],
                codeEndIndex = node.range[1],
                matchedCode = code.substring(codeStartIndex, codeEndIndex),
                startLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, codeStartIndex),
                endLine = lineNumbersUtils.lineNumberBasedOnStringIndex(code, codeEndIndex),
                refactoringFunction = codeSmell.refactor ? function () {
                    var clonedMatchingNode = utils.deepClone(node);
                    return codeSmell.refactor(clonedMatchingNode);
                } : undefined;

            return new AnalysisResult(codeSmell, matchedCode, startLine, endLine, refactoringFunction);
        };
    };

    return ASTEngine;
});
