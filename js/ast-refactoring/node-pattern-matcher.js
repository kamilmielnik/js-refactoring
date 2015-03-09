define([
    'underscore'
], function (_) {
    'use strict';

    var NodePatternMatcher = function () {
        var self = this,
            getMatchingFunction,
            matchArray,
            matchObject,
            matchValue;

        this.match = function (object, patternObject) {
            if (!patternObject) {
                return false;
            }
            object = _.omit(object, 'loc', 'range');
            return _.every(patternObject, function (patternObjectValue, key) {
                var matchingFunction = getMatchingFunction(patternObjectValue);
                return matchingFunction(object, key, patternObjectValue);
            });
        };

        getMatchingFunction = function (patternObjectValue) {
            if (_.isArray(patternObjectValue)) {
                return matchArray;
            }

            if (_.isObject(patternObjectValue)) {
                return matchObject;
            }

            return matchValue;
        };

        matchArray = function (object, key, patternObjectValue) {
            return _.every(patternObjectValue, function (patternArrayObject) {
                return _.any(object[key], function (arrayObject) {
                    return self.match(arrayObject, patternArrayObject);
                });
            });
        };

        matchObject = function (object, key, value) {
            return self.match(object[key], value);
        };

        matchValue = function (object, key, value) {
            return object[key] === value;
        };
    };

    return new NodePatternMatcher();
});
