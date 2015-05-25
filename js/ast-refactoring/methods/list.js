define([
    'ast-refactoring/methods/introduce-promise',
    'ast-refactoring/methods/long-method',
    'ast-refactoring/methods/excessively-short-identifier'
], function (IntroducePromise, LongMethod, ExcessivelyShortIdentifier) {
    'use strict';

    return [
        IntroducePromise,
        LongMethod,
        ExcessivelyShortIdentifier
    ];
});
