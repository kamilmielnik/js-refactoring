define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var LongParameterList = new RefactoringMethod({
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
