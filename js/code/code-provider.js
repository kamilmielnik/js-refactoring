define([
    'underscore',
    'text!code/recompose-conditional.js',
    'text!code/remove-redundant-conditional.js',
    'text!code/introduce-promise.js',
    'text!code/introduce-promise-chain.js',
    'text!code/sample.js'
], function (_, defaultInitializer, removeRedundantConditional, introducePromise, introducePromiseChain, sample) {
    'use strict';

    var CodeProvider = function () {
        var codes = {
            defaultInitializer: defaultInitializer,
            removeRedundantConditional: removeRedundantConditional,
            introducePromise: introducePromise,
            introducePromiseChain: introducePromiseChain,
            sample: sample
        };

        this.get = function (codeNames) {
            return _.map(codeNames, function (codeName) {
                return codes[codeName];
            }).join('\n');
        };
    };

    return new CodeProvider();
});
