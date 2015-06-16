define([
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (CodeSmell, traverse, refactoringMethods) {
    'use strict';

    return new CodeSmell({
        name: 'Public Field',

        info: 'You have publicly available data. You might be better off having encapsulated the field and provided getter and setter methods.',

        suggestedRefactorings: [
            refactoringMethods.encapsulateField,
            refactoringMethods.introduceDynamicAccessors,
            refactoringMethods.introduceDualPurposeGetterSetter
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
});
