define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var Trainwreck = new RefactoringMethod({
        name: 'Trainwreck',

        info: 'Your expression forms a trainwreck. This is a Law of Demeter violation.',

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