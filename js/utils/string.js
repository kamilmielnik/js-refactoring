define([
    'underscore'
], function () {
    'use strict';

    String.prototype.format = function (args) {
        var formatted = this;
        _.each(args, function (value, key) {
            var regexp = new RegExp('\\{' + key + '\\}', 'gi');
            formatted = formatted.replace(regexp, value);
        });
        return formatted;
    };
});
