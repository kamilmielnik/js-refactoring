define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var EncapsulateField = new RefactoringMethod({
        name: 'Encapsulate Field',

        info: '',

        suggestedRefactorings: [],

        nodePattern: {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'MemberExpression',
                    object: {
                        type: 'ThisExpression'
                    },
                    property: {
                        type: 'Identifier'
                    }
                }
            }
        },

        rejectNodePattern: {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'MemberExpression',
                    object: {
                        type: 'ThisExpression'
                    },
                    property: {
                        type: 'Identifier'
                    }
                },
                right: {
                    type: 'FunctionExpression'
                }
            }
        }
    });

    return EncapsulateField;
});