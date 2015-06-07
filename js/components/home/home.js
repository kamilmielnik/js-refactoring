define([
    'knockout',
    'code/code-provider',
    'regex-engine/engine',
    'ast-engine/engine'
], function (ko, codeProvider, RegexEngine, ASTEngine) {
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

            this.engines = [
                new RegexEngine(),
                new ASTEngine()
            ];
        }
    };
});
