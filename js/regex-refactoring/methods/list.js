define([
    'regex-refactoring/methods/recompose-conditional',
    'regex-refactoring/methods/remove-redundant-conditional',
    'regex-refactoring/methods/long-parameter-list'
], function (DefaultInitializer, RemoveRedundantConditional, LongParameterList) {
    'use strict';

    return [
        DefaultInitializer,
        RemoveRedundantConditional,
        LongParameterList
    ];
});
