define([
    'knockout'
], function (ko) {
    'use strict';

    var RefactoringEntry = function (title, startLine, endLine) {
        this.isSelected = ko.observable(true);

        this.title = ko.observable(title);

        this.lines = ko.computed(function () {
            if (startLine === endLine) {
                return 'Line: {line}'.format({
                    line: startLine
                });
            }
            return 'Lines: {startLine} - {endLine}'.format({
                startLine: startLine,
                endLine: endLine
            });
        });

        this.toggleIsSelected = function () {
            this.isSelected(!this.isSelected());
        };
    };

    return RefactoringEntry;
});
