define([
    'underscore'
], function (_) {
    'use strict';

    return {
        assureArray: function (arrayCandidate) {
            if (_.isArray(arrayCandidate)) {
                return arrayCandidate;
            }
            return [arrayCandidate];
        },

        deepClone: function (object) {
            var stringifiedObject = JSON.stringify(object),
                recreatedObject = JSON.parse(stringifiedObject);

            return recreatedObject;
        }
    };
});
