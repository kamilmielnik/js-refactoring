define([
    'ast-refactoring/methods/introduce-promise',
    'ast-refactoring/methods/long-method'
], function (IntroducePromise, LongMethod) {
    'use strict';

    return [
        IntroducePromise,
        LongMethod
    ];
});
