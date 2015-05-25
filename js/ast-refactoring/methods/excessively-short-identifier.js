define([
    'underscore',
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (_, RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var ExcessivelyShortIdentifier = new RefactoringMethod({
        name: 'Excessively Short Identifier',

        info: 'The name of a variable should reflect its function unless the function is obvious.',

        suggestedRefactorings: [
            refactoringMethods.rename
        ],

        nodePattern: {
            type: 'VariableDeclarator',
            id: {
                type: 'Identifier'
            }
        },

        postCheck: function (matchingNode) {
            var identifier = matchingNode.id.name,
                allowedIdentifiers = ['i', 'j', 'k', 'l', 'id', 'pi'];

            if (_(allowedIdentifiers).contains(identifier)) {
                return false;
            }

            return identifier.length <= 2;
        }
    });

    return ExcessivelyShortIdentifier;
});
