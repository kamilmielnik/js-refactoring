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
            .add('variable-name-left', JSSyntax.reference).addWhitespaces()
            .addUnnamed(JSSyntax.assignment).addWhitespaces()
            .add('variable-name-right', JSSyntax.reference).addWhitespaces()
            .addOptional('comparison', JSSyntax.inverseComparison).addWhitespaces()
            .addOptional('falsy-value', JSSyntax.falsyValue).addWhitespaces()
            .addUnnamed(JSSyntax.optional).addWhitespaces()
            .addMatch('variable-name-right').addWhitespaces()
            .addUnnamed(JSSyntax.ternary).addWhitespaces()
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
