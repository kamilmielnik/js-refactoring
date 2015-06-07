define([
    'underscore',
    'regex-engine/js-syntax',
    'regex-engine/code-smell',
    'regex-engine/complex-regex',
    'regex-engine/required-matches',
    'regex-engine/refactoring-pattern',
    'refactoring/methods'
], function (_, JSSyntax, CodeSmell, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var DuplicatedCode = new CodeSmell({
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
