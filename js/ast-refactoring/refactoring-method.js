define([
    'underscore',
    'ast-refactoring/code-utils',
    'ast-refactoring/node-patterns',
    'ast-refactoring/traverse'
], function (_, CodeUtils, nodePatterns, traverse) {
    'use strict';

    var RefactoringMethod = function (parameters) {
        _.extend(this, {
            patterns: nodePatterns
        });

        this.suggestedRefactorings = parameters.suggestedRefactorings || [];

        this.info = parameters.info || '';

        this.postCheck = parameters.postCheck;

        this.generateCode = function (node) {
            return CodeUtils.generate(node);
        };

        this.replaceNodesInCurrentScope = function (options) {
            return _.map(options.nodes, function (node) {
                return traverse.replace(node, {
                    nodePatterns: options.nodePattern,
                    stopPatterns: nodePatterns.function,
                    replacementFunction: options.replacementFunction
                });
            });
        };

        return _.extend(parameters, this);
    };

    return RefactoringMethod;
});
