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
        }
    };
});
