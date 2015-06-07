define([
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (CodeSmell, traverse, refactoringMethods) {
    'use strict';

    var Trainwreck = new CodeSmell({
        name: 'Trainwreck',

        info: 'Your expression forms a so-called trainwreck. This is a Law of Demeter violation.',

        suggestedRefactorings: [
            refactoringMethods.extractMethod,
            refactoringMethods.pullUpField,
            refactoringMethods.pullUpMethod
        ],

        nodePattern: {
            type: 'MemberExpression',
            object: {
                type: 'MemberExpression'
            }
        }
    });

    return Trainwreck;
});
