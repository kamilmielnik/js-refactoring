define([
    'underscore',
    'utils/utils',
    'ast-refactoring/node-pattern-matcher'
], function (_, utils, nodePatternMatcher) {
    'use strict';

    var Traverse = function () {
        var traverse = this,
            findNodes,
            isNode,
            isArrayOfNodes,
            findNodesInArrayOfNodes,
            nodeMatchesAnyPattern,
            replaceSubNodes;

        this.find = function (rootNode, nodePattern, rejectNodePattern) {
            return findNodes(rootNode,
                function (node) {
                    return nodePatternMatcher.match(node, nodePattern);
                }, function (node) {
                    return nodePatternMatcher.match(node, rejectNodePattern);
                });
        };

        this.findOne = function (rootNode, nodePattern, rejectNodePattern) {
            /* TODO: optimize this! */
            return _.first(this.find(rootNode, nodePattern, rejectNodePattern));
        };

        this.containsNode = function (rootNode, nodePattern, rejectNodePattern) {
            return !!this.findOne(rootNode, nodePattern, rejectNodePattern);
        };

        findNodes = function (rootNode, predicate, rejectPredicate) {
            var foundNodes = [];
            if (!rejectPredicate(rootNode)) {
                if (predicate(rootNode)) {
                    foundNodes.push(rootNode);
                }
                _.each(rootNode, function (value) {
                    var subNodes = [];
                    if (isNode(value)) {
                        subNodes = findNodes(value, predicate, rejectPredicate);
                    } else if (isArrayOfNodes(value)) {
                        subNodes = findNodesInArrayOfNodes(value, predicate, rejectPredicate);
                    }
                    foundNodes = foundNodes.concat(subNodes);
                });
            }
            return foundNodes;
        };

        isNode = function (candidate) {
            return _.isObject(candidate) && !!candidate.type;
        };

        isArrayOfNodes = function (candidate) {
            return _.isArray(candidate) && !candidate.type;
        };

        findNodesInArrayOfNodes = function (arrayOfNodes, predicate, rejectPredicate) {
            return _.flatten(_.map(arrayOfNodes, function (node) {
                return findNodes(node, predicate, rejectPredicate);
            }));
        };

        this.replace = function (rootNode, options) {
            options.nodePatterns = utils.assureArray(options.nodePatterns);
            options.stopPatterns = utils.assureArray(options.stopPatterns);

            if (nodeMatchesAnyPattern(rootNode, options.stopPatterns)) {
                return rootNode;
            }

            if (nodeMatchesAnyPattern(rootNode, options.nodePatterns)) {
                return options.replacementFunction(rootNode);
            }

            replaceSubNodes(rootNode, options);
            return rootNode;
        };

        nodeMatchesAnyPattern = function (node, nodePatterns) {
            return _.any(nodePatterns, function (nodePattern) {
                return nodePatternMatcher.match(node, nodePattern);
            });
        };

        replaceSubNodes = function (rootNode, options) {
            _.each(rootNode, function (nodePropertyValue, nodePropertyName) {
                if (_.isArray(nodePropertyValue)) {
                    rootNode[nodePropertyName] = _.map(nodePropertyValue, function (subNode) {
                        return traverse.replace(subNode, options);
                    });
                } else if (_.isObject(nodePropertyValue)) {
                    rootNode[nodePropertyName] = traverse.replace(nodePropertyValue, options);
                }
            });
        };
    };

    return new Traverse();
});
