define([
    'regex-engine/js-syntax',
    'regex-engine/code-smell',
    'regex-engine/complex-regex',
    'regex-engine/required-matches',
    'regex-engine/refactoring-pattern',
    'refactoring/methods'
], function (JSSyntax, CodeSmell, ComplexRegex, RequiredMatches, RefactoringPattern, refactoringMethods) {
    'use strict';

    return new CodeSmell({
        name: 'Decomposed Conditional',

        info: 'You have conditional code that is unnecessarily verbose and does not use the most readable JavaScript construct.',

        suggestedRefactorings: [
            refactoringMethods.recomposeConditional
        ],

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
