define([
    'underscore'
], function (_) {
    'use strict';

    var RequiredMatches = function () {
        var requiredMatches = arguments;

        this.areValid = function (matches) {
            return matches && _.every(requiredMatches, function (requiredMatch) {
                return !!matches[requiredMatch];
            });
        };
    };

    return RequiredMatches;
});
