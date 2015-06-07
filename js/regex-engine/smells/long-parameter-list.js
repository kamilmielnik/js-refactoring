define([
    'regex-engine/js-syntax',
    'regex-engine/code-smell',
    'regex-engine/complex-regex',
    'regex-engine/required-matches',
    'regex-engine/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, CodeSmell, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var LongParameterList = new CodeSmell({
        name: 'Long Parameter List',

        info: 'Long parameter lists are hard to understand, because they become inconsistent and difficult to use, and because you are forever changing them as you need more data.',

        suggestedRefactorings: [
            refactoringMethods.replaceParameterWithMethod,
            refactoringMethods.replaceParameterWithExplicitMethods,
            refactoringMethods.preserveWholeObject,
            refactoringMethods.introduceParameterObject
        ],

        regex: new ComplexRegex()
            .addUnnamed(JSSyntax.function).whitespaces()
            .addOptionalUnnamed(JSSyntax.reference).whitespaces()
            .addUnnamed(JSSyntax.argumentsListStart).whitespaces()
            .addUnnamed(JSSyntax.fourOrMoreArguments).whitespaces()
            .addUnnamed(JSSyntax.argumentsListEnd).whitespaces()
            .addUnnamed(JSSyntax.blockStart),

        requiredMatches: new RequiredMatches()
    });

    return LongParameterList;
});
