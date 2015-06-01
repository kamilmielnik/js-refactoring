define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var PublicField = new RefactoringMethod({
        name: 'Public Field',

        info: 'You have publicly available data. You might be better off having encapsulated the field and provided getter and setter methods.',

        suggestedRefactorings: [
            refactoringMethods.encapsulateField
        ],

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

    return PublicField;
});
