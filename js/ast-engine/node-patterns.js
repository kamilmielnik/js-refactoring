define([], function () {
    'use strict';

    return {
        returnStatement: {
            type: 'ReturnStatement'
        },

        throwStatement: {
            type: 'ThrowStatement'
        },

        function: [
            {
                type: 'FunctionExpression'
            },
            {
                type: 'FunctionDeclaration'
            }
        ],

        undefined: {
            "type": "Identifier",
            "name": "undefined"
        }
    };
});
