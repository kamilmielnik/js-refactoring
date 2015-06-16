define([
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (CodeSmell, traverse, refactoringMethods) {
    'use strict';

    return new CodeSmell({
        name: 'Lost Execution Context',

        info: 'You have introduced a variable to hold the value of \'this\'. You should instead have preserved the context via the \'bind\' method where needed.',

        suggestedRefactorings: [
            refactoringMethods.preserveExecutionContext
        ],

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
});
