define([
    'underscore',
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern',
    'refactoring/methods'
], function (_, JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var DuplicatedCode = new RefactoringMethod({
        name: 'Duplicated Code',

        info: 'Number one in the stink parade is duplicated code. If you see the same code structure in more than one place, you can be sure that your program will be better if you find a way to unify them.',

        suggestedRefactorings: [
            refactoringMethods.extractMethod,
            refactoringMethods.extractClass,
            refactoringMethods.formTemplateMethod,
            refactoringMethods.substituteAlgorithm,
            refactoringMethods.pullUpField
        ],

        regex: new ComplexRegex()
            .add('duplicated-code', JSSyntax.duplicatedCode),

        requiredMatches: new RequiredMatches(
            'duplicated-code'
        ),

        postCheck: function (matches) {
            var duplicatedCode = matches['duplicated-code'],
                codeAsCharacters = duplicatedCode.split(''),
                nonWhiteSpaceCharactersInCode = _(codeAsCharacters).filter(function (character) {
                    return character.match('[\\S]');
                });

            return nonWhiteSpaceCharactersInCode.length > 10;
        }
    });

    return DuplicatedCode;
});
