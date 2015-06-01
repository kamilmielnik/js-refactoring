define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var PreserveExecutionContext = new RefactoringMethod({
        name: 'Preserve Execution Context',

        info: 'You have introduced a variable to maintain the value of \'this\'. You should instead preserve the context via the \'bind\' method.',

        suggestedRefactorings: [],

        nodePattern: {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier'
                    },
                    init: {
                        type: 'ThisExpression'
                    }
                }
            ],
            kind: 'var'
        }
    });

    return PreserveExecutionContext;
});