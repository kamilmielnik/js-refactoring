define([
    'regex-refactoring/methods/recompose-conditional',
    'regex-refactoring/methods/remove-redundant-conditional',
    'regex-refactoring/methods/long-parameter-list',
    'regex-refactoring/methods/todo-comment'
], function (DefaultInitializer, RemoveRedundantConditional, LongParameterList, TODOComment) {
    'use strict';

    return [
        DefaultInitializer,
        RemoveRedundantConditional,
        LongParameterList,
        TODOComment
    ];
});