define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern) {
    'use strict';

    return new RefactoringMethod({
        name: 'Default Initializer',

        regex: new ComplexRegex()
            .addOptional('var-keyword', JSSyntax.var)
            .add('variable-name-left', JSSyntax.reference)
            .addUnnamed(JSSyntax.assignment)
            .add('variable-name-right', JSSyntax.reference)
            .addOptional('comparison', JSSyntax.inverseComparison)
            .addOptional('falsy-value', JSSyntax.falsyValue)
            .addUnnamed(JSSyntax.optional)
            .addMatch('variable-name-right')
            .addUnnamed(JSSyntax.ternary)
            .add('alternative-value', JSSyntax.anything)
            .end(),

        requiredMatches: new RequiredMatches(
            'variable-name-left',
            'variable-name-right',
            'alternative-value'
        ),

        refactoringPattern: new RefactoringPattern()
            .addGroup('var-keyword')
            .addGroup('variable-name-left')
            .addString(' = ')
            .addGroup('variable-name-right')
            .addString(' || ')
            .addGroup('alternative-value')
    });
});
