define([
    'underscore',
    'ast-refactoring/refactoring-method',
    'ast-refactoring/traverse',
    'refactoring/methods'
], function (_, RefactoringMethod, traverse, refactoringMethods) {
    'use strict';

    var ObfuscatedStringOperations = new RefactoringMethod({
        name: 'Obfuscated String Operations',

        info: 'Programs will be more readable if you better communicate your intent by deobfuscating your string operations.',

        suggestedRefactorings: [],

        nodePattern: {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    property: {
                        type: 'Identifier'
                    }
                },
                arguments: [
                    {
                        type: 'Literal'
                    }
                ]
            }
        },

        postCheck: function (matchingNode) {
            var memberName = matchingNode.expression.callee.property.name,
                isMemberASubstringFunction = _(['substr', 'substring']).contains(memberName),
                isFirstArgumentANumber = _.isNumber(matchingNode.expression.arguments[0].value),
                isThereASecondArgument = !!matchingNode.expression.arguments[1],
                isSecondArgumentANumber = isThereASecondArgument && _.isNumber(matchingNode.expression.arguments[1].value);

            return isMemberASubstringFunction && (isFirstArgumentANumber || isSecondArgumentANumber);
        }
    });

    return ObfuscatedStringOperations;
});