define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern) {
    'use strict';

    return new RefactoringMethod({
        name: 'Recompose Conditional',

        regex: new ComplexRegex()
            .addOptional('var-keyword', JSSyntax.var)
            .add('variable-name-left', JSSyntax.reference).whitespaces()
            .addUnnamed(JSSyntax.assignment).whitespaces()
            .add('variable-name-right', JSSyntax.reference).whitespaces()
            .addOptional('comparison', JSSyntax.inverseComparison).whitespaces()
            .addOptional('falsy-value', JSSyntax.falsyValue).whitespaces()
            .addUnnamed(JSSyntax.optional).whitespaces()
            .addMatch('variable-name-right').whitespaces()
            .addUnnamed(JSSyntax.ternary).whitespaces()
            .add('alternative-value', JSSyntax.anythingBesidesSemicolonAndComma)
            .add('endline', JSSyntax.semicolonOrComma),

        requiredMatches: new RequiredMatches(
            'variable-name-left',
            'variable-name-right',
            'alternative-value',
            'endline'
        ),

        refactoringPattern: new RefactoringPattern()
            .addGroup('var-keyword')
            .addGroup('variable-name-left')
            .addString(' = ')
            .addGroup('variable-name-right')
            .addString(' || ')
            .addGroup('alternative-value')
            .addGroup('endline')
    });
});
