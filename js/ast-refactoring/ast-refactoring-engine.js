define([
    'underscore',
    'esprima',
    'ast-refactoring/traverse',
    'ast-refactoring/methods/list'
], function (_, Esprima, traverse, refactoringMethodsList) {
    'use strict';

    var ASTRefactoringEngine = function () {
        var parseAST,
            refactorNodeInCodeWithRefactoringMethod;

        this.refactor = function (code) {
            var refactoredCode = code;
            _.each(refactoringMethodsList, function (refactoringMethod) {
                var rootNode = parseAST(refactoredCode),
                    matchingNode = traverse.findOne(rootNode, refactoringMethod.nodePattern, refactoringMethod.rejectNodePattern);

                while (matchingNode) {
                    refactoredCode = refactorNodeInCodeWithRefactoringMethod(matchingNode, refactoredCode, refactoringMethod);
                    rootNode = parseAST(refactoredCode);
                    matchingNode = traverse.findOne(rootNode, refactoringMethod.nodePattern, refactoringMethod.rejectNodePattern);
                }
            });
            return refactoredCode;
        };

        parseAST = function (code) {
            return Esprima.parse(code, {
                loc: true,
                range: true
            });
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
