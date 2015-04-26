define([
    'underscore',
    'knockout',
    'beautify',
    'components/list-of-refactorings/refactoring-entry'
], function (_, ko, Beautify, RefactoringEntry) {
    'use strict';

    return {
        componentName: 'sidebar',

        viewModel: function (params) {
            var codeToRefactor = params.codeToRefactor,
                outputCode = params.outputCode,
                refactoringEngines = params.refactoringEngines,
                mapAnalysisResultsOntoViewModels;

            this.refactoringEntries = ko.observableArray();

            this.isAnySelected = ko.computed(function () {
                return _(this.refactoringEntries()).any(function (refactoringEntry) {
                    return refactoringEntry.isSelected();
                });
            }.bind(this));

            this.analyze = function () {
                this.refactoringEntries.removeAll();
                _(refactoringEngines).each(function (refactoringEngine) {
                    var analysisResults = refactoringEngine.analyze(codeToRefactor()),
                        refactoringEntries = mapAnalysisResultsOntoViewModels(analysisResults);

                    _(refactoringEntries).each(function (refactoringEntry) {
                        this.refactoringEntries.push(refactoringEntry);
                    }.bind(this));
                }.bind(this));
            };

            this.refactor = function () {
                var refactoredCode = _(refactoringEngines).reduce(function (refactoredCode, refactoringEngine) {
                        return refactoringEngine.refactor(refactoredCode);
                    }, codeToRefactor()),
                    beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);

                outputCode(beautifiedRefactoredCode);
            };

            mapAnalysisResultsOntoViewModels = function (possibleRefactorings) {
                return _(possibleRefactorings).map(function (possibleRefactoring) {
                    return new RefactoringEntry(possibleRefactoring.refactoringMethod.name, possibleRefactoring.startLine, possibleRefactoring.endLine);
                });
            };
        }
    };
});
