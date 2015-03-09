define([
    'underscore',
    'ast-refactoring/code-utils',
    'ast-refactoring/node-patterns',
    'ast-refactoring/traverse'
], function (_, CodeUtils, nodePatterns, traverse) {
    'use strict';

    var RefactoringMethod = function (options) {
        _.extend(this, {
            patterns: nodePatterns
        });

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

        return _.extend(options, this);
    };

    return RefactoringMethod;
});
