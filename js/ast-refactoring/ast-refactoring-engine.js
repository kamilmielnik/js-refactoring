define([
    'underscore',
    'utils/parser',
    'ast-refactoring/traverse',
    'ast-refactoring/methods/list'
], function (_, parser, traverse, refactoringMethodsList) {
    'use strict';

    var ASTRefactoringEngine = function () {
        var refactorNodeInCodeWithRefactoringMethod;

        this.analyze = function (code) {
            code = String(code);
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
