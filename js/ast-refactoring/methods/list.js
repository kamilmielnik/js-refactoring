define([
    'ast-refactoring/methods/introduce-promise',
    'ast-refactoring/methods/long-method',
    'ast-refactoring/methods/excessively-short-identifier',
    'ast-refactoring/methods/trainwreck',
    'ast-refactoring/methods/obfuscated-string-operations',
    'ast-refactoring/methods/preserve-execution-context',
    'ast-refactoring/methods/encapsulate-field'
], function (
    IntroducePromise,
    LongMethod,
    ExcessivelyShortIdentifier,
    Trainwreck,
    ObfuscatedStringOperations,
    PreserveExecutionContext,
    EncapsulateField
) {
    'use strict';

    return [
        IntroducePromise,
        LongMethod,
        ExcessivelyShortIdentifier,
        Trainwreck,
        ObfuscatedStringOperations,
        PreserveExecutionContext,
        EncapsulateField
    ];
});