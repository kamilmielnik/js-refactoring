define([
    'underscore',
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (_, CodeSmell, traverse, refactoringMethods) {
    'use strict';

    return new CodeSmell({
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
            var identifier = matchingNode.id.name.toLowerCase(),
                allowedIdentifiers = ['i', 'j', 'id', 'pi', 'e'];

            if (_(allowedIdentifiers).contains(identifier)) {
                return false;
            }

            return identifier.length <= 2;
        }
    });
});
