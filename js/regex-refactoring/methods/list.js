define([
    'regex-refactoring/methods/recompose-conditional',
    'regex-refactoring/methods/remove-redundant-conditional'
], function (DefaultInitializer, RemoveRedundantConditional) {
    'use strict';

    return [
        DefaultInitializer,
        RemoveRedundantConditional
    ];
});
