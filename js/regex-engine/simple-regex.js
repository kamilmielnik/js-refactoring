define([
    'underscore'
], function (_) {
    'use strict';

    var SimpleRegex = function (expression, groupsCount, groupNumbers) {
        this.expression = expression;
        this.groupsCount = groupsCount || 0;
        if (_.isObject(groupNumbers)) {
            this.groupNumbers = groupNumbers;
        } else {
            this.groupNumbers = {
                '': groupNumbers || 0
            };
        }
    };

    return SimpleRegex;
});
