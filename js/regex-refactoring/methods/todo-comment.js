define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    var TODOComment = new RefactoringMethod({
        name: 'TODO Comment',

        info: 'TODO comments are a indicator that something needs to be done. Chances are that if you don\'t do it now, then you never will.',

        suggestedRefactorings: undefined,

        regex: new ComplexRegex()
            .addUnnamed(JSSyntax.todoComment),

        requiredMatches: new RequiredMatches()
    });

    return TODOComment;
});