define([
    'ast-refactoring/methods/introduce-promise',
    'ast-refactoring/methods/long-method',
    'ast-refactoring/methods/excessively-short-identifier',
    'ast-refactoring/methods/trainwreck'
], function (IntroducePromise, LongMethod, ExcessivelyShortIdentifier, Trainwreck) {
    'use strict';

    return [
        IntroducePromise,
        LongMethod,
        ExcessivelyShortIdentifier,
        Trainwreck
    ];
});
