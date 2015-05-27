define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var TemplateMethod = new RefactoringMethod({
        name: '',

        info: '',

        suggestedRefactorings: [

        ],

        regex: new ComplexRegex(),

        requiredMatches: new RequiredMatches(),

        postCheck: function (matches) {
            return true;
        }
    });

    return TemplateMethod;
});
