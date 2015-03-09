define([
    'underscore',
    'text!code/default-initializer.js',
    'text!code/remove-redundant-conditional.js',
    'text!code/introduce-promise.js',
    'text!code/introduce-promise-chain.js'
], function (_, defaultInitializer, removeRedundantConditional, introducePromise, introducePromiseChain) {
    'use strict';

    var CodeProvider = function () {
        var codes = {
            defaultInitializer: defaultInitializer,
            removeRedundantConditional: removeRedundantConditional,
            introducePromise: introducePromise,
            introducePromiseChain: introducePromiseChain
        };

        this.get = function (codeNames) {
            return _.map(codeNames, function (codeName) {
                return codes[codeName];
            }).join('\n');
        };
    };

    return new CodeProvider();
});
