define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var SwitchStatement = new RefactoringMethod({
        name: 'Switch Statement',

        info: 'It\'s hard to make a small switch statement. Even a switch statement with only two cases is larger than a single block or function should be. It\'s also hard to make a switch statement that does one thing. By their nature, swithc statements always do N things.',

        suggestedRefactorings: [
            refactoringMethods.extractClass
        ],

        nodePattern: {
            type: 'SwitchStatement'
        }
    });

    return SwitchStatement;
});
