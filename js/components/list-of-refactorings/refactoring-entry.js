define([
    'knockout'
], function (ko) {
    'use strict';

    var RefactoringEntry = function (analysisResult) {
        var startLine = analysisResult.startLine,
            endLine = analysisResult.endLine;

        this.analysisResult = ko.observable(analysisResult);

        this.isSelected = ko.observable(true);

        this.title = ko.observable(analysisResult.refactoringMethod.name);

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
