define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern) {
    'use strict';

    return new RefactoringMethod({
        name: 'Remove Redundant Conditional',

        regex: new ComplexRegex()
            .addUnnamed(JSSyntax.ifStart)
            .add('compared-value', JSSyntax.reference)
            .addUnnamed(JSSyntax.comparison)
            .add('compare-against', JSSyntax.trueOrFalse)
            .addUnnamed(JSSyntax.ifEnd)
            .addUnnamed(JSSyntax.blockStart)
            .add('if-assignment-variable-name', JSSyntax.reference)
            .addUnnamed(JSSyntax.assignment)
            .add('if-assignment-value', JSSyntax.trueOrFalse)
            .addUnnamed(JSSyntax.semicolon)
            .addUnnamed(JSSyntax.blockEnd)
            .addUnnamed(JSSyntax.else)
            .addUnnamed(JSSyntax.blockStart)
            .addMatch('if-assignment-variable-name')
            .addUnnamed(JSSyntax.assignment)
            .add('else-assignment-value', JSSyntax.trueOrFalse)
            .addUnnamed(JSSyntax.semicolon)
            .addUnnamed(JSSyntax.blockEnd),

        requiredMatches: new RequiredMatches(
            'compared-value',
            'compare-against',
            'if-assignment-variable-name',
            'if-assignment-value',
            'else-assignment-value'
        ),

        refactoringPattern: new RefactoringPattern()
            .addGroup('if-assignment-variable-name')
            .addString(' = ')
            .addString('!', {
                when: function (matches) {
                    return matches['compare-against'] !== matches['if-assignment-value'];
                }
            })
            .addGroup('compared-value')
            .addString(';')
    });
});
