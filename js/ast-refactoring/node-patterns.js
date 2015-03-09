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
        ]
    };
});
