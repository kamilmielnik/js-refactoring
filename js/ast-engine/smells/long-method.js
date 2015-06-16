define([
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (CodeSmell, traverse, refactoringMethods) {
    'use strict';

    return new CodeSmell({
        name: 'Long Method',

        info: 'The object programs that live best and longest are those with short methods.',

        suggestedRefactorings: [
            refactoringMethods.extractMethod,
            refactoringMethods.replaceMethodWithMethodObject,
            refactoringMethods.preserveWholeObject
        ],

        nodePattern: {
            type: 'FunctionExpression'
        },

        postCheck: function (matchingNode) {
            var numberOfLines = matchingNode.loc.end.line - matchingNode.loc.start.line + 1;
            return numberOfLines > 15;
        }
    });
});
