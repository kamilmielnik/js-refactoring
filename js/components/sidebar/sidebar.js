define([
    'underscore',
    'knockout',
    'beautify',
    'utils/parser',
    'components/list-of-refactorings/refactoring-entry'
], function (_, ko, Beautify, parser, RefactoringEntry) {
    'use strict';

    return {
        componentName: 'sidebar',

        viewModel: function (params) {
            var codeToRefactor = params.codeToRefactor,
                outputCode = params.outputCode,
                refactoringEngines = params.refactoringEngines,
                isAnalysisDone = ko.observable(false),
                possibleRefactorings = ko.observableArray();

            this.refactoringEntries = ko.computed(function () {
                return _(possibleRefactorings()).map(function (possibleRefactoring) {
                    return new RefactoringEntry(possibleRefactoring);
                });
            });

            this.canRefactor = ko.computed(function () {
                return isAnalysisDone() && _(this.refactoringEntries()).any(function (refactoringEntry) {
                    return refactoringEntry.isSelected();
                });
            }.bind(this));

            this.analyze = function () {
                possibleRefactorings.removeAll();
                parser.parse(codeToRefactor());
                _(refactoringEngines).each(function (refactoringEngine) {
                    var foundRefactorings = refactoringEngine.analyze(codeToRefactor());
                    if (foundRefactorings) {
                        possibleRefactorings(possibleRefactorings().concat(foundRefactorings));
                    }
                }.bind(this));
                isAnalysisDone(true);
            };

            this.refactor = function () {
                var refactoredCode = codeToRefactor(),
                    doneRefactorings = [],
                    beautifiedRefactoredCode;

                _(this.refactoringEntries()).each(function (refactoringEntry) {
                    var analysisResult = refactoringEntry.analysisResult();
                    if (refactoringEntry.isSelected()) {
                        refactoredCode = refactoredCode.replace(analysisResult.matchedCode, analysisResult.refactor());
                        doneRefactorings.push(analysisResult);
                    }
                });

                beautifiedRefactoredCode = Beautify.js_beautify(refactoredCode);
                outputCode(beautifiedRefactoredCode);
                possibleRefactorings.removeAll(doneRefactorings);
                isAnalysisDone(false);
            };

            codeToRefactor.subscribe(function () {
                isAnalysisDone(false);
            });
        }
    };
});
