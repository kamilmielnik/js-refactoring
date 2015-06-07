define([
    'regex-engine/js-syntax',
    'regex-engine/code-smell',
    'regex-engine/complex-regex',
    'regex-engine/required-matches',
    'regex-engine/refactoring-pattern'
], function (JSSyntax, CodeSmell, ComplexRegex, RequiredMatches, RefactoringPattern) {
    'use strict';

    return new CodeSmell({
        name: 'Remove Redundant Conditional',

        info: 'You have a redundant conditional code which assings condition\'s result to a variable.',

        suggestedRefactorings: [],

        regex: new ComplexRegex()
            .addUnnamed(JSSyntax.ifStart).whitespaces()
            .add('compared-value', JSSyntax.reference).whitespaces()
            .addUnnamed(JSSyntax.comparison).whitespaces()
            .add('compare-against', JSSyntax.trueOrFalse).whitespaces()
            .addUnnamed(JSSyntax.ifEnd).whitespaces()
            .addUnnamed(JSSyntax.blockStart).whitespaces()
            .add('if-assignment-variable-name', JSSyntax.reference).whitespaces()
            .addUnnamed(JSSyntax.assignment).whitespaces()
            .add('if-assignment-value', JSSyntax.trueOrFalse).whitespaces()
            .addUnnamed(JSSyntax.semicolon).whitespaces()
            .addUnnamed(JSSyntax.blockEnd).whitespaces()
            .addUnnamed(JSSyntax.else).whitespaces()
            .addUnnamed(JSSyntax.blockStart).whitespaces()
            .addMatch('if-assignment-variable-name').whitespaces()
            .addUnnamed(JSSyntax.assignment).whitespaces()
            .add('else-assignment-value', JSSyntax.trueOrFalse).whitespaces()
            .addUnnamed(JSSyntax.semicolon).whitespaces()
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
