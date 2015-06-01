define([
    'ast-refactoring/methods/introduce-promise',
    'ast-refactoring/methods/long-method',
    'ast-refactoring/methods/excessively-short-identifier',
    'ast-refactoring/methods/trainwreck',
    'ast-refactoring/methods/obfuscated-string-operations'
], function (IntroducePromise, LongMethod, ExcessivelyShortIdentifier, Trainwreck, ObfuscatedStringOperations) {
    'use strict';

    return [
        IntroducePromise,
        LongMethod,
        ExcessivelyShortIdentifier,
        Trainwreck,
        ObfuscatedStringOperations
    ];
});
