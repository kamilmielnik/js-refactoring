define([
    'underscore',
    'ast-engine/code-utils',
    'ast-engine/node-patterns',
    'ast-engine/traverse'
], function (_, CodeUtils, nodePatterns, traverse) {
    'use strict';

    var CodeSmell = function (parameters) {
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

    return CodeSmell;
});
