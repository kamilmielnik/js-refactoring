define([
    'underscore',
    'ast-engine/code-smell',
    'ast-engine/traverse',
    'refactoring/methods'
], function (_, CodeSmell, traverse, refactoringMethods) {
    'use strict';

    return new CodeSmell({
        name: 'Obfuscated String Operations',

        info: 'Programs will be more readable if you better communicate your intent by deobfuscating your string operations.',

        suggestedRefactorings: [
            refactoringMethods.deobfuscateStringOperations
        ],

        nodePattern: {
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
        },

        postCheck: function (matchingNode) {
            var memberName = matchingNode.callee.property.name,
                isMemberASubstringFunction = _(['substr', 'substring']).contains(memberName),
                isFirstArgumentANumber = _.isNumber(matchingNode.arguments[0].value),
                isThereASecondArgument = !!matchingNode.arguments[1],
                isSecondArgumentANumber = isThereASecondArgument && _.isNumber(matchingNode.arguments[1].value);

            return isMemberASubstringFunction && (isFirstArgumentANumber || isSecondArgumentANumber);
        }
    });
});
