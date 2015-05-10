define([
    'knockout'
], function (ko) {
    'use strict';

    var RefactoringEntry = function (analysisResult) {
        var startLine = analysisResult.startLine,
            endLine = analysisResult.endLine,
            selectExtension;

        this.analysisResult = ko.observable(analysisResult);
        this.title = ko.observable(analysisResult.refactoringMethod.name);
        this.info = ko.observable(analysisResult.refactoringMethod.info);
        this.startLine = ko.observable(startLine);
        this.numberOfLines = ko.observable(endLine - startLine + 1);
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
        this.code = ko.observable(analysisResult.matchedCode);
        this.suggestedRefactorings = ko.observableArray(analysisResult.refactoringMethod.suggestedRefactorings);
        this.refactoredCode = ko.observable();
        this.isAutomaticRefactoringPossible = ko.observable(!!analysisResult.refactor);

        this.isSelected = ko.observable(true);
        this.selectedExtension = ko.observable();

        this.showInfo = function () {
            selectExtension('info');
        };

        this.showCode = function () {
            selectExtension('code');
        };

        this.showSuggestedRefactorings = function () {
            selectExtension('suggested-refactorings');
        };

        this.showRefactoredCode = function () {
            if (!this.refactoredCode()) {
                this.refactoredCode(analysisResult.refactor());
            }
            selectExtension('refactor');
        };

        selectExtension = function (extensionName) {
            if (this.selectedExtension() === extensionName) {
                this.selectedExtension(undefined);
            } else {
                this.selectedExtension(extensionName);
            }
        }.bind(this);
    };

    return RefactoringEntry;
});
