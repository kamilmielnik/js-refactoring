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
            .addUnnamed(JSSyntax.ifStart).addWhitespaces()
            .add('compared-value', JSSyntax.reference).addWhitespaces()
            .addUnnamed(JSSyntax.comparison).addWhitespaces()
            .add('compare-against', JSSyntax.trueOrFalse).addWhitespaces()
            .addUnnamed(JSSyntax.ifEnd).addWhitespaces()
            .addUnnamed(JSSyntax.blockStart).addWhitespaces()
            .add('if-assignment-variable-name', JSSyntax.reference).addWhitespaces()
            .addUnnamed(JSSyntax.assignment).addWhitespaces()
            .add('if-assignment-value', JSSyntax.trueOrFalse).addWhitespaces()
            .addUnnamed(JSSyntax.semicolon).addWhitespaces()
            .addUnnamed(JSSyntax.blockEnd).addWhitespaces()
            .addUnnamed(JSSyntax.else).addWhitespaces()
            .addUnnamed(JSSyntax.blockStart).addWhitespaces()
            .addMatch('if-assignment-variable-name').addWhitespaces()
            .addUnnamed(JSSyntax.assignment).addWhitespaces()
            .add('else-assignment-value', JSSyntax.trueOrFalse).addWhitespaces()
            .addUnnamed(JSSyntax.semicolon).addWhitespaces()
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
