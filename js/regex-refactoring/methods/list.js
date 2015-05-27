define([
    'regex-refactoring/methods/recompose-conditional',
    'regex-refactoring/methods/remove-redundant-conditional',
    'regex-refactoring/methods/long-parameter-list',
    'regex-refactoring/methods/todo-comment',
    'regex-refactoring/methods/duplicated-code'
], function (DefaultInitializer, RemoveRedundantConditional, LongParameterList, TODOComment, DuplicatedCode) {
    'use strict';

    return [
        DefaultInitializer,
        RemoveRedundantConditional,
        LongParameterList,
        TODOComment,
        DuplicatedCode
    ];
});
