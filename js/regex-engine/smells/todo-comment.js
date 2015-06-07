define([
    'regex-engine/js-syntax',
    'regex-engine/code-smell',
    'regex-engine/complex-regex',
    'regex-engine/required-matches',
    'regex-engine/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, CodeSmell, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var TODOComment = new CodeSmell({
        name: 'TODO Comment',

        info: 'TODO comments are a indicator that something needs to be done. Chances are that if you don\'t do it now, then you never will.',

        suggestedRefactorings: undefined,

        regex: new ComplexRegex()
            .addUnnamed(JSSyntax.todoComment),

        requiredMatches: new RequiredMatches()
    });

    return TODOComment;
});
