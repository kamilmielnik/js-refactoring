define([
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var IntroducePromise = new RefactoringMethod({
        name: 'Long Method',

        info: 'The object programs that live best and longest are those with short methods. ',

        suggestedRefactorings: [
            refactoringMethods.extractMethod,
            refactoringMethods.replaceMethodWithMethodObject,
            refactoringMethods.preserveWholeObject
        ],

        nodePattern: {
            type: "FunctionExpression"
        },

        postCheck: function (matchingNode) {
            var numberOfLines = matchingNode.loc.end.line - matchingNode.loc.start.line + 1;
            return numberOfLines > 15;
        }
    });

    return IntroducePromise;
});