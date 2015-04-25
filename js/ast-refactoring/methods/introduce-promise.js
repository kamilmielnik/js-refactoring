define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse'
], function (RefactoringMethod, traverse) {
    'use strict';

    var IntroducePromise = new RefactoringMethod({
        name: 'Introduce Promise',

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
                        body: {
                            type: 'BlockStatement'
                        }
                    }
                }
            ]
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
