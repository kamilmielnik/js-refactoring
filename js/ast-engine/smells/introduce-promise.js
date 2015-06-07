define([
    'ast-engine/code-smell',
    'ast-engine/traverse'
], function (CodeSmell, traverse) {
    'use strict';

    var IntroducePromise = new CodeSmell({
        name: 'Introduce Promise',

        info: '',

        suggestedRefactorings: [],

        refactor: function (node) {
            var self = this,
                hasReturnStatement = traverse.containsNode(node, self.patterns.returnStatement),
                oldFunctionExpression = node.declarations[0].init,
                oldFunctionBody = oldFunctionExpression.body,
                newFunctionBody = this.returnPromiseBody,
                promiseFunctionBody = newFunctionBody.body[0].argument.arguments[0].body;

            promiseFunctionBody.body = oldFunctionBody.body;
            oldFunctionBody.body = newFunctionBody.body;

            if (!hasReturnStatement) {
                this.appendFulfillToBody(promiseFunctionBody.body);
            } else {
                promiseFunctionBody.body = this.replaceNodesInCurrentScope({
                    nodes: promiseFunctionBody.body,
                    nodePattern: self.patterns.returnStatement,
                    replacementFunction: function (node) {
                        var newNode = self.fulfill();
                        if (node.argument) {
                            newNode.expression.arguments[0] = node.argument;
                        }
                        return newNode;
                    }
                });
            }

            promiseFunctionBody.body = this.replaceNodesInCurrentScope({
                nodes: promiseFunctionBody.body,
                nodePattern: self.patterns.throwStatement,
                replacementFunction: function (node) {
                    var newNode = self.reject();
                    newNode.expression.arguments[0] = node.argument;
                    return newNode;
                }
            });

            return this.generateCode(node);
        },

        appendFulfillToBody: function (body) {
            body.push(this.fulfill());
        },

        nodePattern: {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier'
                    },
                    init: {
                        type: 'FunctionExpression',
                        params: [
                            {
                                "type": "Identifier"
                            },
                            {
                                "type": "Identifier"
                            }
                        ],
                        body: {
                            type: 'BlockStatement'
                        }
                    }
                }
            ]
        },

        postCheck: function (matchingNode) {
            var params = matchingNode.declarations[0].init.params,
                firstParamName = params[0].name.toLocaleLowerCase(),
                secondParamName = params[1].name.toLocaleLowerCase(),
                firstParamNamesContainsSuccess = firstParamName.indexOf('succ') > -1,
                secondParamNamesContainsFailure = secondParamName.indexOf('fail') > -1,
                secondParamNamesContainsError = secondParamName.indexOf('err') > -1;

            return firstParamNamesContainsSuccess && (secondParamNamesContainsFailure || secondParamNamesContainsError);
        },

        rejectNodePattern: {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier'
                    },
                    init: {
                        type: 'FunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: "ReturnStatement",
                                    argument: {
                                        type: "NewExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "Promise"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },

        returnPromiseBody: {
            type: 'BlockStatement',
            body: [
                {
                    type: 'ReturnStatement',
                    argument: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'Promise'
                        },
                        arguments: [
                            {
                                type: 'FunctionExpression',
                                id: null,
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'fulfill'
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'reject'
                                    }
                                ],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: []
                                },
                                rest: null,
                                generator: false,
                                expression: false
                            }
                        ]
                    }
                }
            ]
        },

        fulfill: function () {
            return {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'fulfill'
                    },
                    arguments: []
                }
            };
        },

        reject: function () {
            return {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'reject'
                    },
                    arguments: []
                }
            };
        }
    });

    return IntroducePromise;
});
