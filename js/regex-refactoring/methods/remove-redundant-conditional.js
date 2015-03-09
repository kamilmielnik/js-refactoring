define([
    'regex-refactoring/js-syntax',
    'regex-refactoring/refactoring-method',
    'regex-refactoring/complex-regex',
    'regex-refactoring/required-matches',
    'regex-refactoring/refactoring-pattern'
], function (JSSyntax, RefactoringMethod, ComplexRegex, RequiredMatches, RefactoringPattern) {
    'use strict';

    return new RefactoringMethod({
        regex: new ComplexRegex()
            .addUnnamed(JSSyntax.ifStart)
            .add('comparison-variable-name', JSSyntax.variableName)
            .addUnnamed(JSSyntax.comparison)
            .add('compare-against', JSSyntax.trueOrFalse)
            .addUnnamed(JSSyntax.ifEnd)
            .addUnnamed(JSSyntax.blockStart)
            .add('if-assignment-variable-name', JSSyntax.variableName)
            .addUnnamed(JSSyntax.assignment)
            .add('if-assignment-value', JSSyntax.trueOrFalse)
            .addUnnamed(JSSyntax.semicolon)
            .addUnnamed(JSSyntax.blockEnd)
            .addUnnamed(JSSyntax.else)
            .addUnnamed(JSSyntax.blockStart)
            .add('else-assignment-variable-name', JSSyntax.variableName)
            .addUnnamed(JSSyntax.assignment)
            .add('else-assignment-value', JSSyntax.trueOrFalse)
            .addUnnamed(JSSyntax.semicolon)
            .addUnnamed(JSSyntax.blockEnd),
        requiredMatches: new RequiredMatches(
            'comparison-variable-name',
            'compare-against',
            'if-assignment-variable-name',
            'if-assignment-value',
            'else-assignment-variable-name',
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
            .addGroup('comparison-variable-name')
            .addString(';')
    });
});
