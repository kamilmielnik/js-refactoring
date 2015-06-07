define([
    'regex-engine/js-syntax',
    'regex-engine/code-smell',
    'regex-engine/complex-regex',
    'regex-engine/required-matches',
    'regex-engine/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, CodeSmell, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var TemplateMethod = new CodeSmell({
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
