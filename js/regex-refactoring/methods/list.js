define([
    'regex-refactoring/methods/default-initializer',
    'regex-refactoring/methods/remove-redundant-conditional'
], function (DefaultInitializer, RemoveRedundantConditional) {
    'use strict';

    return [
        DefaultInitializer,
        RemoveRedundantConditional
    ];
});
