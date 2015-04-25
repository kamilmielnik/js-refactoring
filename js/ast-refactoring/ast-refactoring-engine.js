define([
    'underscore',
    'esprima',
    'utils/errors',
    'ast-refactoring/traverse',
    'ast-refactoring/methods/list'
], function (_, Esprima, errors, traverse, refactoringMethodsList) {
    'use strict';

    var ASTRefactoringEngine = function () {
        var parseAST,
            refactorNodeInCodeWithRefactoringMethod;

        this.analyze = function (code) {
            code = String(code);
        };

        this.refactor = function (code) {
            var refactoredCode = code;

            _(refactoringMethodsList).each(function (refactoringMethod) {
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
            try {
                return Esprima.parse(code, {
                    loc: true,
                    range: true
                });
            } catch (error) {
                errors.throw(error);
            }
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
