define([
    'knockout',
    'code/code-provider',
    'regex-refactoring/regex-refactoring-engine',
    'ast-refactoring/ast-refactoring-engine'
], function (ko, codeProvider, RegexRefactoringEngine, ASTRefactoringEngine) {
    'use strict';

    return {
        componentName: 'home',

        viewModel: function () {
            var code = codeProvider.get([
                    /*'introducePromise',
                    'defaultInitializer',
                    'removeRedundantConditional',*/
                    'sample'
                ]);

            this.code = ko.observable(code);

            this.refactoringEngines = [
                new RegexRefactoringEngine(),
                new ASTRefactoringEngine()
            ];
        }
    };
});
