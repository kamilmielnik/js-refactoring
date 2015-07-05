define([
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (CodeSmell, traverse, refactoringMethods) {
    'use strict';

    return new CodeSmell({
        name: 'Switch Statement',

        info: 'It\'s hard to make a small switch statement. Even a switch statement with only two cases is larger than a single block or function should be. It\'s also hard to make a switch statement that does one thing. By their nature, swithc statements always do N things.',

        suggestedRefactorings: [
            refactoringMethods.extractClass,
            refactoringMethods.replaceConditionalWithMapping
        ],

        nodePattern: {
            type: 'SwitchStatement'
        }
    });
});
