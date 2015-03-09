define([
    'underscore'
], function (_) {
    'use strict';

    var RefactoringPattern = function () {
        var subpatterns = [];

        this.addString = function (string, options) {
            subpatterns.push({
                type: 'string',
                value: string,
                options: options
            });
            return this;
        };

        this.addGroup = function (name, options) {
            subpatterns.push({
                type: 'group',
                name: name,
                options: options
            });
            return this;
        };

        this.apply = function (matches) {
            var refactoredLine = '';

            _.each(subpatterns, function (subpattern) {
                if (subpattern.type === 'string') {
                    if (subpattern.options && subpattern.options.when) {
                        if (subpattern.options.when(matches)) {
                            refactoredLine += subpattern.value;
                        }
                    } else {
                        refactoredLine += subpattern.value;
                    }
                } else if (subpattern.type === 'group') {
                    refactoredLine += matches[subpattern.name] || '';
                }
            });

            return refactoredLine;
        };
    };

    return RefactoringPattern;
});
